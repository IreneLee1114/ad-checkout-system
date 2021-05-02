import {
  getItemCountObject,
  getPriceDiscountedPrice,
  getQuantityDiscountedPrice,
} from '../utils/utils';
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
    const discounts = this.pricingRule ? this.pricingRule.discounts : [];
    const itemCounts = getItemCountObject(this.items);

    // use advertisement type to run each discount calculation
    return Object.keys(itemCounts).reduce((prev, type) => {
      const originalPrice = getAdPrice(Advertisement[type]);
      const count = itemCounts[type];
      const discount = discounts.find((discount) => discount.type === type);

      if (discount) {
        if (discount.priceDiscount) {
          return prev + getPriceDiscountedPrice(count, discount);
        } else if (discount.quantityDiscount) {
          return prev + getQuantityDiscountedPrice(count, discount);
        }
      }

      return prev + count * originalPrice;
    }, 0);
  }
}
