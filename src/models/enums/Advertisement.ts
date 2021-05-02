export enum Advertisement {
  Classic = 'Classic',
  StandOut = 'StandOut',
  Premium = 'Premium',
}

/**
 * @param type the Advertisement type that used for searching price
 * @returns the default price of the advertisement
 */
export const getAdPrice = (type: Advertisement): number => {
  switch (type) {
    case Advertisement.Classic:
      return 269.99;
    case Advertisement.StandOut:
      return 322.99;
    case Advertisement.Premium:
      return 394.99;
  }
};
