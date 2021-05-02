import { Advertisement, getAdPrice } from '../models/enums/Advertisement';
import { Discount } from '../models/PricingRule';

/**
 * @param itemCount the total number of the advertisement
 * @param originalPrice the original price of the advertisement
 * @returns the total price of the a specific type of advertisements
 */
export const getPriceDiscountedPrice = (
  itemCount: number,
  discount: Discount,
): number => {
  return discount.priceDiscount * itemCount;
};

/**
 * @param itemCount the total number of the advertisement
 * @param originalPrice the original price of the advertisement
 * @param discount the discount object of the advertisement
 * @returns the total price of the a specific type of advertisements
 */
export const getQuantityDiscountedPrice = (
  itemCount: number,
  discount: Discount,
): number => {
  const originalPrice = getAdPrice(discount.type);
  const { getQuantity, forQuantity } = discount.quantityDiscount;
  const quotient = Math.floor(itemCount / getQuantity);
  return (itemCount - quotient * (getQuantity - forQuantity)) * originalPrice;
};

/**
 * Count the total number for each type of ad, and format them to a key value object
 * @returns {'premium' : 1, 'classic' : 2 ... }
 */
export const getItemCountObject = (items: Array<Advertisement>): unknown => {
  return items.reduce(
    (prev, item) => ({ ...prev, [item]: (prev[item] || 0) + 1 }),
    {},
  );
};
