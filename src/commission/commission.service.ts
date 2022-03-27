import { Injectable } from '@nestjs/common';
import {
  commissionCalculator,
  getCommissionTotal,
  groupSalesByMonthBySeller,
  groupSalesBySeller,
} from 'src/helpers';

@Injectable()
export class CommissionService {
  getCommissions(sales: ISales) {
    const pedidos = sales.pedidos;

    pedidos.forEach((sale) => {
      sale.mes = sale.data.split('-')[1];
      sale.comissao = commissionCalculator(sale.valor).toFixed(2);
    });

    return getCommissionTotal(
      groupSalesByMonthBySeller(Object.values(groupSalesBySeller(pedidos))),
    );
  }
}
