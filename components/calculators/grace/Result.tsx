import { Activity, CircleAlert, Wrench } from "lucide-react";

import ResultCard from "@/components/ui/ResultCard";

import { Recommendation } from "./recommendations";
import { getRiskCategoryColor } from "./utils";


type Props = {
  recommendation: Recommendation;
};


export default function Result({
  recommendation,
}: Props) {

  const color = getRiskCategoryColor(
    recommendation.category
  );


  return (

    <div className="space-y-8">

      <ResultCard
        score={recommendation.score}
        unit="баллов"
        title="Шкала GRACE"
        recommendation={recommendation.title}
        color={color}
      />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <Activity className="h-7 w-7 text-blue-600" />

          <h2 className="text-2xl font-bold">
            Клиническое заключение
          </h2>

        </div>

        <p className="leading-7 text-gray-700">
          {recommendation.text}
        </p>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="mb-3 flex items-center gap-2">

            <Wrench className="h-5 w-5 text-blue-700" />

            <h3 className="font-semibold">
              Тактика ведения
            </h3>

          </div>

          <p className="leading-7 text-blue-900">
            {recommendation.recommendation}
          </p>

        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">

          <div className="mb-3 flex items-center gap-2">

            <CircleAlert className="h-5 w-5 text-amber-600" />

            <h3 className="font-semibold">
              Важно
            </h3>

          </div>

          <p className="leading-7 text-amber-900">
            Точный процент госпитальной летальности по номограмме GRACE
            здесь намеренно не приводится — доверять можно только
            официально валидированному значению. Балл и категория риска
            рассчитаны по опубликованной таблице и пригодны для принятия
            решения о тактике ведения.
          </p>

        </div>

      </div>

    </div>

  );
}
