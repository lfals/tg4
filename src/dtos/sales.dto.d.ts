interface ISales {
  pedidos: Object<ISale>;
}

interface ISale {
  vendedor: number;
  data: string;
  valor: number;
}
