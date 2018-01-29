/*eslint-disable no-console*/
import pkg from '../package.json';
import handleS3event from './plugins/s3.js';
import handleKinesisEvent from './plugins/kinesis.js';
import handleFirehoseEvent from './plugins/firehose.js';
import handleScheduledEvent from './plugins/scheduled.js';
import handleCloudfrontEvent from './plugins/cloudfront.js';
import handleApiGwEvent from './plugins/apigw.js';
import handleSnsEvent from './plugins/sns.js';

module.exports = class EventInfoPlugin {
  constructor(config = {}, invocationInstance) {
    this.invocationInstance = invocationInstance;
    this.log = this.invocationInstance.context.iopipe.log;
    this.event = this.invocationInstance.event;
    this.eventPlugins = [
      handleS3event,
      handleKinesisEvent,
      handleFirehoseEvent,
      handleScheduledEvent,
      handleCloudfrontEvent,
      handleApiGwEvent,
      handleSnsEvent,
    ];
    this.hooks = {
      'pre:report': this.preReport.bind(this)
    };
    return this;
  }
  preReport() {
    this.eventPlugins.forEach ((plugin) => {
      plugin.bind(this);
      plugin();
    })
  }
  get meta() {
    return { name: pkg.name, version: pkg.version, homepage: pkg.homepage };
  }
}

/*module.exports = function instantiateEventInfoPlugin(pluginOpts) {
  return invocationInstance => {
    return new EventInfoPlugin(pluginOpts, invocationInstance);
  };*/
