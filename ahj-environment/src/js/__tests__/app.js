import demo from '../app';

test('The demo function return value', () => {
  const receivedValue = 'test';
  expect(demo('test')).toBe(receivedValue);
});
