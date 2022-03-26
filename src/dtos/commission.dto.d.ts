interface ICommissions {
  commissions: Object<ICommission>;
}

interface ICommission {
  vendedor: number;
  mes: number;
  valor: number;
}
