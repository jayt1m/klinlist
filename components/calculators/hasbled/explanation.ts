import { HASBLEDData } from "./types";

export function getExplanation(
  data: HASBLEDData
): string[] {

  const result: string[] = [];


  if (data.hypertension) {
    result.push(
      "Артериальная гипертензия (САД >160 мм рт.ст.) (+1)"
    );
  }


  if (data.renal) {
    result.push(
      "Нарушение функции почек (+1)"
    );
  }


  if (data.liver) {
    result.push(
      "Нарушение функции печени (+1)"
    );
  }


  if (data.stroke) {
    result.push(
      "Перенесённый инсульт (+1)"
    );
  }


  if (data.bleeding) {
    result.push(
      "Кровотечение в анамнезе или предрасположенность к кровотечениям (+1)"
    );
  }


  if (data.labileINR) {
    result.push(
      "Лабильное МНО при терапии варфарином (+1)"
    );
  }


  if (data.elderly) {
    result.push(
      "Возраст >65 лет (+1)"
    );
  }


  if (data.drugs) {
    result.push(
      "Приём антиагрегантов или НПВС (+1)"
    );
  }


  if (data.alcohol) {
    result.push(
      "Злоупотребление алкоголем (+1)"
    );
  }


  return result;
}