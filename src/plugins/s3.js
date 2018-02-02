module.exports = function handleS3event(event, log) {
  if (!event.Records) return;
  if (event.Records.length === 0) return;
  event.Records.forEach(record => {
    if (record.eventVersion !== '2.0' || record.eventSource !== 'aws:s3') {
      return;
    }

    /* responseElementes used for contacting AWS support */
    log(
      `event-s3-x-amz-request-id`,
      record.responseElements['x-amz-request-id']
    );
    log(`event-s3-x-amz-id-2`, record.responseElements['x-amz-id-2']);
    log(`event-s3-awsRegion`, record.awsRegion);
    log(`event-s3-bucketName`, record.s3.bucket.name);
    log(`event-s3-bucketArn`, record.s3.bucket.arn);
    log(`event-s3-objectKey`, record.s3.object.key);
    log(`event-s3-objectSize`, record.s3.object.size);
    /* The sequencer key provides a way to determine the sequence of events. (may be undefined?) */
    log(`event-s3-objectSequencer`, record.s3.object.sequencer);
    log(`event-s3-eventTime`, record.eventTime);
    log(`event-s3-eventName`, record.eventName);
    log(`event-s3-userIdentity`, record.userIdentity.principalId);
    log(`event-s3-sourceIPaddr`, record.requestParameters.sourceIPAddress);
  });
};
