module.exports = function handleCloudfrontEvent () {
  if (this.event.Records.length === 0 ||
      this.event.Records[0].cf === undefined) {
    return;
  }

  const cf = this.event.Records[0].cf;
  this.log('event-cloudfront-distributionId', cf.config.distributionId);
  this.log('event-cloudfront-clientIp', cf.request.clientIp);
  this.log('event-cloudfront-method', cf.method);
  this.log('event-cloudfront-uri', cf.uri);
  if (cf.request.headers.host) {
    this.log('event-cloudfront-headersHost', cf.request.headers.host[0].value);
  }
  if (cf.request.headers['user-agent']) {
    this.log('event-cloudfront-headersUserAgent', cf.request.headers['user-agent'][0].value);
  }
}
