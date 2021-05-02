import Checkout from '../src/models/Checkout';
import { Advertisement } from '../src/models/enums/Advertisement';
import PricingRule from '../src/models/PricingRule';

describe('checkout', () => {
  test('checkout total number', () => {
    const co = Checkout.new(new PricingRule());
    co.add(Advertisement.CLASSIC);
    co.add(Advertisement.PREMIUM);
    
    expect(co.total()).toBeTruthy();
  });
});
