'use strict';

const Typetalk = require('typetalk');
const repositoryUrl = "https://github.com/is2ei/serverless-plugin-typetalk-example";

function hasRequiredProperties(service) {
  if (!service.custom) {
    return false;
  }
  if (!service.custom.typetalk) {
    return false;
  }
  if (!service.custom.typetalk.topicId) {
    return false;
  }
  if (!service.custom.typetalk.token) {
    return false;
  }

  return true;
}


class TypetalkServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    if (!hasRequiredProperties(this.serverless.service)) {
      throw new Error(`ServerlessTypetalkPlugin requires options. see ${repositoryUrl}`);
    }

    this.typetalk = new Typetalk.Client({
      token: this.serverless.service.custom.typetalk.token
    });

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
    const message = ':bomb: Removed Serverless service and all resources'
    const id = this.serverless.service.custom.typetalk.topicId
    console.log(this.typetalk);
    this.typetalk.postMessage({message}, {id})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log("TEST");
  }
}

module.exports = TypetalkServerlessPlugin;
