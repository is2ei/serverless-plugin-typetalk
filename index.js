'use strict';

class TypetalkServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    if (!this.serverless.custom.typetalk) {
      throw new Error('ServerlessTypetalkPlugin requires options');
    }

    this.hooks = {
      'before:deploy:resources': this.beforeDeployResources.bind(this),
      'before:deploy:functions': this.beforeDeployFunctions.bind(this),
      'remove:remove': this.remove.bind(this),
    };
  }

  beforeDeployResources() {
    this.serverless.cli.log('[Serverless Typetalk Plugin Test] beforeDeployResources()');
  }

  beforeDeployFunctions() {
    this.serverless.cli.log('[Serverless Typetalk Plugin Test] beforeDeployFunctions()');
  }

  remove() {
    this.serverless.cli.log('[Serverless Typetalk Plugin Test] remove()');
    console.log('[Serverless Typetalk Plugin Test] remove()');
  }
}

module.exports = TypetalkServerlessPlugin;
