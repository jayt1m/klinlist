import { CHA2DS2VASCData } from "./types";
import { calculateCHA2DS2VASc } from "./utils";

export type Recommendation = {
  score: number;
  risk: "low" | "intermediate" | "high";
  title: string;
  text: string;
  classRecommendation: string;
  evidenceLevel: string;
};

export function getRecommendation(
  data: CHA2DS2VASCData
): Recommendation {
  const score = calculateCHA2DS2VASc(data);

  if (data.sex === "male") {
    if (score === 0) {
      return {
        score,
        risk: "low",
        title: "Низкий риск",
        text:
          "Назначение пероральных антикоагулянтов не рекомендуется.",
        classRecommendation: "III",
        evidenceLevel: "B",
      };
    }

    if (score === 1) {
      return {
        score,
        risk: "intermediate",
        title: "Промежуточный риск",
        text:
          "Следует индивидуально оценить дополнительные факторы риска тромбоэмболических осложнений и принять решение о назначении пероральных антикоагулянтов.",
        classRecommendation: "IIa",
        evidenceLevel: "B",
      };
    }

    return {
      score,
      risk: "high",
      title: "Высокий риск",
      text:
        "Рекомендована длительная терапия пероральными антикоагулянтами при отсутствии противопоказаний.",
      classRecommendation: "I",
      evidenceLevel: "A",
    };
  }

  if (score === 1) {
    return {
      score,
      risk: "low",
      title: "Низкий риск",
      text:
        "Женский пол сам по себе не является основанием для назначения антикоагулянтной терапии.",
      classRecommendation: "III",
      evidenceLevel: "B",
    };
  }

  if (score === 2) {
    return {
      score,
      risk: "intermediate",
      title: "Промежуточный риск",
      text:
        "Следует индивидуально оценить дополнительные факторы риска тромбоэмболических осложнений и принять решение о назначении терапии.",
      classRecommendation: "IIa",
      evidenceLevel: "B",
    };
  }

  return {
    score,
    risk: "high",
    title: "Высокий риск",
    text:
      "Рекомендована длительная терапия пероральными антикоагулянтами при отсутствии противопоказаний.",
    classRecommendation: "I",
    evidenceLevel: "A",
  };
}