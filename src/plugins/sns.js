module.exports = function handleSnsEvent () {
    if (this.event.Records.length === 0) {
        return;
    }
    const firstEvent = this.event.Records[0];
    if (firstEvent.eventVersion === "1.0" &&
        firstEvent.eventSource === "aws:sns") {
      this.log(`event-sns-EventSubscriptionArn`, firstEvent.EventSubscriptionArn);
      if (firstEvent.Sns.length === 0) {
          return;
      }
      const firstSns = firstEvent.Sns[0];
      this.log(`event-sns-MessageId`, firstSns.MessageId);
      this.log(`event-sns-Signature`, firstSns.Signature);
      this.log(`event-sns-Type`, firstSns.Type);
      this.log(`event-sns-TopicArn`, firstSns.TopicArn);
      this.log(`event-sns-SignatureVersion`, firstSns.SignatureVersion);
      this.log(`event-sns-Timestamp`, firstSns.Timestamp);
      this.log(`event-sns-SigningCertUrl`, firstSns.SigningCertUrl);
      this.log(`event-sns-UnsubscribeUrl`, firstSns.UnsubscribeUrl);
      this.log(`event-sns-Subject`, firstSns.Subject);
    }
    return;
  }