module.exports = function handleApiGwEvent () {
  const event = this.event;
  const required_keys = [
    'path',
    'headers',
    'requestContext',
    'resource',
    'httpMethod'
  ];
  for (var i = 0; i < required_keys.length; i++) {
    if (! required_keys[i] in event) {
      return;
    }
  }
  this.log('event-apigw-path', event.path);
  this.log('event-apigw-accountId', event.requestContext.accountId);
  this.log('event-apigw-stage', event.requestContext.stage);
  this.log('event-apigw-requestId', event.requestContext.requestId);
  if (event.requestContext.identity) {
    this.log('event-apigw-identityUserAgent', event.requestContext.identity.userAgent);
  }
  this.log('event-apigw-requestResourcePath', event.requestContext.resourcePath);
  this.log('event-apigw-requestHttpMethod', event.requestContext.httpMethod);
  this.log('event-apigw-httpMethod', event.httpMethod);
  this.log('event-apigw-resource', event.resource);
}
