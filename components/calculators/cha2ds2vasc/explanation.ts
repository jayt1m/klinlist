import { CHA2DS2VASCData } from "./types";

export function getExplanation(data: CHA2DS2VASCData): string[] {
  const result: string[] = [];

  if (data.sex === "female") {
    result.push("Женский пол (+1)");
  }

  if (data.age75) {
    result.push("Возраст ≥75 лет (+2)");
  } else if (data.age6574) {
    result.push("Возраст 65–74 года (+1)");
  }

  if (data.heartFailure) {
    result.push("Хроническая сердечная недостаточность (+1)");
  }

  if (data.hypertension) {
    result.push("Артериальная гипертензия (+1)");
  }

  if (data.diabetes) {
    result.push("Сахарный диабет (+1)");
  }

  if (data.stroke) {
    result.push("Инсульт / ТИА / системная тромбоэмболия (+2)");
  }

  if (data.vascularDisease) {
    result.push("Сосудистое заболевание (+1)");
  }

  return result;
}