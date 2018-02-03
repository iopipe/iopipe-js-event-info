import get from 'lodash.get';

export default function logFromWantedKeys({
  event = {},
  type,
  keys = [],
  log,
  pathPrefix = ''
}) {
  keys.forEach(key => {
    const arr = [].concat(key);
    const pathString = arr[0];
    const keyName = arr[1] || arr[0];
    const value = get(event, `${pathPrefix}${pathPrefix && '.'}${pathString}`);
    log(`${type}.${keyName}`, value);
  });
  log('iopipe-event-info-type', type);
}