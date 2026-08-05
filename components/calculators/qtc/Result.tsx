import { CircleAlert } from "lucide-react";

import ResultCard from "@/components/ui/ResultCard";

import { Sex } from "./types";
import {
  getQTcCategory,
  getQTcCategoryColor,
  getQTcCategoryLabel,
} from "./utils";


type Props = {
  qtcBazett: number;
  qtcFridericia: number;
  sex: Sex;
};


export default function Result({
  qtcBazett,
  qtcFridericia,
  sex,
}: Props) {

  const category = getQTcCategory(qtcBazett, sex);
  const color = getQTcCategoryColor(category);
  const label = getQTcCategoryLabel(category);


  return (

    <div className="space-y-8">

      <ResultCard
        score={qtcBazett}
        unit="мс (Базетт)"
        title="Корригированный QT"
        recommendation={label}
        color={color}
      >

        <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">

          <div className="text-sm text-zinc-500">
            По формуле Фридериции
          </div>

          <div className="mt-1 text-2xl font-bold">
            {qtcFridericia} мс
          </div>

        </div>

      </ResultCard>

      {category === "high-risk" && (

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

          <div className="mb-3 flex items-center gap-2">

            <CircleAlert className="h-5 w-5 text-red-600" />

            <h3 className="font-semibold text-red-900">
              Высокий риск
            </h3>

          </div>

          <p className="leading-7 text-red-900">
            QTc ≥500 мс ассоциирован с существенно повышенным
            риском полиморфной желудочковой тахикардии типа
            torsades de pointes. Необходимо исключить и
            скорректировать обратимые причины (электролитные
            нарушения, QT-удлиняющие препараты) и рассмотреть
            мониторинг ЭКГ.
          </p>

        </div>

      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Базетт завышает коррекцию при тахикардии и занижает при
        брадикардии. При ЧСС далёкой от 60 уд/мин формула
        Фридериции обычно точнее.
      </div>

    </div>

  );
}
