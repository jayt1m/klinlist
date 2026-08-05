"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  history: "0" | "1" | "2";
  ecg: "0" | "1" | "2";
  age: "0" | "1" | "2";
  riskFactors: "0" | "1" | "2";
  troponin: "0" | "1" | "2";
};

const initial: Data = {
  history: "0",
  ecg: "0",
  age: "0",
  riskFactors: "0",
  troponin: "0",
};

export default function HeartScoreCalculator() {
  const [data, setData] = useState<Data>(initial);

  const score =
    Number(data.history) +
    Number(data.ecg) +
    Number(data.age) +
    Number(data.riskFactors) +
    Number(data.troponin);

  const category =
    score <= 3 ? "low" : score <= 6 ? "moderate" : "high";

  const color =
    category === "low" ? "green" : category === "moderate" ? "yellow" : "red";

  const label =
    category === "low"
      ? "Низкий риск"
      : category === "moderate"
        ? "Умеренный риск"
        : "Высокий риск";

  // Six AJ, et al. Neth Heart J. 2008;16(6):191-196.
  const mace =
    category === "low" ? "2.5" : category === "moderate" ? "20.3" : "72.7";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="heart-score" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard
            label="Анамнез (History)"
            value={data.history}
            onChange={(v) => setData((p) => ({ ...p, history: v as Data["history"] }))}
            options={[
              { value: "0", label: "Малоподозрительный" },
              { value: "1", label: "Умеренно подозрительный" },
              { value: "2", label: "Высокоподозрительный" },
            ]}
          />

          <RadioCard
            label="ЭКГ"
            value={data.ecg}
            onChange={(v) => setData((p) => ({ ...p, ecg: v as Data["ecg"] }))}
            options={[
              { value: "0", label: "Норма" },
              { value: "1", label: "Неспецифические изменения реполяризации" },
              { value: "2", label: "Значимая депрессия ST" },
            ]}
          />

          <RadioCard
            label="Возраст"
            value={data.age}
            onChange={(v) => setData((p) => ({ ...p, age: v as Data["age"] }))}
            options={[
              { value: "0", label: "<45 лет" },
              { value: "1", label: "45–64 года" },
              { value: "2", label: "≥65 лет" },
            ]}
          />

          <RadioCard
            label="Факторы риска ИБС"
            value={data.riskFactors}
            onChange={(v) => setData((p) => ({ ...p, riskFactors: v as Data["riskFactors"] }))}
            options={[
              { value: "0", label: "Нет факторов риска" },
              { value: "1", label: "1–2 фактора риска" },
              { value: "2", label: "≥3 факторов или атеросклероз в анамнезе" },
            ]}
          />

          <RadioCard
            label="Тропонин"
            value={data.troponin}
            onChange={(v) => setData((p) => ({ ...p, troponin: v as Data["troponin"] }))}
            options={[
              { value: "0", label: "≤ верхней границы нормы" },
              { value: "1", label: "1–3× верхней границы нормы" },
              { value: "2", label: ">3× верхней границы нормы" },
            ]}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 10"
          title="HEART Score"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">
              Риск MACE в течение 6 недель
            </div>
            <div className="mt-1 text-2xl font-bold">{mace}%</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          HEART Score применяется у пациентов, обратившихся в
          отделение неотложной помощи с болью в груди, для решения
          вопроса о безопасности амбулаторного наблюдения. Шкала не
          заменяет ЭКГ и определение тропонина в динамике — низкий
          балл в сочетании с двумя отрицательными тропонинами,
          взятыми с интервалом 3–6 часов, даёт наибольшую
          отрицательную прогностическую ценность. Не применяется при
          явном ОКС с подъёмом ST — таким пациентам показана
          немедленная реперфузионная стратегия без предварительной
          стратификации по HEART.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Six AJ, Backus BE, Kelder JC. Neth Heart J.
          2008;16(6):191-196.
        </p>
      </div>

    </div>
  );
}
