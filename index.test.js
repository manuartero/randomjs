const { RandomGenerator } = require("./index");

const random = RandomGenerator();

describe("RandomGenerator()", () => {

  describe("random.number()", () => {
    it("returns a number [a,b]", () => {
      for (let i = 0; i < 10000; i++) {
        const got = random.number(0, 100);
        expect(got).toBeGreaterThanOrEqual(0)
        expect(got).toBeLessThanOrEqual(100);
      }
    });
  });

  describe("random.pickOne()", () => {
    it("returns one element from the array", () => {
      for (let i = 0; i < 10000; i++) {
        const got = random.pickOne([1, 2, 3, 4, 5]);
        expect(got).toBeGreaterThanOrEqual(1)
        expect(got).toBeLessThanOrEqual(5);
      }
    });
    it("returns one element from the array (weight)", () => {
      for (let i = 0; i < 10000; i++) {
        const got = random.pickOne([
          { key: 1, weight: 10 },
          { key: 2, weight: 10 },
          { key: 3, weight: 10 },
          { key: 4, weight: 10 },
          { key: 5, weight: 10 },
        ]);
        expect(got.key).toBeGreaterThanOrEqual(1)
        expect(got.key).toBeLessThanOrEqual(5);
      }
    });
  });

  describe("random.play()", () => {
    it("returns a hit x% of the times", () => {
      let hits = 0;
      for (let i = 0; i < 100000; i++) {
        if (random.play("40%")) {
          hits++;
        }
      }
      expect(hits).toBeGreaterThanOrEqual(39800);
      expect(hits).toBeLessThanOrEqual(40200);
    });
  });

});
