import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  CircleAlert,
  CircleX,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import ResultCard from "@/components/ui/ResultCard";

import type { Recommendation } from "./recommendations";
import { annualStrokeRisk } from "./risk";
import { getExplanation } from "./explanation";
import { CHA2DS2VASCData } from "./types";

type Props = {
  recommendation: Recommendation;
  data: CHA2DS2VASCData;
};

export default function Result({
  recommendation,
  data,
}: Props) {

  const explanation = getExplanation(data);

  const color =
    recommendation.risk === "low"
      ? "green"
      : recommendation.risk === "intermediate"
      ? "yellow"
      : "red";

  const annualRisk =
    annualStrokeRisk[recommendation.score] ?? 0;

  return (
    <div className="space-y-8">

      <ResultCard
        score={recommendation.score}
        title={recommendation.title}
        recommendation={recommendation.text}
        color={color}
      />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">

          <BadgeCheck className="h-7 w-7 text-indigo-600" />

          <h2 className="text-2xl font-bold">
            Клиническое заключение
          </h2>

        </div>

        <div className="space-y-8">

          <div className="rounded-2xl bg-red-50 border border-red-100 p-6">

            <div className="mb-3 flex items-center gap-2">

              <TrendingUp className="h-6 w-6 text-red-600" />

              <h3 className="text-lg font-semibold">
                Годовой риск инсульта
              </h3>

            </div>

            <div className="text-5xl font-black text-red-600">
              {annualRisk}%
            </div>

            <p className="mt-3 text-gray-600">
              Оценочный риск ишемического инсульта или системной
              тромбоэмболии в течение одного года.
            </p>

          </div>

          <div>

            <div className="mb-3 flex items-center gap-2">

              <ShieldCheck className="h-5 w-5 text-blue-600" />

              <h3 className="font-semibold">
                Класс рекомендации
              </h3>

            </div>

            <p className="text-lg font-bold">
              {recommendation.classRecommendation}
            </p>

          </div>

          <div>

            <div className="mb-3 flex items-center gap-2">

              <BookOpen className="h-5 w-5 text-blue-600" />

              <h3 className="font-semibold">
                Уровень доказательности
              </h3>

            </div>

            <p className="text-lg font-bold">
              {recommendation.evidenceLevel}
            </p>

          </div>

          <div>

            <div className="mb-4 flex items-center gap-2">

              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <h3 className="font-semibold">
                Баллы начислены за
              </h3>

            </div>

            {explanation.length === 0 ? (

              <div className="flex items-center gap-2 text-gray-500">

                <CircleX className="h-5 w-5" />

                <span>
                  Факторы риска отсутствуют.
                </span>

              </div>

            ) : (

              <ul className="space-y-3">

                {explanation.map((item) => (

                  <li
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                    <span>{item}</span>

                  </li>

                ))}

              </ul>

            )}

          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="mb-3 flex items-center gap-2">

              <CircleAlert className="h-5 w-5 text-blue-700" />

              <h3 className="font-semibold text-blue-900">
                Интерпретация
              </h3>

            </div>

            <p className="leading-7 text-blue-900">
              {recommendation.text}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}