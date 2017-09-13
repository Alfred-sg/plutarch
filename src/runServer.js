"use strict";

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

const defaultConfig = require('./webpack/webpack.server');
const readPlutarchConfig = require('./utils/readPlutarchConfig');
const cwd = process.cwd();
const argv = yargs.argv;
const { port } = argv;

function mergeConfig(prevConfig,customConfig){
  let currentConfig = merge(prevConfig,customConfig);

  if ( port && currentConfig.devServer.port != port ) 
    currentConfig.devServer.port = port;

  console.log(currentConfig)

  return currentConfig;
};

function runServer(){
  const plutarchConfig = readPlutarchConfig(cwd);
  const currentConfig = mergeConfig(defaultConfig,plutarchConfig);
  const devServerConfig = currentConfig.devServer;

  const compiler = webpack(currentConfig);

  const devServer = new WebpackDevServer(compiler, devServerConfig);

  devServer.listen(devServerConfig.port, devServerConfig.host, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};


runServer();
