import { goals } from 'src/docs';

const goalCommissionCalculator = (date, amount, value) => {
  let newValue = value;
  goals.forEach((month) => {
    if (month.mes == date) {
      if (amount >= month.qtd) {
        newValue = value + value * 0.03;
      }
    }
  });

  return newValue;
};

export default goalCommissionCalculator;
