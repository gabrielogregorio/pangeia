import { normalizeStrings } from '@/normalizers/strings';

describe('Normalize', () => {
  it('should normalize string', () => {
    expect(normalizeStrings('Ãbç#@_+dEf\\%(@?!"')).toEqual('abcdef');
  });
});
