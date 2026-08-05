export type TwoTierCategory = "unlikely" | "likely";

export type ThreeTierCategory = "low" | "moderate" | "high";


// Двухуровневая интерпретация (рекомендуется большинством
// современных протоколов — используется вместе с D-димером)

export function getTwoTierCategory(
  score: number
): TwoTierCategory {

  if (score <= 4) return "unlikely";

  return "likely";

}


export function getTwoTierLabel(
  category: TwoTierCategory
): string {

  if (category === "unlikely") {
    return "ТЭЛА маловероятна";
  }

  return "ТЭЛА вероятна";

}


// Трёхуровневая (исходная) интерпретация

export function getThreeTierCategory(
  score: number
): ThreeTierCategory {

  if (score < 2) return "low";
  if (score <= 6) return "moderate";

  return "high";

}


export function getThreeTierLabel(
  category: ThreeTierCategory
): string {

  if (category === "low") return "Низкая вероятность";
  if (category === "moderate") return "Умеренная вероятность";

  return "Высокая вероятность";

}


export function getCategoryColor(
  category: TwoTierCategory
): "green" | "red" {

  if (category === "unlikely") return "green";

  return "red";

}
