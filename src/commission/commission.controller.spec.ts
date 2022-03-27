import { Test, TestingModule } from '@nestjs/testing';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';

describe('Commission', () => {
  let commissionController: CommissionController;
  let commissionService: CommissionService;

  beforeEach(() => {
    commissionService = new CommissionService();
    commissionController = new CommissionController(commissionService);
  });

  describe('Commission calculator', () => {
    it('Seller should receive bonus if reaching a goal', () => {
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

    it('Seller should not receive bonus if reaching goal', () => {
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

    it('Seller must receive order according to range', () => {
      const fakeInput = {
        pedidos: [{ vendedor: 1, data: '2022-03-01', valor: 1000.0 }],
      };
      const result = commissionController.commissions(fakeInput);
      expect(result).toEqual([
        {
          vendedor: 1,
          mes: '03',
          valor: '50.00',
        },
      ]);
    });
  });
});
