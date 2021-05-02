import { Advertisement, getAdPrice } from './enums/Advertisement';
import PricingRule from './PricingRule';

export default class Checkout {
  private items: Array<Advertisement>;
  private pricingRule: PricingRule;

  private constructor(pricingRule?: PricingRule) {
    this.pricingRule = pricingRule;
    this.items = [];
  }

  static new(pricingRule?: PricingRule): Checkout {
    return new Checkout(pricingRule);
  }

  add(item: Advertisement): void {
    this.items.push(item);
  }

  total(): number {
    // Count the total number for each type of ad, and format them to a key value object
    // the result will be like {'premium' : 1, 'classic' : 2}
    const itemCounts = this.items.reduce(
      (prev, item) => ({ ...prev, [item]: (prev[item] || 0) + 1 }),
      {},
    );

    const discounts = this.pricingRule ? this.pricingRule.discounts : [];
    
    // use advertisement type to run each discount calculation
    return Object.keys(itemCounts).reduce((prev, type) => {
      const originalPrice = getAdPrice(Advertisement[type]);
      const count = itemCounts[type];
      const discount = discounts.find((discount) => discount.type === type);

      if (discount) {
        if (discount.priceDiscount) {
          return prev + discount.priceDiscount * count;
        }
        else {
          const { getQuantity, forQuantity } = discount.quantityDiscount;
          const quotient = Math.floor(count / getQuantity);
          
          return (
            prev + (count - quotient * (getQuantity - forQuantity)) * originalPrice
          );
        }
      }

      return prev + count * originalPrice;
    }, 0);
  }
}
