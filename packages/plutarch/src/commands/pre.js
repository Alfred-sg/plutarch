import path from 'path';
import Command from 'common-bin';

class PreCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);

    this.options = {
      cwd: {
        type: 'string',
        description: 'process cwd'
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

  * run({ cwd, env, argv, rawArgv }) {
    const runCompilePath = require.resolve("../exec/compile.js");
    const forkNodeArgv = this.helper.unparseArgv(argv);

    this.helper.forkNode(runCompilePath, forkNodeArgv, { 
      cwd: argv.cwd || cwd,
      env: {
        "NODE_ENV": "production",
        environment: 'pre',
        "TMPDIR": path.resolve(cwd, '.tmpdir')
      } 
    });
  }

  get description() {
    return 'pre';
  }
};

module.exports = PreCommand;
