import { Advertisement } from '../src/models/enums/Advertisement';
import { Discount } from '../src/models/PricingRule';
import { getPriceDiscountedPrice, getQuantityDiscountedPrice, getItemCountObject } from '../src/utils/utils';

describe('utils', () => {
  test('get price discounted price', () => {
    const discount: Discount = {
      type: Advertisement.Classic,
      priceDiscount: 300,
    }
    expect(getPriceDiscountedPrice(3, discount)).toBe(900);
  });

  test('get quantity discounted price', () => {
    const discount: Discount = {
      type: Advertisement.Classic,
      quantityDiscount: {
        getQuantity: 4,
        forQuantity: 2,
      }
    }
    expect(getQuantityDiscountedPrice(3, discount)).toBe(809.97);
  });

  test('get item count object', () => {
    const adArray = [Advertisement.Classic, Advertisement.Classic, Advertisement.Premium];
    expect(getItemCountObject(adArray)).toStrictEqual({
      [Advertisement.Classic]: 2,
      [Advertisement.Premium]: 1, 
    });
  })
});
