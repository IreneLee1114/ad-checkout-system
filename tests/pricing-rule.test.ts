import PricingRule, { Discount } from '../src/models/PricingRule';
import { Advertisement } from '../src/models/enums/Advertisement';

let pricingRule

describe('pricing rule' ,() => {
  beforeAll(() => {
    pricingRule = new PricingRule();
  })

  test('add discount failed - no discount setting', () => {
    expect(() => {
      const discount: Discount = {
        type: Advertisement.CLASSIC,
      }
      pricingRule.addDiscount(discount);
    }).toThrow('must set either quantityDiscount or priceDiscount');
  });
  test('add discount failed - multiple discount settings', () => {
    const discount: Discount = {
      type: Advertisement.CLASSIC,
      priceDiscount: 200,
      quantityDiscount: {
        getQuantity: 4,
        forQuantity: 3,
      }
    }
    expect(() => {
      pricingRule.addDiscount(discount);
    }).toThrow('must set either quantityDiscount or priceDiscount');
  });
  test('add discount failed - price discount should lower than original price', () => {
    const discount: Discount = {
      type: Advertisement.CLASSIC,
      priceDiscount: 300,
    }
    expect(() => {
      pricingRule.addDiscount(discount);
    }).toThrow('price discount should be lower than original price');
  });

  test('add discount failed - quantity discount get quantity should be greater than for quantity', () => {
    const discount: Discount = {
      type: Advertisement.CLASSIC,
      quantityDiscount: {
        getQuantity: 4,
        forQuantity: 5,
      }
    }
    expect(() => {
      pricingRule.addDiscount(discount);
    }).toThrow('get quantity should be greater than for quantity');
  });
  test('add discount', () => {
    const discount: Discount = {
      type: Advertisement.CLASSIC,
      quantityDiscount: {
        getQuantity: 4,
        forQuantity: 3,
      }
    }
    pricingRule.addDiscount(discount);
    expect(pricingRule.discounts).toHaveLength(1);
  });
})