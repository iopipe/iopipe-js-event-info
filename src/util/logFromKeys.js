import get from 'lodash.get';

import { pluginName } from './constants';

export default function logFromWantedKeys({
  event = {},
  type,
  keys = [],
  log
}) {
  keys.forEach(key => {
    const arr = [].concat(key);
    const pathString = arr[0];
    const keyName = arr[1] || arr[0];
    const value = get(event, pathString);
    log(`${pluginName}.${type}.${keyName}`, value);
  });
  log(`${pluginName}.eventType`, type);
}
