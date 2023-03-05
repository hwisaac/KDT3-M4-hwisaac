export const decimalPointConversion = (price) => {
  price = price.toString();
  let result;
  result = price.split('');
  result.splice(-2, 0, '.');
  return parseFloat(result.join(''));
};
