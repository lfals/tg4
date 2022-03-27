const groupSalesByMonthBySeller = (salesByVendorByMonth) => {
  const salesBySeller = [];

  salesByVendorByMonth.forEach((seller) => {
    const value = {};
    const sum = {};
    const month = [];

    seller.vendas.map((sale) => {
      let soma = 1;
      if (month.indexOf(sale.mes) == -1) {
        month.push(sale.mes);
        sale.soma = soma;
        value[sale.mes] = sale.comissao;
        sum[sale.mes] = sale.soma;
      } else {
        sum[sale.mes] = sum[sale.mes] + soma;
        value[sale.mes] = value[sale.mes] + sale.comissao;
      }
    });

    const sales = [];

    for (var mes in value) {
      sales.push({
        comissao: value[mes],
        mes,
        vendas: sum[mes],
      });
    }

    salesBySeller.push({
      vendedor: seller.vendedor,
      sales,
    });
  });

  return salesBySeller;
};

export default groupSalesByMonthBySeller;
