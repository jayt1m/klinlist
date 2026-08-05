import { RiskCategory } from "./types";


// Пороги риска зависят от возраста
// (ESC Guidelines on CVD prevention, 2021)

export function getRiskCategory(
  age: number,
  riskPercent: number
): RiskCategory {

  let highThreshold: number;
  let veryHighThreshold: number;

  if (age < 50) {
    highThreshold = 2.5;
    veryHighThreshold = 7.5;
  } else if (age < 70) {
    highThreshold = 5;
    veryHighThreshold = 10;
  } else {
    highThreshold = 7.5;
    veryHighThreshold = 15;
  }

  if (riskPercent >= veryHighThreshold) {
    return "veryhigh";
  }

  if (riskPercent >= highThreshold) {
    return "high";
  }

  return "low";
}


export function getRiskCategoryLabel(
  category: RiskCategory
): string {

  if (category === "low") {
    return "Низкий/умеренный риск";
  }

  if (category === "high") {
    return "Высокий риск";
  }

  return "Очень высокий риск";
}


export function getRiskCategoryColor(
  category: RiskCategory
): "green" | "yellow" | "red" {

  if (category === "low") {
    return "green";
  }

  if (category === "high") {
    return "yellow";
  }

  return "red";
}
