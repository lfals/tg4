import { Injectable } from '@nestjs/common';
import { commission } from 'src/helpers';

@Injectable()
export class CommissionService {
  getCommissions(sales: ISales) {
    const pedidos = sales.pedidos;

    pedidos.forEach((element) => {
      element.mes = element.data.split('-')[1];
      element.comissao = commission(element.valor).toFixed(2);
    });

    const comissoes = [];
    pedidos.forEach(({ vendedor, data, valor, mes, comissao }, i) => {
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

      seller.vendas.map((sale) => {
        if (value.hasOwnProperty(sale.mes)) {
          value[sale.mes] = value[sale.mes] + sale.comissao;
        } else {
          value[sale.mes] = sale.comissao;
        }
      });

      const salesArray = [];

      for (var mes in value) {
        salesArray.push({ mes: mes, comissao: value[mes] });
      }

      salesBySeller.push({ vendedor: seller.vendedor, salesArray });
    });

    const allComissions = [];

    salesBySeller.forEach((element) => {
      element.salesArray.map((sale) => {
        const response = {
          vendedor: element.vendedor,
          mes: sale.mes,
          valor: sale.comissao,
        };
        allComissions.push(response);
      });
    });

    return allComissions;
  }
}
