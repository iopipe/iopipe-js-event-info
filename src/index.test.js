import 'iopipe';
import EventInfoPlugin from './index.js';
import handleS3event from './plugins/s3.js';
import handleKinesisEvent from './plugins/kinesis.js';
import handleFirehoseEvent from './plugins/firehose.js';
import handleScheduledEvent from './plugins/scheduled.js';
import handleCloudfrontEvent from './plugins/cloudfront.js';
import handleApiGwEvent from './plugins/apigw.js';
import handleSnsEvent from './plugins/sns.js';

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
  }

const sampleSnsRecord =
  {
    "Records": [
      {
        "EventVersion": "1.0",
        "EventSource": "aws:sns",
        "EventSubscriptionArn": "arn:aws:sns:us-west-2:123456789000:ses_messages:26a58451-3392-4ab6-a829-d65c2968421a",
        "Sns":
          {
            "MessageId": "483eae4c-4fb0-57e5-a5f9-ff9b08612bef",
            "Signature": "Uy3tn/qAQg/sXARGk2DRddd31ZtyDE+B1IzRla/KA75BaerApJqN+H59q69z8H+pRx0AyUwOD1K0huBYdDRbAMVOUsMgZgdcNjj0gSfFg8uZvTuKaqTaWj4E0hmzoemHENWeuswuq3l6xoPcAJ9fHd2yFhX+792AV++i/8P4EKv/9I4j8Ejs3OxMRN49gkWefKbv4/avyHOdSaFTnXV0rGLmPb103dtjeY4K05PTKvUlPerN+MdRTvHrjApvqDvP0NEVyYBU4zFZQ6GnFcFnHtTk44c3NH/dVi6Gf9VrX8V1id5VSZICYiIG1iaUZ0b676IhRh8znzjMDWaczOBwkA==",
            "Type": "Notification",
            "TopicArn": "arn:aws:sns:us-west-2:123456789000:ses_messages",
            "SignatureVersion": "1",
            "Timestamp": "2017-07-05T20:01:21.366Z",
            "SigningCertUrl": "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-b95095beb82e8f6a046b3aafc7f4149a.pem",
            "UnsubscribeUrl": "https://sns.us-west-2.amazonaws.com/?Action=Unsubscribe&eifjccgihujihfhrchunfnglreichbrcljrnlvtbeked",
            "Subject": "This is a test subject"
          }
      }
    ]
  };

const sampleApiGwRecord =
	{
		"path": "/test/hello",
		"headers": {
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Encoding": "gzip, deflate, lzma, sdch, br",
			"Accept-Language": "en-US,en;q=0.8",
			"CloudFront-Forwarded-Proto": "https",
			"CloudFront-Is-Desktop-Viewer": "true",
			"CloudFront-Is-Mobile-Viewer": "false",
			"CloudFront-Is-SmartTV-Viewer": "false",
			"CloudFront-Is-Tablet-Viewer": "false",
			"CloudFront-Viewer-Country": "US",
			"Host": "wt6mne2s9k.execute-api.us-west-2.amazonaws.com",
			"Upgrade-Insecure-Requests": "1",
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36 OPR/39.0.2256.48",
			"Via": "1.1 fb7cca60f0ecd82ce07790c9c5eef16c.cloudfront.net (CloudFront)",
			"X-Amz-Cf-Id": "nBsWBOrSHMgnaROZJK1wGCZ9PcRcSpq_oSXZNQwQ10OTZL4cimZo3g==",
			"X-Forwarded-For": "192.168.100.1, 192.168.1.1",
			"X-Forwarded-Port": "443",
			"X-Forwarded-Proto": "https"
		},
		"pathParameters": {
			"proxy": "hello"
		},
		"requestContext": {
			"accountId": "123456789012",
			"resourceId": "us4z18",
			"stage": "test",
			"requestId": "41b45ea3-70b5-11e6-b7bd-69b5aaebc7d9",
			"identity": {
				"cognitoIdentityPoolId": "",
				"accountId": "",
				"cognitoIdentityId": "",
				"caller": "",
				"apiKey": "",
				"sourceIp": "192.168.100.1",
				"cognitoAuthenticationType": "",
				"cognitoAuthenticationProvider": "",
				"userArn": "",
				"userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36 OPR/39.0.2256.48",
				"user": ""
			},
			"resourcePath": "/{proxy+}",
			"httpMethod": "GET",
			"apiId": "wt6mne2s9k"
		},
		"resource": "/{proxy+}",
		"httpMethod": "GET",
		"queryStringParameters": {
			"name": "me"
		},
		"stageVariables": {
			"stageVarName": "stageVarValue"
		}
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
  it("creates distributionId custom metric", () => {
    const invocationInstance = new MockInvocation(sampleCloudfrontRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleCloudfrontEvent.apply(plugin);

    expect(invocationInstance.logData['event-cloudfront-distributionId']).toEqual(sampleCloudfrontRecord.Records[0].cf.config.distributionId);
  });
});

describe("understanding of apigw event records", () => {
  it("creates accountId custom metric", () => {
    const invocationInstance = new MockInvocation(sampleApiGwRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleApiGwEvent.apply(plugin);

    expect(invocationInstance.logData['event-apigw-accountId']).toEqual(sampleApiGwRecord.requestContext.accountId);
  });
});
describe("understanding of sns event records", () => {
  it("creates EventSubscriptionArn custom metric", () => {
    const invocationInstance = new MockInvocation(sampleSnsRecord);
    const plugin = new EventInfoPlugin({}, invocationInstance);
    handleSesEvent.apply(plugin);

    expect(invocationInstance.logData['event-sns-EventSubscriptionArn']).toEqual(sampleSnsRecord.EventSubscriptionArn);
  });
});
