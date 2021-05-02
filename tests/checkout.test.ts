import Checkout from '../src/models/Checkout';
import { Advertisement } from '../src/models/enums/Advertisement';
import PricingRule, { Discount } from '../src/models/PricingRule';
import Customer from '../src/models/Customer';

let secondBite;
let axilCoffeeRoasters;
let myer;

describe('checkout', () => {
  beforeAll(() => {
    const sdDiscount: Discount = {
      type: Advertisement.Classic,
      quantityDiscount: {
        getQuantity: 3,
        forQuantity: 2,
      }
    }
    const secondBitePrice = PricingRule.new([sdDiscount]);

    const acDiscount: Discount = {
      type: Advertisement.StandOut,
      priceDiscount: 299.99,
    }
    const acPrice = PricingRule.new([acDiscount]);

    const myerStandOutDiscount: Discount = {
      type: Advertisement.StandOut,
      quantityDiscount: {
        getQuantity: 5,
        forQuantity: 4,
      }
    }
    const myerPremiumDiscount: Discount = {
      type: Advertisement.Premium,
      priceDiscount: 389.99,
    }
    const myerPrice = PricingRule.new([myerStandOutDiscount, myerPremiumDiscount]);

    secondBite = Customer.new('SecondBite', secondBitePrice);
    axilCoffeeRoasters = Customer.new('Axil Coffee Roasters', acPrice);
    myer = Customer.new('Myer', myerPrice);
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

  test('checkout total number - SecondBite get 3 for 2', () => {
    const co = Checkout.new(secondBite.pricingRule);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Classic);
    co.add(Advertisement.Premium);
    
    expect(co.total()).toBe(1474.95);
  });

  test('checkout total number -  Axil Coffee Roasters', () => {
    const co = Checkout.new(axilCoffeeRoasters.pricingRule);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.Premium);

    expect(co.total()).toBe(1294.96);
  });

  test('checkout total number -  Myer', () => {
    const co = Checkout.new(myer.pricingRule);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.Premium);

    expect(co.total()).toBe(1358.96);
  });

  test('checkout total number -  Myer get 5 for 4', () => {
    const co = Checkout.new(myer.pricingRule);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.StandOut);
    co.add(Advertisement.Premium);

    expect(co.total()).toBe(2004.94);
  });
});
