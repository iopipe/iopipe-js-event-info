const iopipeLib = require('@iopipe/iopipe');
const eventInfoPlugin = require('../dist/index');

const iopipe = iopipeLib({
  plugins: [eventInfoPlugin()],
  debug: true
});

module.exports.helloWorld = iopipe((event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*' // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    })
  };

  callback(null, response);
});
