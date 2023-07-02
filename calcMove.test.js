import { originalEvents, tests } from "./assets"
import { calculateMoves } from "./calcMove"
import { calculateMoves2 } from "./calcMoveV2"

describe("calculateMoves", () => {
  tests.forEach((test, idx) => {
    it(`should calculate moves for test ${idx}`, () => {
      const events = {
        oldOrder: originalEvents,
        newOrder: test.events,
      }
      const result = calculateMoves2(events)
      expect(result).toEqual(test.expected)
    })
  })
})