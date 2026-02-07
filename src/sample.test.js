import { describe, it, expect } from '@jest/globals';

describe('Sample Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle strings', () => {
    expect('hello').toContain('ell');
  });
});