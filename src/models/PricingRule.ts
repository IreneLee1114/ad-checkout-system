import { Advertisement } from './enums/Advertisement';

interface GetForDiscount {
  get: number;
  for: number;
}

interface Discount {
  type: Advertisement;
  priceDiscount?: number;
  getForDiscount?: GetForDiscount;
}

export default class PricingRule {
  discounts: Array<Discount>;
  
  constructor() {
    this.discounts = [];
  }

  addDiscount(discount: Discount): void {
    this.discounts.push(discount);
  }
}