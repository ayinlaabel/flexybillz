export const logger = (...value: any[]) => {
  if (__DEV__) {
    console.log(...value);
  } else {
    //log this to somewhere for tracking
  }
};
