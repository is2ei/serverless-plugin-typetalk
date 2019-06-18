const Constants = require("./constants"),
    Typetalk = require("typetalk");

function hasRequiredProperties (service) {
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

    /**
     * Constructor
     * @param {Object} serverless
     * @param {Object} options
     */
    constructor (serverless, options) {
        this.serverless = serverless;
        this.options = options;

        if (!hasRequiredProperties(this.serverless.service)) {
            /* eslint-disable-next-line max-len */
            throw new Error(`ServerlessTypetalkPlugin requires options. see ${Constants.REPOSITORY_URL}`);
        }

        this.typetalk = new Typetalk.Client({
            token: this.serverless.service.custom.typetalk.token
        });

        this.hooks = {
            "before:deploy:deploy": this.beforeDeployDeploy.bind(this),
            "deploy:deploy": this.deployDeploy.bind(this),
            "remove:remove": this.remove.bind(this)
        };
    }

    beforeDeployDeploy () {
        /* eslint-disable-next-line max-len */
        let message = `:airplane_departure: Start deploying \`${this.serverless.service.service}\`...`;
        if (this.serverless.service.custom.typetalk.message) {
            message += "\n";
            message += this.serverless.service.custom.typetalk.message;
        }
        const id = this.serverless.service.custom.typetalk.topicId;
        return this.typetalk.postMessage({message}, {id})
            .then(() => this.serverless.cli.log(Constants.MSG_SUCCESS))
            .catch((err) => this.serverless.cli.log(Constants.msgFailed(err)));
    }

    deployDeploy () {
        /* eslint-disable-next-line max-len */
        let message = `:confetti_ball: Deployed \`${this.serverless.service.service}\``;
        if (this.serverless.service.custom.typetalk.message) {
            message += "\n";
            message += this.serverless.service.custom.typetalk.message;
        }
        const id = this.serverless.service.custom.typetalk.topicId;
        return this.typetalk.postMessage({message}, {id})
            .then(() => this.serverless.cli.log(Constants.MSG_SUCCESS))
            .catch((err) => this.serverless.cli.log(Constants.msgFailed(err)));
    }

    remove () {
        /* eslint-disable-next-line max-len */
        let message = `:bomb: Removed \`${this.serverless.service.service}\``;
        if (this.serverless.service.custom.typetalk.message) {
            message += "\n";
            message += this.serverless.service.custom.typetalk.message;
        }
        const id = this.serverless.service.custom.typetalk.topicId;
        return this.typetalk.postMessage({message}, {id})
            .then(() => this.serverless.cli.log(Constants.MSG_SUCCESS))
            .catch((err) => this.serverless.cli.log(Constants.msgFailed(err)));
    }

}

module.exports = TypetalkServerlessPlugin;
