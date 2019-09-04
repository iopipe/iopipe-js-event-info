import get from 'lodash.get';

import { pluginName } from './constants';

export default function logFromWantedKeys({
  event = {},
  type,
  keys = [],
  log,
  coerceTypes = {}
}) {
  keys.forEach(key => {
    const arr = [].concat(key);
    const pathString = arr[0];
    const keyName = arr[1] || arr[0];
    let value = get(event, pathString);
    if (coerceTypes[keyName] && typeof coerceTypes[keyName] === 'function') {
      try {
        value = coerceTypes[keyName](value);
      } catch (err) {
        // no op
      }
    }
    log(`${pluginName}.${type}.${keyName}`, value);
  });
  log(`${pluginName}.eventType`, type);
}
