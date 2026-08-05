import { SCORE2Data } from "./types";
import { calculateSCORE2 } from "./formulas";
import { getRiskCategory, getRiskCategoryLabel } from "./utils";


export type Recommendation = {
  score: number;

  category:
    | "low"
    | "high"
    | "veryhigh";

  title: string;

  text: string;

  recommendation: string;

};


export function getRecommendation(
  data: SCORE2Data
): Recommendation {

  const score = calculateSCORE2(data);

  const category = getRiskCategory(
    data.age,
    score
  );

  const title = getRiskCategoryLabel(category);


  if (category === "low") {

    return {
      score,

      category,

      title,

      text:
        "10-летний риск фатальных и нефатальных сердечно-сосудистых событий низкий или умеренный.",

      recommendation:
        "Основной акцент на модификацию образа жизни: отказ от курения, физическая активность, здоровое питание. Медикаментозная терапия обычно не требуется, за исключением случаев с отдельными выраженными факторами риска.",
    };

  }


  if (category === "high") {

    return {
      score,

      category,

      title,

      text:
        "10-летний риск сердечно-сосудистых событий повышен.",

      recommendation:
        "Следует рассмотреть медикаментозную коррекцию факторов риска (гиполипидемическая и антигипертензивная терапия) в дополнение к модификации образа жизни. Решение принимается с учётом дополнительных модификаторов риска и предпочтений пациента.",
    };

  }


  return {

    score,

    category,

    title,

    text:
      "10-летний риск сердечно-сосудистых событий очень высокий.",

    recommendation:
      "Показана активная медикаментозная терапия: гиполипидемическая (с целевыми уровнями ЛПНП) и антигипертензивная терапия, наряду со строгой модификацией образа жизни. Целесообразна консультация кардиолога.",

  };

}
