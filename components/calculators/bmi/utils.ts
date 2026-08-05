import { BMICategory } from "./types";


export function getBMICategory(
  bmi: number
): BMICategory {

  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  if (bmi < 35) return "obesity1";
  if (bmi < 40) return "obesity2";

  return "obesity3";

}


export function getBMICategoryLabel(
  category: BMICategory
): string {

  const labels: Record<BMICategory, string> = {
    underweight: "Дефицит массы тела",
    normal: "Нормальная масса тела",
    overweight: "Избыточная масса тела",
    obesity1: "Ожирение I степени",
    obesity2: "Ожирение II степени",
    obesity3: "Ожирение III степени",
  };

  return labels[category];

}


export function getBMICategoryColor(
  category: BMICategory
): "green" | "yellow" | "red" {

  if (category === "normal") return "green";

  if (
    category === "underweight" ||
    category === "overweight"
  ) {
    return "yellow";
  }

  return "red";

}
