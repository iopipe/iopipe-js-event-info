const notS3record = { "hello": "world" };
const sampleS3record =
  {
     "Records":[
        {
           "eventVersion":"2.0",
           "eventSource":"aws:s3",
           "awsRegion":"us-east-1",
           "eventTime": "1970-01-01T00:00:00.000Z",
           "eventName":"event-type",
           "userIdentity":{
              "principalId":"Amazon-customer-ID-of-the-user-who-caused-the-event"
           },
           "requestParameters":{
              "sourceIPAddress":"ip-address-where-request-came-from"
           },
           "responseElements":{
              "x-amz-request-id":"Amazon S3 generated request ID",
              "x-amz-id-2":"Amazon S3 host that processed the request"
           },
           "s3":{
              "s3SchemaVersion":"1.0",
              "configurationId":"ID found in the bucket notification configuration",
              "bucket":{
                 "name":"bucket-name",
                 "ownerIdentity":{
                    "principalId":"Amazon-customer-ID-of-the-bucket-owner"
                 },
                 "arn":"bucket-ARN"
              },
              "object":{
                 "key":"object-key",
                 "size": 10,
                 "eTag":"object eTag",
                 "versionId":"object version if bucket is versioning-enabled, otherwise null",
                 "sequencer": "a string representation of a hexadecimal value used to determine event sequence, only used with PUTs and DELETEs"
              }
           }
        }
     ]
  };
const sampleKinesisrecord =
  {
    "Records": [
      {
        "eventID": "shardId-000000000000:49545115243490985018280067714973144582180062593244200961",
        "eventVersion": "1.0",
        "kinesis": {
          "partitionKey": "partitionKey-3",
          "data": "SGVsbG8sIHRoaXMgaXMgYSB0ZXN0IDEyMy4=",
          "kinesisSchemaVersion": "1.0",
          "sequenceNumber": "49545115243490985018280067714973144582180062593244200961"
        },
        "invokeIdentityArn": "invoked-by-arn",
        "eventName": "aws:kinesis:record",
        "eventSourceARN": "event-source-arn",
        "eventSource": "aws:kinesis",
        "awsRegion": "us-east-1"
      }
    ]
  }

describe("ignores non-S3 records", () => {
  it("has no Records key", () => {
  });

  it("has non-S3 records", () => {
  });
});

describe("understanding of S3 event records", () => {
  it("creates custom metrics", () => {
  });

  it("includes the object key", () => {
  });
});
