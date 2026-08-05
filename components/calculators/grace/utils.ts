import { RiskCategory } from "./types";


// Общепринятые пороги категорий риска GRACE
// (используются в рекомендациях ESC по ОКС без подъёма ST)

export function getRiskCategory(
  score: number
): RiskCategory {

  if (score <= 108) {
    return "low";
  }

  if (score <= 140) {
    return "intermediate";
  }

  return "high";

}


export function getRiskCategoryLabel(
  category: RiskCategory
): string {

  if (category === "low") {
    return "Низкий риск";
  }

  if (category === "intermediate") {
    return "Промежуточный риск";
  }

  return "Высокий риск";

}


export function getRiskCategoryColor(
  category: RiskCategory
): "green" | "yellow" | "red" {

  if (category === "low") {
    return "green";
  }

  if (category === "intermediate") {
    return "yellow";
  }

  return "red";

}
