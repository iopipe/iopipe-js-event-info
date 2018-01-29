module.exports = function handleScheduledevent () {
    console.log("handleScheduledevent called.");
    this.event.Records.forEach((record) => {
      if (record.source !== "aws:events") {
        return;
      }

      this.log(`event-scheduledevent-awsRegion`, record.region); 
      this.log(`event-scheduledevent-account`, record.account);
      this.log(`event-scheduledevent-time`, record.time);
      this.log(`event-scheduledevent-id`, record.id);
      this.log(`event-scheduledevent-resources`, record.resources);
      console.log("Recorded event info.");
    })
  }
  