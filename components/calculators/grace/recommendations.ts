import { GRACEData } from "./types";
import { calculateGRACE } from "./formulas";
import { getRiskCategory, getRiskCategoryLabel } from "./utils";


export type Recommendation = {
  score: number;

  category:
    | "low"
    | "intermediate"
    | "high";

  title: string;

  text: string;

  recommendation: string;

};


export function getRecommendation(
  data: GRACEData
): Recommendation {

  const score = calculateGRACE(data);

  const category = getRiskCategory(score);

  const title = getRiskCategoryLabel(category);


  if (category === "low") {

    return {
      score,

      category,

      title,

      text:
        "Госпитальная летальность при таком балле низкая.",

      recommendation:
        "Возможна консервативная тактика с последующей плановой оценкой. Решение об инвазивной стратегии принимается с учётом клинической картины в целом, а не только шкалы GRACE.",
    };

  }


  if (category === "intermediate") {

    return {
      score,

      category,

      title,

      text:
        "Госпитальная летальность промежуточная.",

      recommendation:
        "Согласно рекомендациям ESC по ОКС без подъёма ST, целесообразна ранняя инвазивная стратегия (коронарография в течение 24–72 часов).",
    };

  }


  return {

    score,

    category,

    title,

    text:
      "Госпитальная летальность высокая.",

    recommendation:
      "Показана неотложная/ранняя инвазивная стратегия (коронарография в кратчайшие сроки, в течение 2–24 часов в зависимости от клинической ситуации).",

  };

}
