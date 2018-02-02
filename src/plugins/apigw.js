module.exports = function handleApiGwEvent (event, log) {
  const required_keys = [
    'path',
    'headers',
    'requestContext',
    'resource',
    'httpMethod'
  ];
  for (var i = 0; i < required_keys.length; i++) {
    if (! (required_keys[i] in event)) {
      return;
    }
  }
  log('event-apigw-path', event.path);
  log('event-apigw-accountId', event.requestContext.accountId);
  log('event-apigw-stage', event.requestContext.stage);
  log('event-apigw-requestId', event.requestContext.requestId);
  if (event.requestContext.identity) {
    log('event-apigw-identityUserAgent', event.requestContext.identity.userAgent);
  }
  log('event-apigw-requestResourcePath', event.requestContext.resourcePath);
  log('event-apigw-requestHttpMethod', event.requestContext.httpMethod);
  log('event-apigw-httpMethod', event.httpMethod);
  log('event-apigw-resource', event.resource);
}
