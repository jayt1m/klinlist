import { WellsData } from "./types";
import { calculateWells } from "./formulas";
import {
  getThreeTierCategory,
  getThreeTierLabel,
  getTwoTierCategory,
  getTwoTierLabel,
} from "./utils";


export type Recommendation = {
  score: number;
  twoTier: ReturnType<typeof getTwoTierCategory>;
  twoTierLabel: string;
  threeTierLabel: string;
  recommendation: string;
};


export function getRecommendation(
  data: WellsData
): Recommendation {

  const score = calculateWells(data);

  const twoTier = getTwoTierCategory(score);
  const twoTierLabel = getTwoTierLabel(twoTier);
  const threeTierLabel = getThreeTierLabel(
    getThreeTierCategory(score)
  );


  if (twoTier === "unlikely") {

    return {
      score,
      twoTier,
      twoTierLabel,
      threeTierLabel,
      recommendation:
        "Целесообразно определение D-димера. При отрицательном результате ТЭЛА может быть исключена без визуализации. При положительном результате — КТ-ангиопульмонография.",
    };

  }


  return {

    score,
    twoTier,
    twoTierLabel,
    threeTierLabel,
    recommendation:
      "Показана КТ-ангиопульмонография без предварительного определения D-димера. При невозможности выполнить КТ рассмотреть альтернативные методы визуализации (вентиляционно-перфузионная сцинтиграфия).",

  };

}
