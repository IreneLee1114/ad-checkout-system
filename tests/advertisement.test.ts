import { Advertisement, getAdPrice} from '../src/models/enums/Advertisement';

describe('advertisement enum', () => {
  test('get advertisement price by enum type', () => {
    expect(getAdPrice(Advertisement.Classic)).toBe(269.99);
    expect(getAdPrice(Advertisement.StandOut)).toBe(322.99);
    expect(getAdPrice(Advertisement.Premium)).toBe(394.99);
  });
});