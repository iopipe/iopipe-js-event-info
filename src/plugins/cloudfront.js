module.exports = function handleCloudfrontEvent(event, log) {
  if (!event.Records) return;
  if (event.Records.length === 0 || event.Records[0].cf === undefined) {
    return;
  }

  const cf = event.Records[0].cf;
  log('event-cloudfront-distributionId', cf.config.distributionId);
  log('event-cloudfront-clientIp', cf.request.clientIp);
  log('event-cloudfront-method', cf.method);
  log('event-cloudfront-uri', cf.uri);
  if (cf.request.headers.host) {
    log('event-cloudfront-headersHost', cf.request.headers.host[0].value);
  }
  if (cf.request.headers['user-agent']) {
    log(
      'event-cloudfront-headersUserAgent',
      cf.request.headers['user-agent'][0].value
    );
  }
};
