import _ from 'lodash';

import * as miniPlugins from './plugins';
import * as eventSamples from './eventSamples';

const eventInfoPlugin = require('./index');

class MockInvocation {
  constructor(event, labelsAvailable = true) {
    this.logData = {};
    this.context = {
      iopipe: {
        log: (key, value) => {
          this.logData[key] = value;
        }
      }
    };
    this.event = event;
    if (labelsAvailable) {
      this.labels = new Set();
      this.context.iopipe.label = name => {
        this.labels.add(name);
      };
    }
    return this;
  }
}

_.keys(miniPlugins).map(pluginName => {
  return test(`${pluginName} reports snapshot`, () => {
    /*eslint-disable import/namespace*/
    const sampleRecord = eventSamples[pluginName];
    /*eslint-enable import/namespace*/
    // labels available
    const invocationInstance = new MockInvocation(sampleRecord);
    eventInfoPlugin()(invocationInstance).postInvoke();
    const { logData, labels } = invocationInstance;
    expect(_.isEmpty(logData)).toBe(false);
    expect(logData).toMatchSnapshot();
    expect(labels).toMatchSnapshot();

    // Check that the plugin still works if the label function is not available
    // (covers older agents)
    const invocationInstanceWithoutLabels = new MockInvocation(
      sampleRecord,
      false
    );
    eventInfoPlugin()(invocationInstanceWithoutLabels).postInvoke();
    expect(invocationInstanceWithoutLabels.labels).toBeUndefined();
    expect(invocationInstanceWithoutLabels.logData).toMatchSnapshot();
  });
});
