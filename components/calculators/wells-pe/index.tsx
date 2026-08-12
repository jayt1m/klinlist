"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";

import { WellsData } from "./types";
import { getRecommendation } from "./recommendations";
import Result from "./Result";


const initialData: WellsData = {
  dvtSigns: false,
  peMostLikely: false,
  heartRateOver100: false,
  immobilization: false,
  previousDvtPe: false,
  hemoptysis: false,
  malignancy: false,
};


export default function WellsPECalculator() {

  const [data, setData] = useState<WellsData>(initialData);


  function toggle(field: keyof WellsData) {

    setData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

  }


  function resetCalculator() {
    setData(initialData);
  }


  const recommendation = getRecommendation(data);


  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="wells-pe" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Клинические критерии
            </h2>

            <button
              onClick={resetCalculator}
              className="text-sm font-medium text-gray-500 transition hover:text-gray-800"
            >
              Сбросить
            </button>

          </div>

          <div className="space-y-4">

            <CheckboxCard
              title="Клинические признаки ТГВ"
              description="Отёк, боль при пальпации по ходу глубоких вен"
              points={3}
              checked={data.dvtSigns}
              onChange={() => toggle("dvtSigns")}
            />

            <CheckboxCard
              title="ТЭЛА наиболее вероятна"
              description="Или равновероятна другим диагнозам"
              points={3}
              checked={data.peMostLikely}
              onChange={() => toggle("peMostLikely")}
            />

            <CheckboxCard
              title="ЧСС >100 уд/мин"
              points={1.5}
              checked={data.heartRateOver100}
              onChange={() => toggle("heartRateOver100")}
            />

            <CheckboxCard
              title="Иммобилизация ≥3 дней или операция за последние 4 недели"
              points={1.5}
              checked={data.immobilization}
              onChange={() => toggle("immobilization")}
            />

            <CheckboxCard
              title="ТГВ или ТЭЛА в анамнезе"
              points={1.5}
              checked={data.previousDvtPe}
              onChange={() => toggle("previousDvtPe")}
            />

            <CheckboxCard
              title="Кровохарканье"
              points={1}
              checked={data.hemoptysis}
              onChange={() => toggle("hemoptysis")}
            />

            <CheckboxCard
              title="Злокачественное новообразование"
              description="Лечение в последние 6 месяцев или паллиативная помощь"
              points={1}
              checked={data.malignancy}
              onChange={() => toggle("malignancy")}
            />

          </div>

        </div>

        <Result recommendation={recommendation} />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          При «ТЭЛА маловероятна» (≤4 баллов) и отрицательном
          D-димере диагноз может быть исключён без визуализации; при
          «ТЭЛА вероятна» (&gt;4 баллов) КТ-ангиопульмонография
          показана независимо от уровня D-димера — его определение в
          этой группе не имеет смысла. У пациентов, соответствующих
          всем критериям PERC, можно вообще не начинать оценку по
          Wells при изначально низком клиническом подозрении.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Wells PS, et al. Thromb Haemost.
          2000;83(3):416-420.
        </p>
      </div>

    </div>
  );
}
