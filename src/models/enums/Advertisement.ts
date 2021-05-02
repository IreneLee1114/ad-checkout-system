export enum Advertisement {
  Classic = 'Classic',
  StandOut = 'StandOut',
  Premium = 'Premium',
}

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
