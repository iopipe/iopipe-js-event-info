import 'iopipe';
import EventInfoPlugin from './index.js';
import handleS3event from './plugins/s3.js';
import handleKinesisEvent from './plugins/kinesis.js';
import handleFirehoseEvent from './plugins/firehose.js';
import handleScheduledEvent from './plugins/scheduled.js';
import handleCloudfrontEvent from './plugins/cloudfront.js';

class MockInvocation {
  constructor(event) {
    this.logData = {};
    this.context = {
      'iopipe': {
        'log': (key, value) => {
          this.logData[key] = value;
        }
      }
    }
    this.event = event;
    return this;
  }
}

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

const sampleKinesisRecord =
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

const sampleFirehoseRecord =
	{
		"invocationId": "invoked123",
		"deliveryStreamArn": "aws:lambda:events",
		"region": "us-west-2",
		"records": [
			{
				"data": "SGVsbG8gV29ybGQ=",
				"recordId": "record1",
				"approximateArrivalTimestamp": 1510772160000,
				"kinesisRecordMetadata": {
					"shardId": "shardId-000000000000",
					"partitionKey": "4d1ad2b9-24f8-4b9d-a088-76e9947c317a",
					"approximateArrivalTimestamp": "2012-04-23T18:25:43.511Z",
					"sequenceNumber": "49546986683135544286507457936321625675700192471156785154",
					"subsequenceNumber": ""
				}
			},
			{
				"data": "SGVsbG8gV29ybGQ=",
				"recordId": "record2",
				"approximateArrivalTimestamp": 151077216000,
				"kinesisRecordMetadata": {
					"shardId": "shardId-000000000001",
					"partitionKey": "4d1ad2b9-24f8-4b9d-a088-76e9947c318a",
					"approximateArrivalTimestamp": "2012-04-23T19:25:43.511Z",
					"sequenceNumber": "49546986683135544286507457936321625675700192471156785155",
					"subsequenceNumber": ""
				}
			}
		]
  }

const sampleScheduledEventRecord =
  {
    "account": "123456789012",
    "region": "us-east-1",
    "detail": {},
    "detail-type": "Scheduled Event",
    "source": "aws.events",
    "time": "1970-01-01T00:00:00Z",
    "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
    "resources": [
      "arn:aws:events:us-east-1:123456789012:rule/my-schedule"
    ]
  }
  ;

const sampleCloudfrontRecord =
	{
		"Records": [
			{
				"cf": {
					"config": {
						"distributionId": "EDFDVBD6EXAMPLE"
					},
					"request": {
						"clientIp": "2001:0db8:85a3:0:0:8a2e:0370:7334",
						"method": "GET",
						"uri": "/picture.jpg",
						"headers": {
							"host": [
								{
									"key": "Host",
									"value": "d111111abcdef8.cloudfront.net"
								}
							],
							"user-agent": [
								{
									"key": "User-Agent",
									"value": "curl/7.51.0"
								}
							]
						}
					}
				}
			}
		]
	};

describe("ignores non-S3 records", () => {
  it("has no Records key", () => {
  });

  it("has non-S3 records", () => {
  });
});

describe("understanding of S3 event records", () => {
  it("creates awsRegion custom metric", () => {
    const invocationInstance = new MockInvocation(sampleS3record);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleS3event.apply(plugin);

    expect(invocationInstance.logData['event-s3-awsRegion']).toEqual(sampleS3record.Records[0].awsRegion);
  });
});

describe("understanding of kinesis event records", () => {
  it("creates awsRegion custom metric", () => {
    const invocationInstance = new MockInvocation(sampleKinesisRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleKinesisEvent.apply(plugin);

    expect(invocationInstance.logData['event-kinesis-awsRegion']).toEqual(sampleKinesisRecord.Records[0].awsRegion);
  });
});

describe("understanding of firehose event records", () => {
  it("creates awsRegion custom metric", () => {
    const invocationInstance = new MockInvocation(sampleFirehoseRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleFirehoseEvent.apply(plugin);

    expect(invocationInstance.logData['event-kinesis-awsRegion']).toEqual(sampleFirehoseRecord.records[0].region);
  });
});

describe("understanding of scheduled event records", () => {
  it("creates awsRegion custom metric", () => {
    const invocationInstance = new MockInvocation(sampleScheduledEventRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleScheduledEvent.apply(plugin);

    expect(invocationInstance.logData['event-scheduledevent-awsRegion']).toEqual(sampleScheduledEventRecord.region);
  });
});

describe("understanding of cloudfront event records", () => {
  it("creates awsRegion custom metric", () => {
    const invocationInstance = new MockInvocation(sampleCloudfrontRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleCloudfrontEvent.apply(plugin);

    expect(invocationInstance.logData['event-cloudfront-distributionId']).toEqual(sampleCloudfrontRecord.Records[0].cf.config.distributionId);
  });
});
