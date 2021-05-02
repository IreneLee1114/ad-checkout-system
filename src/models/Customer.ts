import PricingRule from './PricingRule';

export class Customer {
  name: string;
  pricingRule: PricingRule;

  private constructor(name: string, pricingRule?: PricingRule) {
    this.name = name;
    this.pricingRule = pricingRule;
  }
  static new(name: string, pricingRule?: PricingRule): Customer {
    return new Customer(name, pricingRule);
  }
}
