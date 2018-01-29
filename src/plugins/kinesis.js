module.exports = function handleKinesisEvent () {
  if (this.event.Records.length === 0) {
    return;
  }
  const firstEvent = this.event.Records[0];
  if (firstEvent.eventVersion === "1.0" &&
      firstEvent.eventSource === "aws:kinesis") {
    this.log('events-kinesis-awsRegion', firstEvent.awsRegion);
    this.log('events-kinesis-count', this.event.Records.length);
  }
  return;
}
