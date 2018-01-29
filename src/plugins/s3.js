module.exports = function handleS3event () {
  console.log("handleS3event called.");
  this.event.Records.forEach((record) => {
    if (record.eventVersion !== "2.0" ||
        record.eventSource !== "aws:s3") {
      return;
    }

    /* responseElementes used for contacting AWS support */
    this.log(`event-s3-x-amz-request-id`,
             record.responseElements['x-amz-request-id']);
    this.log(`event-s3-x-amz-id-2`,
             record.responseElements['x-amz-id-2']);
    this.log(`event-s3-awsRegion`, record.awsRegion); 
    this.log(`event-s3-bucketName`, record.s3.bucket.name);
    this.log(`event-s3-bucketArn`, record.s3.bucket.arn);
    this.log(`event-s3-objectKey`, record.s3.object.key);
    this.log(`event-s3-objectSize`, record.s3.object.size);
    /* The sequencer key provides a way to determine the sequence of events. (may be undefined?) */
    this.log(`event-s3-objectSequencer`, record.s3.object.sequencer);
    this.log(`event-s3-eventTime`, record.eventTime);
    this.log(`event-s3-eventName`, record.eventName);
    this.log(`event-s3-userIdentity`, record.userIdentity.principalId);
    this.log(`event-s3-sourceIPaddr`, record.requestParameters.sourceIPAddress);
    console.log("Recorded event info.");
  })
}
