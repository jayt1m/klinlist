import { CHA2DS2VASCData } from "./types";

export function calculateCHA2DS2VASc(data: CHA2DS2VASCData) {
  let score = 0;

  if (data.heartFailure) score += 1;
  if (data.hypertension) score += 1;

  if (data.age75) {
    score += 2;
  } else if (data.age6574) {
    score += 1;
  }

  if (data.diabetes) score += 1;
  if (data.stroke) score += 2;
  if (data.vascularDisease) score += 1;

  if (data.sex === "female") {
    score += 1;
  }

  return score;
}