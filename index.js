/**
 * @param {string} msg
 */
const tag = msg => `[@manutero/randomjs] ${msg}`

/**
 * "Mulberry32 is a simple generator with a 32-bit state, but is extremely fast and has good quality"
 * @see https://stackoverflow.com/a/47593316/1614677
 * @param {number} seed
 * @return {() => number} (0,1)
 */
const mulberry32 = seed => {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * @param {number=} seed
 */
const RandomGenerator = seed => {
  const actualSeed = seed || Math.random() * 100000000000
  const unit = mulberry32(actualSeed)

  /**
   * @param {number} a natural number, inclusive.
   * @param {number} b natural number, inclusive.
   */
  const number = (a, b) => {
    if (a > b) {
      throw new TypeError(tag('a is greater than b'))
    }
    return Math.floor(unit() * (b - a + 1) + a)
  }

  /**
   * @param {string} percent "30%"
   */
  const play = percent => number(1, 100) <= parseInt(percent.split('%')[0])

  /**
   * @param {string} dices 'd6' '1D6' '3d12' '2d20' ("d<num>" or "<num>d<num>")
   */
  const roll = dices => {
    if (typeof dices !== 'string') {
      throw new TypeError(tag('dices is not an string'))
    }
    let diceNumber
    let sides
    try {
      const input = dices.toLowerCase().split('d')
      diceNumber = parseInt(input[0]) || 1
      sides = parseInt(input[1])
    } catch (err) {
      throw new TypeError(tag('dices is not formatted /<num>d<num>/'))
    }
    if (isNaN(diceNumber) || isNaN(sides)) {
      throw new TypeError(tag('dices is not formatted /<num>d<num>/'))
    }

    let rolling = 0
    for (let i = 0; i < diceNumber; i++) {
      const n = number(1, sides)
      rolling += n
    }
    return rolling
  }

  /**
   * @param {Array<number>} weights
   */
  const chooseWeightedIndex = weights => {
    let acc = 0
    // if the weights are [5, 30, 10],
    // this would build an array containing [5, 35, 45], and acc=45
    const ranges = weights.map(weight => (acc += weight))

    const selectedValue = unit() * acc

    // If the selected value is within one of the ranges, that's our choice!
    for (let index = 0; index < ranges.length; index++) {
      if (selectedValue < ranges[index]) {
        return index
      }
    }
    // If nothing was chosen, all weights were 0 or something went wrong.
    return -1
  }

  /**
   * @param {Array<any>} arr
   * @param {object} param1
   * @param {string=} param1.weightKey
   * @param {string=} param1.valueKey
   * @example
   * ```js
   * rn.pickOne(['a', 'b', 'c'])
   * ```
   *
   * ```js
   * rn.pickOne([
   *    { key: "Human", weight: 999 },
   *    { key: "Extraterrestrial", weight: 1 },
   * ])
   * ```
   */
  const pickOne = (arr, { weightKey } = { weightKey: 'weight' }) => {
    if (!arr || arr.length <= 0) {
      return null
    }
    if (typeof arr[0] !== 'object') {
      return arr[number(0, arr.length - 1)]
    }
    const weights = arr
      .filter(item => (item[weightKey] !== undefined ? item[weightKey] : 1) > 0)
      .map(item => item[weightKey] || 1)
    const selectedIndex = chooseWeightedIndex(weights)

    return selectedIndex >= 0 ? arr[selectedIndex] : null
  }

  /**
   *
   * @param {number} min
   * @param {number} max
   * @param {object} param0
   * @param {number=} param0.skew
   * @param {boolean=} param0.round
   *
   * @see https://stackoverflow.com/a/49434653/1614677
   */
  const normal = (min, max, { skew, round } = { skew: 1, round: true }) => {
    const u = unit() // (0,1)
    const v = unit() // (0,1)

    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    num = num / 10.0 + 0.5 // Translate to 0 -> 1

    if (num > 1 || num < 0) {
      // resample between 0 and 1 if out of range
      num = normal(min, max, { skew })
    }
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
    return round ? Math.round(num) : num
  }

  return {
    normal,
    number,
    pickOne,
    roll,
    play,
    unit,
    seed: actualSeed
  }
}

module.exports = { RandomGenerator }
