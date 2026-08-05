import { HASBLEDData } from "./types";
import { calculateHASBLED } from "./utils";

export type Recommendation = {
  score: number;

  risk:
    | "low"
    | "intermediate"
    | "high";

  title: string;

  text: string;

  recommendation: string;

};


export function getRecommendation(
  data: HASBLEDData
): Recommendation {

  const score = calculateHASBLED(data);


  if (score <= 1) {

    return {
      score,

      risk: "low",

      title:
        "Низкий риск кровотечений",

      text:
        "Риск больших кровотечений низкий.",

      recommendation:
        "Продолжить оценку клинической ситуации. Специальная коррекция факторов риска кровотечения не требуется.",
    };

  }


  if (score === 2) {

    return {
      score,

      risk: "intermediate",

      title:
        "Умеренный риск кровотечений",

      text:
        "Имеются дополнительные факторы риска кровотечений.",

      recommendation:
        "Следует оценить модифицируемые факторы риска и регулярно контролировать состояние пациента.",
    };

  }


  return {

    score,

    risk: "high",

    title:
      "Высокий риск кровотечений",

    text:
      "Высокий балл HAS-BLED указывает на повышенный риск больших кровотечений.",

    recommendation:
      "Высокий риск не является противопоказанием к антикоагулянтной терапии. Необходимо выявить и скорректировать обратимые факторы риска кровотечения.",

  };

}