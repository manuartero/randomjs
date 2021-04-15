[![BlueBall](https://github.com/manutero/randomjs/actions/workflows/blue-ball.yaml/badge.svg)](https://github.com/manutero/randomjs/actions/workflows/blue-ball.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# @manutero/randomjs

> random generator utils

## Installation
```bash
npm i @manutero/randomjs
```

## Quick Start

```js
const {RandomGenerator} = require('@manutero/randomjs')

const random = RandomGenerator()
```

### Methods

- Natural number between [a, b]

```js
> random.number(1,10)
6
> random.number(1,10)
3
> random.number(1,10)
9
> random.number(1,10)
9
> random.number(1,10)
10
```

- Natural number between [a, b] considering a normal distribution

```js
> random.normal(1,10)
5
> random.normal(1,10)
4
> random.normal(1,10)
6
> random.normal(1,10)
4
> random.normal(1,10)
6
> random.normal(1,10)
6
> random.normal(1,10)
5
```

- Play with a percentage of success

```js
> random.play('40%')
false
> random.play('40%')
true
> random.play('40%')
false
```

- Unit number between (0,1)

```js
> random.unit()
0.7580578515771776
> random.unit()
0.11270887637510896
> random.unit()
0.028320789337158203
```

- Pick one element from an array
```js
> random.pickOne([1,2,3,4,5])
3
> random.pickOne([1,2,3,4,5])
5
> random.pickOne([1,2,3,4,5])
5
> random.pickOne([1,2,3,4,5])
1
```

- Pick one element from an array with weight
```js
> random.pickOne([
    { key: 1, weight: 10 },
    { key: 2, weight: 10 },
    { key: 3, weight: 10 },
    { key: 4, weight: 10 },
    { key: 5, weight: 10 }
])
{ key: 5, weight: 10 }
> random.pickOne([
    { key: 1, weight: 10 },
    { key: 2, weight: 10 },
    { key: 3, weight: 10 },
    { key: 4, weight: 99999 },
    { key: 5, weight: 10 }
])
{ key: 4, weight: 99999 }
```

- Get the internal `seed`
```js
> random.seed
72779816406.94533
```
- Force the internal `seed`
```js
> r1 = RandomGenerator(42)
> r2 = RandomGenerator(42)
> r1.unit()
0.6011037519201636
> r2.unit()
0.6011037519201636
> r1.unit() === r2.unit()
true
```

## Dependencies

None

## License

[MIT](LICENSE)
