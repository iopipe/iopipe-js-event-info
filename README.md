# EventInfo Plugin for IOpipe JS

Grabs event information and creates
custom metrics with the IOpipe library.

## Install Instructions

`yarn add @iopipe/eventinfo`

## Usage Instructions

```js
const eventinfo = require '@iopipe/eventinfo';
const iopipe = require 'iopipe';

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
