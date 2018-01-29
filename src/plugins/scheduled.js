module.exports = function handleScheduledEvent () {
  const event = this.event;
  if (!event.source) return;
  this.log(`event-scheduledevent-awsRegion`, event.region); 
  this.log(`event-scheduledevent-account`, event.account);
  this.log(`event-scheduledevent-time`, event.time);
  this.log(`event-scheduledevent-id`, event.id);
  this.log(`event-scheduledevent-resources`, event.resources);
}
