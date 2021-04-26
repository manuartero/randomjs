[![BlueBall](https://github.com/manutero/randomjs/actions/workflows/blue-ball.yaml/badge.svg)](https://github.com/manutero/randomjs/actions/workflows/blue-ball.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/manutero/randomjs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/manutero/randomjs/context:javascript)

# @manutero/randomjs

> Humanized random functions.

## Installation

```bash
npm i @manutero/randomjs
```

...or just copy one file to your project if you want to avoid more deps:

```bash
curl -s https://raw.githubusercontent.com/manutero/randomjs/main/index.js > {my-awesome-project}/src/random.js
```

## Quick Start

```js
const { RandomGenerator } = require("@manutero/randomjs");

const random = RandomGenerator();

random.number(1, 10); // natural number between [a,b]
// => 3

random.normal(-100, 100); // natural number between [a,b] considering a normal distribution
// => -4

random.roll("2d6"); // roll some dices
// => [2, 5]

random.bet(42.4); // bet with (0..100%) chance of success.
// => false

random.unit(); // random unit (0 - 1)
// => 0.7580578515771776

random.pickOne([1, 2, 3, 4, 5]); // pick one element (all elements have same weight)
// => 1

random.pickOne([
  // pick one element (considering different weights)
  { key: 1, weight: 1 },
  { key: 2, weight: 1 },
  { key: 3, weight: 9999 },
  { key: 4, weight: 1 },
]);
// => {key: 3, weight: 9999}
```

## Dependencies

None. Just a plain .js file wrapping `Math.random()`

## Use Case

Some uses cases I can think of...

- you just want a natural random between 1 and 10 while you aren't concern about pure mathematical correctness.
- you just want to pick an element from an array while not adding another dependency to your project (but copying 1 easy-to-read js file is ok)
- you just want to roll some dices while would be great that other guy has tested that function already.

> If you're looking for a mathematically correct Random generator OR cryptographically secure random numbers, try with [random-js](https://github.com/ckknight/random-js) instead

## Method Detail

### `.number(a:int, b: int) -> int`

Natural number between [a, b] \(inclusive).

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

### `.normal(a: int, b: int, {skew?: int}) -> int`

natural number between [a, b] \(inclusive) considering a normal distribution.

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

### `.roll(dice: str) -> [number]`

Roll some dices

```js
> random.roll('1d6')
[5]
> random.roll('2d12')
[4, 10]
> random.roll('3d6')
[1, 1, 5]
> random.roll('D3')
[2]
> random.roll('1D12')
[12]
```

### `.bet(options: float) -> boolean`

bet with a percentage of success (expected a number between 0 - 100)

```js
> random.bet(40.0)
false
> random.bet(40.0)
true
> random.bet(40.0)
false
> random.bet(0.0)
false
> random.bet(100.0)
true
```

### `.unit() -> float`

unit random between (0, 1) \(not inclusive)

```js
> random.unit()
0.7580578515771776
> random.unit()
0.11270887637510896
> random.unit()
0.028320789337158203
```

### `.pickOne(choices: [T], opts?: { weightKey>: string}) -> T`:

pick one element from an array

```js
> random.pickOne([1 ,2, 3, 4, 5])
3
> random.pickOne([1 ,2, 3, 4, 5])
5
> random.pickOne([1 ,2, 3, 4, 5])
5
> random.pickOne([1 ,2, 3, 4, 5])
1
```

Pick one element from an array with weight

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
> random.pickOne(
  [
    { relevance: 10 },
    { relevance: 10 },
    { relevance: 10 },
    { relevance: 99999 },
    { relevance: 10 }
  ],
  { weightKey: 'relevance' })
{ relevance: 99999 }
```

### `.seed`

Get the internal `seed`

```js
> random.seed
72779816406.94533
```

### `constructor()`

Force the internal `seed`

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

## License

[MIT](LICENSE)
