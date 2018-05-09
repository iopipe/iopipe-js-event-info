# IOpipe JS Event Info Plugin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Grabs event information and creates
custom metrics with the IOpipe library.

When this plugin is installed, custom metrics
will be created automatically for
the following event source data:

* Alexa Skill Kit
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
