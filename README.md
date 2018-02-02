# EventInfo Plugin for IOpipe JS

Grabs event information and creates
custom metrics with the IOpipe library.

When this plugin is installed, custom metrics
will be created automatically for
the following event source data:

* apigw
* cloudfront
* firehose
* kinesis
* s3
* scheduled
* sns
* ses

## Install Instructions

`npm install @iopipe/eventinfo`

## Usage Instructions

```js
const eventinfo = require('@iopipe/eventinfo');
const iopipe = require('iopipe');
const iopipeWrapper = iopipe({
  plugins: [
    eventinfoPlugin()
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
