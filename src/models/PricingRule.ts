import { Advertisement, getAdPrice } from './enums/Advertisement';

export interface QuantityDiscount {
  getQuantity: number;
  forQuantity: number;
}
/**
 *  Discount interface, we should only put either priceDiscount or quantityDiscount into Discount
 */
export interface Discount {
  type: Advertisement;
  priceDiscount?: number;
  quantityDiscount?: QuantityDiscount;
}

export default class PricingRule {
  discounts: Array<Discount>;

  private constructor() {
    this.discounts = [];
  }

  static new(discounts?: Array<Discount>): PricingRule {
    const pricingRule = new PricingRule();
    if (discounts) {
      discounts.forEach((discount) => pricingRule.addDiscount(discount));
    }
    return pricingRule;
  }

  addDiscount(discount: Discount): void {
    if (
      this.discounts.find(
        (existDiscount) => existDiscount.type === discount.type,
      )
    ) {
      throw new Error(
        `the advertisement type ${discount.type} has existed in this pricing rule`,
      );
    }
    if (!!discount.quantityDiscount === !!discount.priceDiscount) {
      throw new Error('must set either quantityDiscount or priceDiscount');
    }
    if (
      discount.priceDiscount &&
      getAdPrice(discount.type) <= discount.priceDiscount
    ) {
      throw new Error('price discount should be lower than original price');
    } else if (discount.quantityDiscount) {
      const {
        quantityDiscount: { getQuantity, forQuantity },
      } = discount;
      if (getQuantity <= forQuantity) {
        throw new Error('get quantity should be greater than for quantity');
      }
    }

    this.discounts.push(discount);
  }
}
