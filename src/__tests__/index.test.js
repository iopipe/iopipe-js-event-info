import lib from '../index';

/*eslint-disable no-console*/
console.log = () => {};

test('It works', () => {
  expect(lib()).toBe('apple');
  expect(lib('orange')).toBe('orange');
});
