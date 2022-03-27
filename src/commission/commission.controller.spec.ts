import { Test, TestingModule } from '@nestjs/testing';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';

describe('CommissionController', () => {
  let commissionController: CommissionController;
  let commissionService: CommissionService;

  beforeEach(() => {
    commissionService = new CommissionService();
    commissionController = new CommissionController(commissionService);
  });

  describe('Commission calculator', () => {
    it('Vendedor deve receber bonus se atingir a meta', () => {
      const fakeInput = {
        pedidos: [
          { vendedor: 1, data: '2022-03-01', valor: 100.0 },
          { vendedor: 1, data: '2022-03-01', valor: 100.0 },
          { vendedor: 1, data: '2022-03-01', valor: 100.0 },
        ],
      };
      const result = commissionController.commissions(fakeInput);
      expect(result).toEqual([
        {
          vendedor: 1,
          mes: '03',
          valor: '3.09',
        },
      ]);
    });

    it('Vendedor não deve receber bonus se atingir a meta', () => {
      const fakeInput = {
        pedidos: [{ vendedor: 1, data: '2022-03-01', valor: 100.0 }],
      };
      const result = commissionController.commissions(fakeInput);
      expect(result).toEqual([
        {
          vendedor: 1,
          mes: '03',
          valor: '1.00',
        },
      ]);
    });

    it('Vendedor deve receber comissao segundo a faixa', () => {
      const fakeInput = {
        pedidos: [{ vendedor: 1, data: '2022-03-01', valor: 1000.0 }],
      };
      const result = commissionController.commissions(fakeInput);
      expect(result).toEqual([
        {
          vendedor: 1,
          mes: '03',
          valor: '30.00',
        },
      ]);
    });
  });
});
