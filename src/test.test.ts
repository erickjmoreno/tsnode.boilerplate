import { test } from '@utils/placeholderFile';

describe('test', () => {
  it('Should be a function', () => {
    const value = test();

    expect(value).toBe('Test');
    expect(test).toBeFunction();
  });
});
