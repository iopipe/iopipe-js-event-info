import { eventType as apiGateway } from '../plugins/apiGateway';
import { eventType as cloudFront } from '../plugins/cloudFront';
import { eventType as firehose } from '../plugins/firehose';
import { eventType as kinesis } from '../plugins/kinesis';
import { eventType as s3 } from '../plugins/s3';
import { eventType as scheduled } from '../plugins/scheduled';
import { eventType as slsIntegrationLambda } from '../plugins/slsIntegrationLambda';
import { eventType as sns } from '../plugins/sns';

// e === original lambda event
export default function(e) {
  return (
    apiGateway(e) ||
    cloudFront(e) ||
    firehose(e) ||
    kinesis(e) ||
    s3(e) ||
    scheduled(e) ||
    slsIntegrationLambda(e) ||
    sns(e)
  );
}
