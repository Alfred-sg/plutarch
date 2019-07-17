"use strict";

var _path = _interopRequireDefault(require("path"));

var _commonBin = _interopRequireDefault(require("common-bin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BuildCommand extends _commonBin.default {
  constructor(rawArgv) {
    super(rawArgv);
    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
      },
      pre: {
        type: 'boolean',
        default: false,
        alias: "p",
        description: 'pre'
      },
      watch: {
        type: 'boolean',
        default: false,
        alias: "w",
        description: 'watch'
      },
      debug: {
        type: 'boolean',
        default: false,
        description: 'build without compress'
      },
      dist: {
        type: 'string',
        default: 'dist',
        alias: 'd',
        description: 'dist'
      }
    };
  }

  *run({
    cwd,
    env,
    argv,
    rawArgv
  }) {
    const runCompilePath = require.resolve("../exec/compile.js");

    const forkNodeArgv = this.helper.unparseArgv(argv);
    this.helper.forkNode(runCompilePath, forkNodeArgv, {
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "production",
        environment: argv.pre ? 'pre' : 'prod',
        "TMPDIR": _path.default.resolve(cwd, '.tmpdir')
      }
    });
  }

  get description() {
    return 'build';
  }

}

;
module.exports = BuildCommand;