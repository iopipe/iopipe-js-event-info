/*eslint-disable no-console*/
import pkg from '../package';
import handleS3event from './plugins/s3';
import handleKinesisEvent from './plugins/kinesis';
import handleFirehoseEvent from './plugins/firehose';
import handleScheduledEvent from './plugins/scheduled';
import handleCloudfrontEvent from './plugins/cloudfront';
import handleApiGwEvent from './plugins/apigw';
import handleSnsEvent from './plugins/sns';

class EventInfoPlugin {
  constructor(config = {}, invocationInstance) {
    this.invocationInstance = invocationInstance;
    this.config = config;

    this.hooks = {
      'pre:report': this.preReport.bind(this)
    };
    return this;
  }
  preReport() {
    const eventPlugins = [
      handleS3event,
      handleKinesisEvent,
      handleFirehoseEvent,
      handleScheduledEvent,
      handleCloudfrontEvent,
      handleApiGwEvent,
      handleSnsEvent
    ];
    this.log = this.invocationInstance.context.iopipe.log;
    this.event = this.invocationInstance.event;
    eventPlugins.forEach(plugin => {
      //plugin.bind(this);
      plugin(this.event, this.log);
    });
  }
  get meta() {
    return { name: pkg.name, version: pkg.version, homepage: pkg.homepage };
  }
}

export default function instantiateEventInfoPlugin(pluginOpts) {
  return invocationInstance => {
    return new EventInfoPlugin(pluginOpts, invocationInstance);
  };
}
