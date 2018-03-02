# IOpipe JS Event Info Plugin

[![Greenkeeper badge](https://badges.greenkeeper.io/iopipe/iopipe-js-event-info.svg)](https://greenkeeper.io/)

Grabs event information and creates
custom metrics with the IOpipe library.

When this plugin is installed, custom metrics
will be created automatically for
the following event source data:

* API Gateway
* CloudFront
* Kinesis
* Kinesis Firehose
* S3
* Scheduled Events
* SNS
* SES

## Install Instructions

`npm install @iopipe/event-info`

## Usage Instructions

```js
const iopipe = require('@iopipe/iopipe');
const eventInfoPlugin = require('@iopipe/event-info');
const iopipeWrapper = iopipe({
  plugins: [
    eventInfoPlugin()
  ]
})

module.exports.handler = iopipeWrapper(
  function yourHandler(event, context, callback) {
    callback();
  }
);
```

# License

Apache 2.0, copyright 2018 IOpipe, Inc.
