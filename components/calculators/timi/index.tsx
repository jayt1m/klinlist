"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";

import { TIMIData } from "./types";
import { getRecommendation } from "./recommendations";
import Result from "./Result";


const initialData: TIMIData = {
  age65: false,
  riskFactors3: false,
  knownCAD: false,
  aspirin7days: false,
  severeAngina: false,
  stDeviation: false,
  elevatedMarkers: false,
};


export default function TIMICalculator() {

  const [data, setData] = useState<TIMIData>(initialData);


  function toggle(field: keyof TIMIData) {

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

      <CalculatorHeader calculatorId="timi" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Критерии риска
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
              title="Возраст ≥65 лет"
              points={1}
              checked={data.age65}
              onChange={() => toggle("age65")}
            />

            <CheckboxCard
              title="≥3 факторов риска ИБС"
              description="Семейный анамнез ИБС, АГ, гиперхолестеринемия, сахарный диабет, курение"
              points={1}
              checked={data.riskFactors3}
              onChange={() => toggle("riskFactors3")}
            />

            <CheckboxCard
              title="Известный стеноз коронарной артерии ≥50%"
              points={1}
              checked={data.knownCAD}
              onChange={() => toggle("knownCAD")}
            />

            <CheckboxCard
              title="Приём аспирина в предшествующие 7 дней"
              points={1}
              checked={data.aspirin7days}
              onChange={() => toggle("aspirin7days")}
            />

            <CheckboxCard
              title="Тяжёлая стенокардия"
              description="≥2 эпизодов за последние 24 часа"
              points={1}
              checked={data.severeAngina}
              onChange={() => toggle("severeAngina")}
            />

            <CheckboxCard
              title="Смещение сегмента ST ≥0.5 мм"
              description="На исходной ЭКГ"
              points={1}
              checked={data.stDeviation}
              onChange={() => toggle("stDeviation")}
            />

            <CheckboxCard
              title="Повышение кардиоспецифичных маркеров"
              description="Тропонин, МВ-КФК"
              points={1}
              checked={data.elevatedMarkers}
              onChange={() => toggle("elevatedMarkers")}
            />

          </div>

        </div>

        <Result recommendation={recommendation} />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Валидирована для нестабильной стенокардии и ИМбпST — не
          применяется при ИМпST (для него используется отдельная
          версия TIMI STEMI). В отличие от GRACE, все 7 критериев
          равнозначны (по 1 баллу), что делает шкалу проще для
          быстрого подсчёта у постели больного, но менее точной, чем
          GRACE, для стратификации госпитальной летальности —
          используйте её как дополнение к GRACE, а не замену.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Antman EM, et al. JAMA. 2000;284(7):835-842.
        </p>
      </div>

    </div>
  );
}
