import { BMIData } from "./types";


// ИМТ = вес (кг) / рост (м)²

export function calculateBMI(
  data: BMIData
): number {

  const heightMeters = data.height / 100;

  const bmi =
    data.weight / (heightMeters * heightMeters);

  return Number(bmi.toFixed(1));

}
