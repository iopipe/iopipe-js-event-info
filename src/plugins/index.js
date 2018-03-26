import * as apiGateway from './apiGateway';
import * as slsIntegrationLambda from './slsIntegrationLambda';
import * as cloudFront from './cloudFront';
import * as firehose from './firehose';
import * as kinesis from './kinesis';
import * as s3 from './s3';
import * as scheduled from './scheduled';
import * as sns from './sns';

export {
  apiGateway,
  slsIntegrationLambda,
  cloudFront,
  firehose,
  kinesis,
  s3,
  scheduled,
  sns
};
