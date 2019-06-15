'use strict';

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:deploy:resources': this.beforeDeployResources.bind(this),
      'before:deploy:functions': this.beforeDeployFunctions.bind(this),
    };
  }

  beforeDeployResources() {
    this.serverless.cli.log('[Serverless Typetalk Plugin Test] beforeDeployResources()');
  }

  beforeDeployFunctions() {
    this.serverless.cli.log('[Serverless Typetalk Plugin Test] beforeDeployFunctions()');
  }
}

module.exports = ServerlessPlugin;
