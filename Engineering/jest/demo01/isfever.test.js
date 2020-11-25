const isfever = require('./isfever.js');

test('体温 36.5 摄氏度', () => {
  expect(isfever(36.5)).toBe('正常');
});

test('体温 38 摄氏度', () => {
  expect(isfever(38)).toBe('正常');
});

test('体温 39 摄氏度', () => {
  expect(isfever(39)).toBe('发烧');
});