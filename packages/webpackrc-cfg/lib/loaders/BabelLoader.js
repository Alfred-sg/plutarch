'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class7, _temp;

var _path = require('path');

var _Mod = require('../Mod');

// https://babeljs.io/docs/en/next/babel-preset-env.html
let Babel_Preset_Env = class Babel_Preset_Env extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      targets: {
        browsers: ['last 2 versions', 'IE >= 9']
      },
      forceAllTransforms: true,
      loose: true,
      useBuiltIns: 'usage',
      corejs: '2',
      modules: 'commonjs' // https://stackoverflow.com/questions/43042889/typescript-referenceerror-exports-is-not-defined
    };
    this.mod = '@babel/preset-env';
    this.init();
  }
};
;

let Babel_Preset_React = class Babel_Preset_React extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/preset-react';
    this.init();
  }
};
;

// 注入最新的 api
let Babel_Plugin_Transform_Runtime = class Babel_Plugin_Transform_Runtime extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      // 'helpers': true,
      // 'regenerator': true,
      // 'corejs': '2',
      // 'absoluteRuntime': dirname(require.resolve('../../package')),
    };
    this.mod = '@babel/plugin-transform-runtime';
    this.init();
  }

  get dependencies() {
    return ['@babel/runtime-corejs2', this.mod];
  }
};
;

// Babel_Plugin_Add_Module_Exports::common.js 模块加载，无需 default
// 加载时导致 import('./a') 多 default 属性

// stage_0
let Babel_Plugin_Prorosal_Function_Bind = class Babel_Plugin_Prorosal_Function_Bind extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-function-bind';
    this.init();
  }
};
;
// stage_1
let Babel_Plugin_Proposal_Export_Default_From = class Babel_Plugin_Proposal_Export_Default_From extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-export-default-from';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Logical_Assignment_Operators = class Babel_Plugin_Proposal_Logical_Assignment_Operators extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-logical-assignment-operators';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Pipeline_Operator = class Babel_Plugin_Proposal_Pipeline_Operator extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      proposal: 'minimal'
    };
    this.mod = '@babel/plugin-proposal-pipeline-operator';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Nullish_Coalescing_Operator = class Babel_Plugin_Proposal_Nullish_Coalescing_Operator extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      loose: false
    };
    this.mod = '@babel/plugin-proposal-nullish-coalescing-operator';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Do_Expressions = class Babel_Plugin_Proposal_Do_Expressions extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-do-expressions';
    this.init();
  }
};
;
// stage_2
// https://babeljs.io/docs/en/babel-plugin-proposal-decorators
let Babel_Plugin_Proposal_Decorators = class Babel_Plugin_Proposal_Decorators extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      legacy: true
    };
    this.mod = '@babel/plugin-proposal-decorators';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Function_Sent = class Babel_Plugin_Proposal_Function_Sent extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-function-sent';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Export_Namespace_From = class Babel_Plugin_Proposal_Export_Namespace_From extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-export-namespace-from';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Numeric_Separator = class Babel_Plugin_Proposal_Numeric_Separator extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-numeric-separator';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Throw_Expressions = class Babel_Plugin_Proposal_Throw_Expressions extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-throw-expressions';
    this.init();
  }
};
;
// stage_3
let Babel_Plugin_Syntax_Dynamic_Import = class Babel_Plugin_Syntax_Dynamic_Import extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-syntax-dynamic-import';
    this.init();
  }
};
;
let Babel_Plugin_Syntax_Import_Meta = class Babel_Plugin_Syntax_Import_Meta extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-syntax-import-meta';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Class_Properties = class Babel_Plugin_Proposal_Class_Properties extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      loose: true
    };
    this.mod = '@babel/plugin-proposal-class-properties';
    this.init();
  }
};
;
let Babel_Plugin_Proposal_Json_Strings = class Babel_Plugin_Proposal_Json_Strings extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-json-strings';
    this.init();
  }
};
;

let Babel_Plugins_Stage_3 = class Babel_Plugins_Stage_3 {
  get plugin() {
    return [new Babel_Plugin_Syntax_Dynamic_Import(), new Babel_Plugin_Syntax_Import_Meta(), new Babel_Plugin_Proposal_Class_Properties(), new Babel_Plugin_Proposal_Json_Strings()];
  }
};
;

let Babel_Plugins_Stage_2 = class Babel_Plugins_Stage_2 {
  get plugin() {
    return [new Babel_Plugin_Proposal_Decorators(), new Babel_Plugin_Proposal_Function_Sent(), new Babel_Plugin_Proposal_Export_Namespace_From(), new Babel_Plugin_Proposal_Numeric_Separator(), new Babel_Plugin_Proposal_Throw_Expressions(), ...new Babel_Plugins_Stage_3().plugin];
  }
};
;

