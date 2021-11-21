import { calcScore } from '../src/helpers/calcScore';

describe('calcScore', () => {
  it('returns same for same inputs', () => {
    const v1 = calcScore({ err: 2, unique: 23, len: 12, duration: 4334 });
    const v2 = calcScore({ err: 2, unique: 23, len: 12, duration: 4334 });

    expect(v1).toEqual(v2);
  });

  it('error is always more important than others', () => {
    const v1 = calcScore({ err: 2, unique: 1, len: 1, duration: 30 * 60 * 1000 });
    const v2 = calcScore({ err: 3, unique: 26, len: 200, duration: 1 });

    expect(v1).toBeGreaterThan(v2);
  });

  it('if errors are same, unique is always more important than others', () => {
    const v1 = calcScore({ err: 3, unique: 26, len: 1, duration: 30 * 60 * 1000 });
    const v2 = calcScore({ err: 3, unique: 1, len: 200, duration: 1 });

    expect(v1).toBeGreaterThan(v2);
  });

  it('if error and unique are same, len is always more important than duration', () => {
    const v1 = calcScore({ err: 3, unique: 26, len: 200, duration: 30 * 60 * 1000 });
    const v2 = calcScore({ err: 3, unique: 26, len: 1, duration: 1 });

    expect(v1).toBeGreaterThan(v2);
  });

  it('if error, unique and len are same, only duration matters', () => {
    // Min difference between times needs to be 100ms
    const v1 = calcScore({ err: 3, unique: 26, len: 200, duration: 100 });
    const v2 = calcScore({ err: 3, unique: 26, len: 200, duration: 200 });

    expect(v1).toBeGreaterThan(v2);
  });
});
