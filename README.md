# IOpipe JS Event Info Plugin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Records Lambda event information for observability, search, and alerting within [IOpipe](https://iopipe.com).

This plugin currently supports these event types:

* Alexa Skill Kit
* API Gateway
* CloudFront
* Kinesis
* Kinesis Firehose
* S3
* Scheduled Events
* SNS
* SES
* SQS

## Installation

__Note: This plugin is automatically included in the recommended package [@iopipe/iopipe](https://github.com/iopipe/iopipe-js). No direct install necessary.__

With [yarn](https://yarnpkg.com/) (recommended) in project directory:

`yarn add @iopipe/event-info`

With npm in project directory:

`npm install @iopipe/event-info`

## Usage

```js
const iopipe = require('@iopipe/core');
const eventInfoPlugin = require('@iopipe/event-info');
const iopipeWrapper = iopipe({
  plugins: [
    eventInfoPlugin()
  ]
})

exports.handler = iopipeWrapper((event, context) => {
    context.succeed('Success!');
  }
);
```

## License

Apache-2.0 see [LICENSE](https://www.apache.org/licenses/LICENSE-2.0.html)

Copyright 2018, IOpipe, Inc.
