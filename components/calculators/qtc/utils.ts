import { QTcCategory, Sex } from "./types";


// Пороговые значения по полу
// (AHA/ACCF/HRS Recommendations for ECG Standardization, 2009)

export function getQTcCategory(
  qtc: number,
  sex: Sex
): QTcCategory {

  if (qtc >= 500) {
    return "high-risk";
  }

  if (sex === "male") {

    if (qtc <= 430) return "normal";
    if (qtc <= 450) return "borderline";

    return "prolonged";

  }

  if (qtc <= 450) return "normal";
  if (qtc <= 470) return "borderline";

  return "prolonged";

}


export function getQTcCategoryLabel(
  category: QTcCategory
): string {

  const labels: Record<QTcCategory, string> = {
    normal: "Норма",
    borderline: "Пограничное удлинение",
    prolonged: "Удлинённый QTc",
    "high-risk": "Значительно удлинён — высокий риск torsades de pointes",
  };

  return labels[category];

}


export function getQTcCategoryColor(
  category: QTcCategory
): "green" | "yellow" | "red" {

  if (category === "normal") return "green";
  if (category === "borderline") return "yellow";

  return "red";

}
