export const decimalPointConversion = (price) => {
  price = price.toString();
  let result;
  if (price.length >= 3) {
    result = price.split('');
    price.length === 3 ? result.splice(1, 0, '.') : result.splice(2, 0, '.');
    return parseFloat(result.join(''));
  } else return Number(price);
};
