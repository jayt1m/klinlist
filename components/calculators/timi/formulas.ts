import { TIMIData } from "./types";


// TIMI Risk Score для нестабильной стенокардии/ИМбпST
// Antman EM, et al. JAMA. 2000;284(7):835-842.
// 7 критериев, по 1 баллу каждый

export function calculateTIMI(
  data: TIMIData
): number {

  return (
    Number(data.age65) +
    Number(data.riskFactors3) +
    Number(data.knownCAD) +
    Number(data.aspirin7days) +
    Number(data.severeAngina) +
    Number(data.stDeviation) +
    Number(data.elevatedMarkers)
  );

}
