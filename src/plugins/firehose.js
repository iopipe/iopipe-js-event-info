module.exports = function handleFirehoseEvent () {
  if (this.event.records && this.event.records.length === 0) {
    return;
  }
  if (this.event.deliveryStreamArn && 
      this.event.records[0].kinesisRecordMetadata) {
    this.log('event-firehose-count', this.event.records.length);
    this.log('event-firehose-deliveryStreamArn', this.event.deliveryStreamArn);
    this.log('event-firehose-awsRegion', this.event.region);
  }
  return;
}
