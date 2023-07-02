import { originalEvents, tests } from "./assets.js";
import { calculateMoves } from "./calcMove.js";
import { calculateMoves2 } from "./calcMoveV2.js";

calculateMoves2({
  oldOrder: originalEvents,
  newOrder: tests[0].events
});