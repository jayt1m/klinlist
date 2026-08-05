import { HASBLEDData } from "./types";

export function calculateHASBLED(
  data: HASBLEDData
): number {

  let score = 0;

  if (data.hypertension) {
    score += 1;
  }

  if (data.renal) {
    score += 1;
  }

  if (data.liver) {
    score += 1;
  }

  if (data.stroke) {
    score += 1;
  }

  if (data.bleeding) {
    score += 1;
  }

  if (data.labileINR) {
    score += 1;
  }

  if (data.elderly) {
    score += 1;
  }

  if (data.drugs) {
    score += 1;
  }

  if (data.alcohol) {
    score += 1;
  }

  return score;
}