let Babel_Plugins_Stage_1 = class Babel_Plugins_Stage_1 {
  get plugin() {
    return [new Babel_Plugin_Proposal_Export_Default_From(), new Babel_Plugin_Proposal_Logical_Assignment_Operators(), new Babel_Plugin_Proposal_Pipeline_Operator(), new Babel_Plugin_Proposal_Nullish_Coalescing_Operator(), new Babel_Plugin_Proposal_Do_Expressions(), ...new Babel_Plugins_Stage_2().plugin];
  }
};
;

let Babel_Plugins_Stage_0 = class Babel_Plugins_Stage_0 {
  get plugin() {
    return [new Babel_Plugin_Prorosal_Function_Bind(), ...new Babel_Plugins_Stage_1().plugin];
  }
};
;

let BabelLoader = (_temp = _class7 = class BabelLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      babelrc: true,
      presets: [new BabelLoader.Babel_Preset_Env(), new BabelLoader.Babel_Preset_React()],
      plugins: [new BabelLoader.Babel_Plugin_Transform_Runtime(),
      // https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
      ...new Babel_Plugins_Stage_0().plugin],
      cacheDirectory: true // 缓存babel-loader编译结果 
    };
    this.init();
  }

  get dependencies() {
    return ['@babel/core', this.mod];
  }

  transform(opts) {
    const { presets, plugins } = opts;
    let _presets = [];
    let _plugins = [];

    presets.map(preset => {
      if (!(preset instanceof _Mod.Mod)) {
        _presets.push(preset);
        return;
      };

      if (!preset.options) {
        _presets.push(preset.module);
        return;
      };

      if (preset.mod && preset.options) _presets.push([preset.module, preset.options]);
    });

    plugins.map(plugin => {
      if (!(plugin instanceof _Mod.Mod)) {
        _plugins.push(plugin);
        return;
      };

      if (!plugin.options) {
        _plugins.push(plugin.module);
        return;
      };

      if (plugin.mod && plugin.options) _plugins.push([plugin.module, plugin.options]);
    });

    return _extends({}, this.opts, {
      presets: _presets,
      plugins: _plugins
    });
  }

  getOptions(opts = {}) {
    const { presets = [], plugins = [] } = opts;
    const options = _extends({}, opts, {
      presets: [...(this.opts.presets || []), ...presets],
      plugins: [...(this.opts.plugins || []), ...plugins]
    });

    return this.transform ? this.transform(options) : options;
  }
}, _class7.Babel_Preset_Env = Babel_Preset_Env, _class7.Babel_Preset_React = Babel_Preset_React, _class7.Babel_Plugin_Transform_Runtime = Babel_Plugin_Transform_Runtime, _class7.Babel_Plugin_Prorosal_Function_Bind = Babel_Plugin_Prorosal_Function_Bind, _class7.Babel_Plugin_Proposal_Export_Default_From = Babel_Plugin_Proposal_Export_Default_From, _class7.Babel_Plugin_Proposal_Logical_Assignment_Operators = Babel_Plugin_Proposal_Logical_Assignment_Operators, _class7.Babel_Plugin_Proposal_Pipeline_Operator = Babel_Plugin_Proposal_Pipeline_Operator, _class7.Babel_Plugin_Proposal_Nullish_Coalescing_Operator = Babel_Plugin_Proposal_Nullish_Coalescing_Operator, _class7.Babel_Plugin_Proposal_Do_Expressions = Babel_Plugin_Proposal_Do_Expressions, _class7.Babel_Plugin_Proposal_Decorators = Babel_Plugin_Proposal_Decorators, _class7.Babel_Plugin_Proposal_Function_Sent = Babel_Plugin_Proposal_Function_Sent, _class7.Babel_Plugin_Proposal_Export_Namespace_From = Babel_Plugin_Proposal_Export_Namespace_From, _class7.Babel_Plugin_Proposal_Numeric_Separator = Babel_Plugin_Proposal_Numeric_Separator, _class7.Babel_Plugin_Proposal_Throw_Expressions = Babel_Plugin_Proposal_Throw_Expressions, _class7.Babel_Plugin_Syntax_Dynamic_Import = Babel_Plugin_Syntax_Dynamic_Import, _class7.Babel_Plugin_Syntax_Import_Meta = Babel_Plugin_Syntax_Import_Meta, _class7.Babel_Plugin_Proposal_Class_Properties = Babel_Plugin_Proposal_Class_Properties, _class7.Babel_Plugin_Proposal_Json_Strings = Babel_Plugin_Proposal_Json_Strings, _class7.Babel_Plugins_Stage_0 = Babel_Plugins_Stage_0, _class7.Babel_Plugins_Stage_1 = Babel_Plugins_Stage_1, _class7.Babel_Plugins_Stage_2 = Babel_Plugins_Stage_2, _class7.Babel_Plugins_Stage_3 = Babel_Plugins_Stage_3, _temp);
exports.default = BabelLoader;
;
module.exports = exports.default;