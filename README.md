<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Teste técnico TG4 - NodeJS

## Descrição da API

1 - A API precisa calcular a comissao que um vendedor deve receber, segundo a
seguinte regra:

```text
  - 1% para vendas até 300 reais
  - 3% para vendas entre 300 e 1000 reais
  - 5% para vendas acima de 1000 reais
  - O vendedor receberá um adicional por atingimento de META. Se tiver atingido a meta do mês o vendedor ganha mais 3%. As metas são referentes a quantidade de vendas e estão abaixo:

```

```js
const metas = [
  { mes: 1, qtd: 5 },
  { mes: 2, qtd: 3 },
  { mes: 3, qtd: 2 },
  { mes: 4, qtd: 2 },
  { mes: 5, qtd: 5 },
  { mes: 6, qtd: 60 },
  { mes: 8, qtd: 2 },
  { mes: 9, qtd: 4 },
  { mes: 10, qtd: 4 },
  { mes: 11, qtd: 7 },
  { mes: 12, qtd: 2 },
];
```

O método vai receber um array de pedidos, através de um POST, exemplo:

    POST api/calcula-comissao

```json
{
  "pedidos": [
    { "vendedor": 1, "data": "2022-03-01", "valor": 500.34 },
    { "vendedor": 1, "data": "2022-03-01", "valor": 1000.22 },
    { "vendedor": 1, "data": "2022-03-01", "valor": 100.35 },
    { "vendedor": 1, "data": "2022-03-01", "valor": 22.34 },
    { "vendedor": 1, "data": "2022-04-01", "valor": 5000.34 },
    { "vendedor": 2, "data": "2022-03-01", "valor": 2000.34 },
    { "vendedor": 2, "data": "2022-04-01", "valor": 3000.34 }
  ]
}
```

e o response será a comissao de cada vendedor em cada mes (xx,xx será na verdade o valor calculado):

```json
{
  [
    { "vendedor": 1, "mes": 3, "valor": "xx,xx" },
    { "vendedor": 2, "mes": 4, "valor": "xx,xx" }
  ]
}
```

## FIY

    levei em consideração a seguinte lógica:
    vendas < 300 - 1%
    300 <= vendas < 1000 - 3%
    vendas > 1000 - 5%

    E a comissão bonus calculada em cima do somatório das comissões

    O valor da comissão retornada no post é apenas da comissão e não do valor mais comissão. Ex

    RS1000
    comissão = 1050
    Valor retornado= 50

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
