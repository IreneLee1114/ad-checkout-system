import { Advertisement } from './enums/Advertisement';
import PricingRule from './PricingRule';

export default class Checkout {
  #items: Array<Advertisement>;
  #pricingRule: PricingRule;

  private constructor(pricingRule?: PricingRule) {
    this.#pricingRule = pricingRule;
    this.#items = [];
  }

  static new(pricingRule?: PricingRule): Checkout {
    return new Checkout(pricingRule);
  }

  add(item: Advertisement): void {
    this.#items.push(item);
  }

  total(): number {
    console.log(this.#pricingRule);
    return 0;
  }
}
