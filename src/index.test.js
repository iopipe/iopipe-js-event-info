import _ from 'lodash';

import * as miniPlugins from './plugins';
import * as eventSamples from './eventSamples';

const eventInfoPlugin = require('./index');

class MockInvocation {
  constructor(event) {
    this.logData = {};
    this.context = {
      iopipe: {
        log: (key, value) => {
          this.logData[key] = value;
        }
      }
    };
    this.event = event;
    return this;
  }
}

_.keys(miniPlugins).map(pluginName => {
  return test(`${pluginName} reports snapshot`, () => {
    /*eslint-disable import/namespace*/
    const sampleRecord = eventSamples[pluginName];
    /*eslint-enable import/namespace*/
    const invocationInstance = new MockInvocation(sampleRecord);
    eventInfoPlugin()(invocationInstance).preReport();
    const { logData } = invocationInstance;
    expect(_.isEmpty(logData)).toBe(false);
    expect(logData).toMatchSnapshot();
  });
});
