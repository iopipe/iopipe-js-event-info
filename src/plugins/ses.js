module.exports = function handleSESevent () {
    if (this.event.Records.length === 0) {
        return;
    }
    const firstEvent = this.event.Records[0];
    if (firstEvent.eventVersion === "1.0" &&
        firstEvent.eventSource === "aws:sns") {
      this.log(`event-ses-EventSubscriptionArn`, firstEvent.EventSubscriptionArn);
      if (firstEvent.Sns.length === 0) {
          return;
      }
      const firstSns = firstEvent.Sns[0];
      this.log(`event-ses-MessageId`, firstSns.MessageId);
      this.log(`event-ses-Signature`, firstSns.Signature);
      this.log(`event-ses-Type`, firstSns.Type);
      this.log(`event-ses-TopicArn`, firstSns.TopicArn);
      this.log(`event-ses-SignatureVersion`, firstSns.SignatureVersion);
      this.log(`event-ses-Timestamp`, firstSns.Timestamp);
      this.log(`event-ses-SigningCertUrl`, firstSns.SigningCertUrl);
      this.log(`event-ses-UnsubscribeUrl`, firstSns.UnsubscribeUrl);
      this.log(`event-ses-Subject`, firstSns.Subject);
    }
    return;
  }