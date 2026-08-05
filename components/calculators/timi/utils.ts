// Частота исходов (смерть, ИМ или экстренная реваскуляризация
// в течение 14 дней) по данным валидационной когорты TIMI 11B

export function getEventRate(
  score: number
): string {

  if (score <= 1) return "4.7";
  if (score === 2) return "8.3";
  if (score === 3) return "13.2";
  if (score === 4) return "19.9";
  if (score === 5) return "26.2";

  return "40.9";

}


export function getRiskCategory(
  score: number
): "low" | "intermediate" | "high" {

  if (score <= 2) return "low";
  if (score <= 4) return "intermediate";

  return "high";

}


export function getRiskCategoryLabel(
  category: "low" | "intermediate" | "high"
): string {

  if (category === "low") return "Низкий риск";
  if (category === "intermediate") return "Промежуточный риск";

  return "Высокий риск";

}


export function getRiskCategoryColor(
  category: "low" | "intermediate" | "high"
): "green" | "yellow" | "red" {

  if (category === "low") return "green";
  if (category === "intermediate") return "yellow";

  return "red";

}
