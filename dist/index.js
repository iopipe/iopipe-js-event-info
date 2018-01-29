'use strict';

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EventInfoPlugin {
  constructor(config = {}, invocationInstance) {
    this.invocationInstance = invocationInstance;
    this.log = this.invocationInstance.context.iopipe.log;
    this.event = this.invocationInstance.event;
    this.eventPlugins = [handleS3event];
    this.hooks = {
      'pre:report': this.preReport.bind(this)
    };
    return this;
  }
  preReport() {
    this.eventPlugins.forEach(plugin => {
      plugin.bind(this);
      plugin();
    });
  }
  get meta() {
    return { name: _package2.default.name, version: _package2.default.version, homepage: _package2.default.homepage };
  }
} /*eslint-disable no-console*/


module.exports = function (pluginOpts) {
  return invocationInstance => {
    return new EventInfoPlugin(pluginOpts, invocationInstance);
  };
};

function handleS3event() {
  this.event.Records.forEach(record => {
    if (record.eventVersion !== "2.0" || record.eventSource !== "aws:s3") {
      return;
    }

    /* responseElementes used for contacting AWS support */
    this.log(`event-s3-x-amz-request-id`, record.responseElements['x-amz-request-id']);
    this.log(`event-s3-x-amz-id-2`, record.responseElements['x-amz-id-2']);
    this.log(`event-s3-awsRegion`, record.awsRegion);
    this.log(`event-s3-bucketName`, record.s3.bucket.name);
    this.log(`event-s3-bucketArn`, record.s3.bucket.arn);
    this.log(`event-s3-objectKey`, record.s3.object.key);
    this.log(`event-s3-objectSize`, record.s3.object.size);
    /* The sequencer key provides a way to determine the sequence of events. (may be undefined?) */
    this.log(`event-s3-objectSequencer`, record.s3.object.sequencer);
    this.log(`event-s3-eventTime`, record.eventTime);
    this.log(`event-s3-eventName`, record.eventName);
    this.log(`event-s3-userIdentity`, record.userIdentity.principalId);
    this.log(`event-s3-sourceIPaddr`, record.requestParameters.sourceIPAddress);
  });
}