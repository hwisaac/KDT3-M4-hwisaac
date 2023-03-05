const formatPrice = (price) => {
  const dollar = price / 100;
  return `$${dollar.toFixed(2)}`;
};
export default formatPrice;
