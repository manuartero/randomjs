const { RandomGenerator } = require('./index')

const random = RandomGenerator()
const N = 1000

describe('RandomGenerator()', () => {
  describe('random.number()', () => {
    it('returns a number [a,b]', () => {
      for (let i = 0; i < N; i++) {
        const got = random.number(0, 100)
        expect(got).toBeGreaterThanOrEqual(0)
        expect(got).toBeLessThanOrEqual(100)
      }
    })
    it('checks a <= b', () => {
      expect(() => random.number(3, 2)).toThrow(TypeError)
    })
  })

  describe('random.roll()', () => {
    it('returns the rolling result', () => {
      for (let i = 0; i < N; i++) {
        const got = random.roll('3d6')
        expect(got).toBeGreaterThanOrEqual(3)
        expect(got).toBeLessThanOrEqual(18)
      }
    })
    it('returns the rolling result (bis)', () => {
      for (let i = 0; i < N; i++) {
        const got = random.roll('D12')
        expect(got).toBeGreaterThanOrEqual(1)
        expect(got).toBeLessThanOrEqual(12)
      }
    })
    it('checks the input is (num)+ d|D num', () => {
      ;[
        { input: '4' },
        { input: 4 },
        { input: '4f10' },
        { input: null },
        { input: undefined },
        { input: ['3'] }
      ].forEach(({ input }) => {
        // @ts-ignore
        expect(() => random.roll(input)).toThrow(TypeError)
      })
    })
  })

  describe('random.pickOne()', () => {
    it('returns one element from the array', () => {
      for (let i = 0; i < N; i++) {
        const got = random.pickOne([1, 2, 3, 4, 5])
        expect(got).toBeGreaterThanOrEqual(1)
        expect(got).toBeLessThanOrEqual(5)
      }
    })
    it('returns one element from the array with weight', () => {
      for (let i = 0; i < N; i++) {
        const got = random.pickOne([
          { key: 1, weight: 10 },
          { key: 2, weight: 10 },
          { key: 3, weight: 10 },
          { key: 4, weight: 10 },
          { key: 5, weight: 10 }
        ])
        expect(got.key).toBeGreaterThanOrEqual(1)
        expect(got.key).toBeLessThanOrEqual(5)
      }
    })
    it('returns one element from the array with weight (bis)', () => {
      for (let i = 0; i < N; i++) {
        const got = random.pickOne(
          [
            { key: 1, w: 10 },
            { key: 2, w: 10 },
            { key: 3, w: 10 },
            { key: 4, w: 10 },
            { key: 5, w: 10 }
          ],
          { weightKey: 'w' }
        )
        expect(got.key).toBeGreaterThanOrEqual(1)
        expect(got.key).toBeLessThanOrEqual(5)
      }
    })
  })

  describe('random.play()', () => {
    it('returns a hit x% of the times', () => {
      let hits = 0
      for (let i = 0; i < N * 100; i++) {
        if (random.play('40%')) {
          hits++
        }
      }
      // error 0.5%
      expect(hits).toBeGreaterThanOrEqual(39500)
      expect(hits).toBeLessThanOrEqual(40500)
    })
    it('returns a hit for 100%', () => {
      expect(random.play('100%')).toBe(true)
    })
    it('returns a loose for 0%', () => {
      expect(random.play('0%')).toBe(false)
    })
  })

  describe('random.seed', () => {
    it('internal "seed" is accesible', () => {
      expect(typeof random.seed).toEqual('number')
      const random2 = RandomGenerator(42)
      expect(random2.seed).toEqual(42)
    })
  })
})
