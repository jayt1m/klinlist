import { TIMIData } from "./types";
import { calculateTIMI } from "./formulas";
import { getEventRate, getRiskCategory, getRiskCategoryLabel } from "./utils";


export type Recommendation = {
  score: number;
  eventRate: string;
  category: "low" | "intermediate" | "high";
  title: string;
  recommendation: string;
};


export function getRecommendation(
  data: TIMIData
): Recommendation {

  const score = calculateTIMI(data);
  const eventRate = getEventRate(score);
  const category = getRiskCategory(score);
  const title = getRiskCategoryLabel(category);


  if (category === "low") {

    return {
      score,
      eventRate,
      category,
      title,
      recommendation:
        "Возможна консервативная тактика с дальнейшей плановой оценкой. Риск не нулевой — решение принимается с учётом клинической картины в целом.",
    };

  }


  if (category === "intermediate") {

    return {
      score,
      eventRate,
      category,
      title,
      recommendation:
        "Целесообразна более активная тактика, включая раннюю инвазивную стратегию, с учётом клинической картины и данных других шкал (например, GRACE).",
    };

  }


  return {

    score,
    eventRate,
    category,
    title,
    recommendation:
      "Высокий риск неблагоприятных событий. Показана ранняя инвазивная стратегия и интенсивная антитромботическая терапия.",

  };

}
