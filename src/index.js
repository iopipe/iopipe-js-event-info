import pkg from '../package';
import { getEventType, eventTypeToSlug } from './util/eventType';
import * as reportPlugins from './plugins';

class EventInfoPlugin {
  constructor(config = {}, invocationInstance) {
    this.invocationInstance = invocationInstance;
    this.config = config;

    this.hooks = {
      'post:invoke': this.postInvoke.bind(this)
    };
    return this;
  }
  postInvoke() {
    try {
      const { event, context } = this.invocationInstance;
      const eventType = getEventType(event);
      /* eslint-disable import/namespace */
      const eventPlugin =
        reportPlugins[eventType] && reportPlugins[eventType].plugin;
      /* eslint-enable import/namespace */
      if (typeof eventPlugin !== 'function') {
        return false;
      }
      if (typeof context.iopipe.label === 'function') {
        context.iopipe.label('@iopipe/plugin-event-info');
        context.iopipe.label(`@iopipe/aws-${eventTypeToSlug(eventType)}`);
      }
      eventPlugin(event, context.iopipe.log);
    } catch (err) {
      // err
    }
    return true;
  }
  get meta() {
    const { name, version, homepage } = pkg;
    return { name, version, homepage };
  }
}

module.exports = function instantiateEventInfoPlugin(pluginOpts) {
  return invocationInstance => {
    return new EventInfoPlugin(pluginOpts, invocationInstance);
  };
};
