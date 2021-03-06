"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _lodash = require("lodash");

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyMockRoutes(app, context) {
  const {
    paths: {
      plmc,
      plmcs
    }
  } = context; // 路由配置文件 plutarch.mock.js，仅支持文件形式

  if (!(0, _fs.existsSync)(plmc) || !(0, _fs.statSync)(plmc).isFile()) return;
  const router = new _Router.default(app, context);

  const mockRouter = require(plmc);

  if (!(0, _lodash.isFunction)(mockRouter) && !(0, _lodash.isPlainObject)(mockRouter)) throw new Error("plutarch.mock.js should export a function or an object");

  if ((0, _lodash.isFunction)(mockRouter)) {
    mockRouter(router);
    return;
  }

  ;
  Object.keys(mockRouter).map(key => {
    let matches = key.split(/\s/);
    let method = matches[0];
    let path = matches[1];
    router[method](path, mockRouter[key]);
  });
}

;
var _default = applyMockRoutes;
exports.default = _default;
module.exports = exports.default;