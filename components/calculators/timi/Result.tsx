import { Activity } from "lucide-react";

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
        unit="из 7"
        title="TIMI Risk Score (UA/NSTEMI)"
        recommendation={recommendation.title}
        color={color}
      >

        <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">

          <div className="text-sm text-zinc-500">
            Риск смерти, ИМ или экстренной реваскуляризации
            в течение 14 дней
          </div>

          <div className="mt-1 text-2xl font-bold">
            {recommendation.eventRate}%
          </div>

        </div>

      </ResultCard>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <Activity className="h-7 w-7 text-blue-600" />

          <h2 className="text-2xl font-bold">
            Клиническое заключение
          </h2>

        </div>

        <p className="leading-7 text-gray-700">
          {recommendation.recommendation}
        </p>

      </div>

    </div>

  );
}
