const groupSalesBySeller = (pedidos) => {
  const comissoes = [];

  pedidos.forEach(({ vendedor, valor, mes, comissao }) => {
    if (!comissoes[vendedor]) {
      comissoes[vendedor] = { vendedor };
    }

    if (!comissoes[vendedor].vendas) {
      comissoes[vendedor].vendas = [];
    }

    if (!!comissoes[vendedor].vendas.indexOf({ mes })) {
      comissoes[vendedor].vendas.push({
        mes,
        valor,
        comissao: parseFloat(comissao),
      });
    }
  });
  return comissoes;
};

export default groupSalesBySeller;
