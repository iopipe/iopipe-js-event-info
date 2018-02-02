module.exports = function handleSNSevent(event, log) {
  if (!event.Records) return;
  if (event.Records.length === 0) return;
  const firstEvent = event.Records[0];
  if (
    firstEvent.eventVersion === '1.0' &&
    firstEvent.eventSource === 'aws:sns'
  ) {
    if (!firstEvent.Sns) return;
    if (firstEvent.Sns.length === 0) return;
    const firstSns = firstEvent.Sns[0];
    log(`event-sns-EventSubscriptionArn`, firstEvent.EventSubscriptionArn);
    log(`event-sns-MessageId`, firstSns.MessageId);
    log(`event-sns-Signature`, firstSns.Signature);
    log(`event-sns-Type`, firstSns.Type);
    log(`event-sns-TopicArn`, firstSns.TopicArn);
    log(`event-sns-SignatureVersion`, firstSns.SignatureVersion);
    log(`event-sns-Timestamp`, firstSns.Timestamp);
    log(`event-sns-SigningCertUrl`, firstSns.SigningCertUrl);
    log(`event-sns-UnsubscribeUrl`, firstSns.UnsubscribeUrl);
    log(`event-sns-Subject`, firstSns.Subject);
  }
};
