import { test } from './mock';

describe('test()', () => {
  it('Should be a function', () => {
    const value = test();

    expect(value).toBe('Test');
  });
});
