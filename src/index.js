import pkg from '../package';
import getEventType from './util/eventType';
import * as reportPlugins from './plugins';

class EventInfoPlugin {
  constructor(config = {}, invocationInstance) {
    this.invocationInstance = invocationInstance;
    this.config = config;

    this.hooks = {
      'pre:report': this.preReport.bind(this)
    };
    return this;
  }
  preReport() {
    const { event, context } = this.invocationInstance;
    const eventType = getEventType(event);
    /* eslint-disable import/namespace */
    const eventPlugin =
      reportPlugins[eventType] && reportPlugins[eventType].plugin;
    /* eslint-enable import/namespace */
    if (typeof eventPlugin !== 'function') {
      return false;
    }
    try {
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

export default function instantiateEventInfoPlugin(pluginOpts) {
  return invocationInstance => {
    return new EventInfoPlugin(pluginOpts, invocationInstance);
  };
}
