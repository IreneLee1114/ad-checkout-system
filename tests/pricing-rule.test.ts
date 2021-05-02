import PricingRule, { Discount } from '../src/models/PricingRule';
import { Advertisement } from '../src/models/enums/Advertisement';

let pricingRule

describe('pricing rule' ,() => {
  describe('new pricing rule function', () => {
    beforeEach(() => {
      pricingRule = undefined;
    })
    test('new pricing rule', () => {
      expect(pricingRule).toBeUndefined();
      pricingRule = PricingRule.new();
      expect(pricingRule).toBeDefined();
    });

    test('new pricing rule with discount', () => {
      pricingRule = PricingRule.new([{ type: Advertisement.Classic, priceDiscount: 200}]);
      expect(pricingRule).toBeDefined();
      expect(pricingRule.discounts).toHaveLength(1);
    });

    test('new pricing rule with discount - failed', () => {
      expect(() => {
        pricingRule = PricingRule.new([{ type: Advertisement.Classic }]);
      }).toThrow('must set either quantityDiscount or priceDiscount');

      expect(pricingRule).toBeUndefined();
    });
  });

  describe('add discount function', () => {
    beforeEach(() => {
      pricingRule = PricingRule.new();
    })

    test('add discount failed - no discount setting', () => {
      expect(() => {
        const discount: Discount = {
          type: Advertisement.Classic,
        }
        pricingRule.addDiscount(discount);
      }).toThrow('must set either quantityDiscount or priceDiscount');
      expect(pricingRule.discounts).toHaveLength(0);
    });

    test('add discount failed - multiple discount settings', () => {
      const discount: Discount = {
        type: Advertisement.Classic,
        priceDiscount: 200,
        quantityDiscount: {
          getQuantity: 4,
          forQuantity: 3,
        }
      }
      expect(() => {
        pricingRule.addDiscount(discount);
      }).toThrow('must set either quantityDiscount or priceDiscount');
      expect(pricingRule.discounts).toHaveLength(0);
    });

    test('add discount failed - price discount should lower than original price', () => {
      const discount: Discount = {
        type: Advertisement.Classic,
        priceDiscount: 300,
      }
      expect(() => {
        pricingRule.addDiscount(discount);
      }).toThrow('price discount should be lower than original price');
      expect(pricingRule.discounts).toHaveLength(0);
    });

    test('add discount failed - quantity discount get quantity should be greater than for quantity', () => {
      const discount: Discount = {
        type: Advertisement.Classic,
        quantityDiscount: {
          getQuantity: 4,
          forQuantity: 5,
        }
      }
      expect(() => {
        pricingRule.addDiscount(discount);
      }).toThrow('get quantity should be greater than for quantity');
      expect(pricingRule.discounts).toHaveLength(0);
    });

    test('add discount failed - duplicated ad type', () => {
      const discount: Discount = {
        type: Advertisement.Classic,
        quantityDiscount: {
          getQuantity: 4,
          forQuantity: 3,
        }
      }
      pricingRule.addDiscount(discount);
      expect(() => {
        pricingRule.addDiscount(discount);
      }).toThrow('the advertisement type Classic has existed in this pricing rule');
      expect(pricingRule.discounts).toHaveLength(1);
    });

    test('add discount success', () => {
      const discount: Discount = {
        type: Advertisement.Classic,
        quantityDiscount: {
          getQuantity: 4,
          forQuantity: 3,
        }
      }
      pricingRule.addDiscount(discount);
      expect(pricingRule.discounts).toHaveLength(1);
    });
  })
})