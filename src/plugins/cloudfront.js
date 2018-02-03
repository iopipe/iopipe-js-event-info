import logFromKeys from '../util/logFromKeys';

const type = 'cloudFront';

function eventType(event = {}) {
  const { Records = [] } = event;
  return Records[0] && Records[0].cf ? type : false;
}

const keys = [
  'config.distributionId',
  'request.clientIp',
  'request.method',
  'request.uri',
  'request.headers.host[0].value',
  ['request.headers.host[0].value', 'headers.host'],
  'request.headers.["user-agent"][0].value',
  ['request.headers.["user-agent"][0].value', 'headers.userAgent']
];

function plugin(event, log) {
  logFromKeys({
    type,
    event,
    keys,
    log,
    pathPrefix: 'Records[0].cf'
  });
}

export { eventType, plugin };
