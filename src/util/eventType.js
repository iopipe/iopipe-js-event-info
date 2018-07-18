import { eventType as alexaSkill } from '../plugins/alexaSkill';
import { eventType as apiGateway } from '../plugins/apiGateway';
import { eventType as cloudFront } from '../plugins/cloudFront';
import { eventType as firehose } from '../plugins/firehose';
import { eventType as kinesis } from '../plugins/kinesis';
import { eventType as s3 } from '../plugins/s3';
import { eventType as scheduled } from '../plugins/scheduled';
import { eventType as slsIntegrationLambda } from '../plugins/slsIntegrationLambda';
import { eventType as sns } from '../plugins/sns';
import { eventType as sqs } from '../plugins/sqs';

// e === original lambda event
export function getEventType(e) {
  return (
    apiGateway(e) ||
    cloudFront(e) ||
    firehose(e) ||
    kinesis(e) ||
    s3(e) ||
    scheduled(e) ||
    sns(e) ||
    sqs(e) ||
    alexaSkill(e) ||
    slsIntegrationLambda(e)
  );
}

export function eventTypeToSlug(eventType) {
  return eventType.replace(/([A-Z])/g, '-$1').toLowerCase();
}
