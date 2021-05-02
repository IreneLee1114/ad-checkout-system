import Checkout from '../src/models/Checkout';
import { Advertisement } from '../src/models/enums/Advertisement';
import PricingRule, { Discount } from '../src/models/PricingRule';
import Customer from '../src/models/Customer';

let secondBite;
let axilCoffeeRoasters;

describe('checkout', () => {
  beforeAll(() => {
    const discount: Discount = {
      type: Advertisement.Classic,
      quantityDiscount: {
        getQuantity: 3,
        forQuantity: 2,
      }
    }
    const secondBitePrice = PricingRule.new([discount]);

    secondBite = Customer.new('SecondBite', secondBitePrice);
  })
  test('checkout total number - default', () => {
    const co = Checkout.new();

    co.add(Advertisement.Classic);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.Premium);
    
    expect(co.total()).toBe(987.97);
  });

  test('checkout total number - SecondBite', () => {
    const co = Checkout.new(secondBite.pricingRule);

    co.add(Advertisement.Classic);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Premium);
    
    expect(co.total()).toBe(934.97);
  });

  test('checkout total number -  Axil Coffee Roasters', () => {
    const co = Checkout.new(axilCoffeeRoasters.pricingRule);

    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.Premium);

    expect(co.total()).toBe(1294.96);
  });
});
