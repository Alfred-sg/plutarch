'use strict';

const path = require('path');
const fs = require('fs');
const isFunction = require('lodash/isFunction');
const isPlainObject = require('lodash/isPlainObject');
const PlutarchRouter = require('./PlutarchRouter');

module.exports = function applyMock(options){
  const { cwd, mockDirPath, mockRouterPath } = options;
  const appMockRouterPath = path.resolve(cwd,mockRouterPath);

  if ( !fs.existsSync(appMockRouterPath) ) return;

  return function(devServerApp){

    const plutarchRouter = new PlutarchRouter(devServerApp,{
      mockDirPath: path.resolve(cwd,mockDirPath)
    });
    
    const stat = fs.statSync(appMockRouterPath);
    const isDir = stat.isDirectory();
    const isFile = stat.isFile();

    if ( isFile ){
      const appMockRouter = require(appMockRouterPath);

      if ( isFunction(appMockRouter) ){
        appMockRouter(plutarchRouter);
        return;
      };
    
      if ( isPlainObject(appMockRouter) ){
        Object.keys(appMockRouter).map(key=>{
          let matches = key.split(/\s/);
          let method = matches[0];
          let path = matches[1];
          
          plutarchRouter[method](path,appMockRouter[key]);
        });
      };
  
      throw new Error("plutarch.mock配置文件只接受对象或函数形式的数据")
    };

    // if ( isDir ){

    // };
    
  };

};
