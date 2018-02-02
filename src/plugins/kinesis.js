module.exports = function handleKinesisEvent(event, log) {
  if (!event.Records) return;
  if (event.Records.length === 0) return;
  const firstEvent = event.Records[0];
  if (
    firstEvent.eventVersion === '1.0' &&
    firstEvent.eventSource === 'aws:kinesis'
  ) {
    log('event-kinesis-awsRegion', firstEvent.awsRegion);
    log('event-kinesis-streamArn', firstEvent.eventSourceARN);
    log('event-kinesis-count', event.Records.length);
  }
};
