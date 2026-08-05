import { WellsData } from "./types";


// Критерии Wells для ТЭЛА
// Wells PS, et al. Thromb Haemost. 2000;83(3):416-420.

export function calculateWells(
  data: WellsData
): number {

  let score = 0;

  if (data.dvtSigns) score += 3;
  if (data.peMostLikely) score += 3;
  if (data.heartRateOver100) score += 1.5;
  if (data.immobilization) score += 1.5;
  if (data.previousDvtPe) score += 1.5;
  if (data.hemoptysis) score += 1;
  if (data.malignancy) score += 1;

  return score;

}
