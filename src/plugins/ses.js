module.exports = function handleSESevent (event, log) {
    if (!event.Records) return;
    if (event.Records.length === 0) return;
    const firstEvent = event.Records[0];
    if (firstEvent.eventVersion === "1.0" &&
        firstEvent.eventSource === "aws:sns") {
      if (!firstEvent.Sns) return;
      if (firstEvent.Sns.length === 0) return;
      const firstSns = firstEvent.Sns[0];
      log(`event-ses-EventSubscriptionArn`, firstEvent.EventSubscriptionArn);
      log(`event-ses-MessageId`, firstSns.MessageId);
      log(`event-ses-Signature`, firstSns.Signature);
      log(`event-ses-Type`, firstSns.Type);
      log(`event-ses-TopicArn`, firstSns.TopicArn);
      log(`event-ses-SignatureVersion`, firstSns.SignatureVersion);
      log(`event-ses-Timestamp`, firstSns.Timestamp);
      log(`event-ses-SigningCertUrl`, firstSns.SigningCertUrl);
      log(`event-ses-UnsubscribeUrl`, firstSns.UnsubscribeUrl);
      log(`event-ses-Subject`, firstSns.Subject);
    }
    return;
  }
