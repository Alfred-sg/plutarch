import path from 'path';
import Command from 'common-bin';

class ProdCommand extends Command {
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
        // 避免深度嵌套的子进程丢失 process.env 信息
        ...process.env,
        "NODE_ENV": "production",
        environment: 'prod',
        "TMPDIR": path.resolve(argv.cwd || cwds, '.tmpdir')
      } 
    });
  }

  get description() {
    return 'prod';
  }
};

module.exports = ProdCommand;
