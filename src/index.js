/*eslint-disable no-console*/
import pkg from '../package.json';
import handleS3event from './plugins/s3.js';

module.exports = class EventInfoPlugin {
  constructor(config = {}, invocationInstance) {
    this.invocationInstance = invocationInstance;
    this.log = this.invocationInstance.context.iopipe.log;
    this.event = this.invocationInstance.event;
    this.eventPlugins = [
      handleS3event,
      handleKinesisevent
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

function handleKinesisevent () {
  this.event.Records.forEach((record) => {
    if (record.eventVersion !== "1.0" ||
        record.eventSource !== "aws:kinesis") {
          return;
    }
    
    this.log('event-kinesis-eventID', record.eventID);
    this.log('events-kinesis-awsRegion', record.awsRegion);
    this.log('events-kinesis-eventSourceARN', record.eventSourceARN);
    this.log('events-kinesis-eventName', record.eventName);
    this.log('events-kinesis-partitionKey', record.events.kinesis.partitionKey);
    this.log('events-kinesis-data', record.kinesis.data);
    this.log('events-kinesis-schemaVersion', record.kinesis.kinesisSchemaVersion);
    this.log('events-kinesis-sequenceNumer', record.kinesis.sequenceNumber);
  })
}