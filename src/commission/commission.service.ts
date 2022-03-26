import { Injectable } from '@nestjs/common';
import { commissionCalculator, goalCommissionCalculator } from 'src/helpers';

@Injectable()
export class CommissionService {
  getCommissions(sales: ISales) {
    const pedidos = sales.pedidos;

    pedidos.forEach((sale) => {
      sale.mes = sale.data.split('-')[1];
      sale.comissao = commissionCalculator(sale.valor).toFixed(2);
    });

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

    const salesByVendorByMonth = Object.values(comissoes);

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
  }
}
