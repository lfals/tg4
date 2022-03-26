const commissionCalculator = (value) => {
  if (value <= 300) {
    return value + value * 0.01;
  } else if (value > 300 && value < 1000) {
    return value + value * 0.03;
  } else if (value > 1000) {
    return value + value * 0.05;
  }
};

export default commissionCalculator;
