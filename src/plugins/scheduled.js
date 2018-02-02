module.exports = function handleScheduledEvent (event, log) {
  if (!event.source) return;
  log(`event-scheduledevent-awsRegion`, event.region); 
  log(`event-scheduledevent-account`, event.account);
  log(`event-scheduledevent-time`, event.time);
  log(`event-scheduledevent-id`, event.id);
  log(`event-scheduledevent-resources`, event.resources);
}
