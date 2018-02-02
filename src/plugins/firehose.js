module.exports = function handleFirehoseEvent (event, log) {
  if (!event.records) return;
  if (event.records.length === 0) return;
  if (event.deliveryStreamArn && 
      event.records[0].kinesisRecordMetadata) {
    log('event-firehose-count', event.records.length);
    log('event-firehose-deliveryStreamArn', event.deliveryStreamArn);
    log('event-firehose-awsRegion', event.region);
  }
  return;
}
