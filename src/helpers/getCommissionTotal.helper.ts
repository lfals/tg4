import goalCommissionCalculator from './goal.comission.calculator.helper';

const getCommissionTotal = (salesBySeller) => {
  const allComissions = [];

  salesBySeller.forEach((element) => {
    element.sales.map((sale) => {
      const response = {
        vendedor: element.vendedor,
        mes: sale.mes,
        valor: goalCommissionCalculator(
          sale.mes,
          sale.vendas,
          sale.comissao,
        ).toFixed(2),
      };
      allComissions.push(response);
    });
  });

  return allComissions;
};

export default getCommissionTotal;
