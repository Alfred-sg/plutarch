'use strict';

import debug from 'debug';
import webpack from 'webpack';
import { existsSync } from 'fs';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';

import { getPlutarchConfig, traverseDirectory } from '../utils';
import { 
  BabelOptions, eslintLoader, CssLoadersWithModules, CssLoadersWithoutModules, svgSpriteLoader 
} from '../constants';

const _debug = debug('plutarch');

function getCommonConfig(paths, processArgv, yargsArgv){
  _debug(`get common config`);

  const { env } = yargsArgv;
  const isProd = env==='prod';
  const NODE_ENV = isProd ? "'production'" : "'development'";
  const { 
    appSrcPath, appDistPath, appPublicPath, appNodeModulesPath, ownNodeModulesPath, 
    resolveOwn, resolveApp 
  } = paths;
  const { fileMap: entry, dirMap: alias } = traverseDirectory(appSrcPath);
  const debug = processArgv.NODE_ENV==='test';

  const customConfig = getPlutarchConfig(paths);
  const { extra } = customConfig;
  const { cssModules, cssModulesExclude, cssModulesIncludes, svgSpriteIncludes } = extra || {};

  const commonConfig = {
    target: "web",// 打包文件使用平台形势，默认值
    entry: entry,// 入口文件[ string | array | object ]
    context: resolveOwn(''),
    output: {
      path: appDistPath,
      publicPath: "/",
      filename: "[name].js",
      chunkFilename: "[name].async.js",// 非入口文件名，require.ensure异步加载脚本文件
      crossOriginLoading: "anonymous",// 启用跨域加载脚本
      // devtoolLineToLine: false,// 编辑脚本是否启用行到行SourceMap的映射，默认值
      // sourceMapFilename: "[file].map",// SourceMap文件名，默认值
      // hotUpdateChunkFilename: "[id].[hash].hot-update.js",// 热更新加载的文件名，默认值
      // hotUpdateFunction: "webpackHotUpdate",// 热更新加载jsonp函数，默认值
      // hotUpdateMainFilename: "[hash].hot-update.json",// 热更新加载的主文件名，默认值
      // jsonpFunction: "webpackJsonp",// 懒加载jsonp函数名，默认值
      // library: pluginName,// 是否导出为独立发布的文件，开发插件时需要
      // libraryTarget: "commonjs2",// 插件导出形式
    },
    module: {
      rules: [{ 
        test: /\.jsx?$/,
        include: [ appSrcPath ],// 校验时非空字符串、非null
        exclude: [ appNodeModulesPath ],
        use: [{
          loader: 'babel-loader',
          options: BabelOptions
        }, eslintLoader]
      },{
        test: /\.tsx?$/,
        include: [ appSrcPath ],
        use: [{
          loader: 'babel-loader',
          options: BabelOptions,
        },
        {
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true,
          },
        }],
      },{
        test: /\.css$/,
        include: cssModulesIncludes ? 
          [ appSrcPath, ...cssModulesIncludes.map(path=>resolveApp(path)) ] : [ appSrcPath ],
        exclude: cssModules ? cssModulesExclude : () => false,
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssModules ? 
            [ {
              loader: CssLoadersWithModules[1].loader, 
              options: {
                ...CssLoadersWithModules[1].options,
                minimize: true
              }
            }, CssLoadersWithModules[2] ] : 
            [ {
              loader: CssLoadersWithoutModules[1].loader, 
              options: {
                ...CssLoadersWithoutModules[1].options,
                minimize: true
              }
            }, CssLoadersWithoutModules[2] ]
        }) : cssModules ? CssLoadersWithModules : CssLoadersWithoutModules
      },{
        test: /\.less$/,
        include: cssModulesIncludes ? 
          [ appSrcPath, ...cssModulesIncludes.map(path=>resolveApp(path)) ] : [ appSrcPath ],
        exclude: cssModules ? cssModulesExclude : () => false,
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...(
              cssModules ? 
                [ {
                  loader: CssLoadersWithModules[1].loader, 
                  options: {
                    ...CssLoadersWithModules[1].options,
                    minimize: true
                  }
                }, CssLoadersWithModules[2] ] : 
                [ {
                  loader: CssLoadersWithModules[1].loader, 
                  options: {
                    ...CssLoadersWithModules[1].options,
                    minimize: true
                  }
                }, CssLoadersWithModules[2] ]
            ),
            { loader: 'less-loader' }// compiles Less to CSS
          ]
        }) : [ 
          ...(cssModules ? CssLoadersWithModules : CssLoadersWithoutModules),
          { loader: 'less-loader' }
        ]
      },{
        test: /\.scss$/,
        include: cssModulesIncludes ? 
          [ appSrcPath, ...cssModulesIncludes.map(path=>resolveApp(path)) ] : [ appSrcPath ],
        exclude: cssModules ? cssModulesExclude : () => false,
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...(
              cssModules ? 
              [ {
                loader: CssLoadersWithModules[1].loader, 
                options: {
                  ...CssLoadersWithModules[1].options,
                  minimize: true
                }
              }, CssLoadersWithModules[2] ] : 
              [ {
                loader: CssLoadersWithModules[1].loader, 
                options: {
                  ...CssLoadersWithModules[1].options,
                  minimize: true
                }
              }, CssLoadersWithModules[2] ]
            ),
            { loader: 'sass-loader' }
          ]
        }) : [
          ...(cssModules ? CssLoadersWithModules : CssLoadersWithoutModules),
          { loader: 'sass-loader' }
        ]
      },{
        test: /\.css$/,
        include: [ appNodeModulesPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ {
            loader: CssLoadersWithoutModules[1].loader, 
            options: {
              ...CssLoadersWithoutModules[1].options,
              minimize: true
            }
          }, CssLoadersWithoutModules[2] ]
        }) : CssLoadersWithoutModules
      },{
        test: /\.less$/,
        include: [ appNodeModulesPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...[ {
              loader: CssLoadersWithoutModules[1].loader, 
              options: {
                ...CssLoadersWithoutModules[1].options,
                minimize: true
              }
            }, CssLoadersWithoutModules[2] ],
            { loader: 'less-loader' }// compiles Less to CSS
          ]
        }) : [ 
          ...CssLoadersWithoutModules,
          { loader: 'less-loader' }
        ]
      },{
        test: /\.scss$/,
        include: [ appNodeModulesPath ],
        use: isProd || debug ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            ...[ {
              loader: CssLoadersWithoutModules[1].loader, 
              options: {
                ...CssLoadersWithoutModules[1].options,
                minimize: true
              }
            }, CssLoadersWithoutModules[2] ],
            { loader: 'sass-loader' }
          ]
        }) : [
          ...CssLoadersWithoutModules,
          { loader: 'sass-loader' }
        ]
      },{
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        exclude: svgSpriteIncludes ? svgSpriteIncludes : () => false,
        use: [ 'url-loader?limit=100000' ]// url-loader内部封装了file-loader，大于限制长度的采用file-loader加载
        // url-loader加载图片时，import img from imgPath 将生成图片路径，css导入以相对路径形式
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      },{
        test: /\.(csv|tsv)$/,
        use: [ 'csv-loader' ]
      },{
        test: /\.xml$/,
        use: [ 'xml-loader' ]
      },{
        test: /\.html$/,
        use: [ 'html-loader' ]
      },{
        test: /\.svg$/,
        include: svgSpriteIncludes ? svgSpriteIncludes : () => false,
        use: [ svgSpriteLoader ]
      }]
    },
    resolve: {
      modules: [ appNodeModulesPath, ownNodeModulesPath ],
      extensions: [ '.js', '.jsx', '.tsx', '.json' ],// 可忽略扩展名的模块，靠前的优先级最高
      alias,// import, require加载时的别名
    },
    plugins: [
      // If you require a missing module and then `npm install` it, you still have
      // to restart the development server for Webpack to discover it. This plugin
      // makes the discovery automatic so you don't have to restart.
      // See https://github.com/facebookincubator/create-react-app/issues/186
      new WatchMissingNodeModulesPlugin(appNodeModulesPath),

      new NpmInstallPlugin({
        // Use --save or --save-dev
        dev: false,
        // Install missing peerDependencies
        peerDependencies: true,
        // Reduce amount of console logging
        quiet: false,
        // npm command used inside company, yarn is not supported yet
        npm: 'npm'
      }),
  
      // webpack.DefinePlugin定义全局环境变量的简写形式
      // new webpack.EnvironmentPlugin(['NODE_ENV']),
  
      // 配置全局常量
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': NODE_ENV
      }),
  
      // 将模块作为变量导出
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery'
      // }),
  
      existsSync(appPublicPath) ? 
        new CopyWebpackPlugin([{
          from: appPublicPath,
          to: appDistPath
        }]) : null,
  
      !debug ? new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }) : null
    ].filter(plugin=>!!plugin)
  };

  return commonConfig;
};

export default getCommonConfig;
