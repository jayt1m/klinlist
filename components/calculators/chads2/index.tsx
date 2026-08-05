"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  chf: boolean;
  hypertension: boolean;
  age75: boolean;
  diabetes: boolean;
  strokeTia: boolean;
};

const initial: Data = {
  chf: false,
  hypertension: false,
  age75: false,
  diabetes: false,
  strokeTia: false,
};

// Gage BF, et al. JAMA. 2001;285(22):2864-2870.
const strokeRate: Record<number, string> = {
  0: "1.9",
  1: "2.8",
  2: "4.0",
  3: "5.9",
  4: "8.5",
  5: "12.5",
  6: "18.2",
};

export default function CHADS2Calculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const score =
    Number(data.chf) +
    Number(data.hypertension) +
    Number(data.age75) +
    Number(data.diabetes) +
    Number(data.strokeTia) * 2;

  const color = score === 0 ? "green" : score <= 2 ? "yellow" : "red";
  const label =
    score === 0
      ? "Низкий риск"
      : score <= 2
        ? "Умеренный риск"
        : "Высокий риск";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="chads2" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Критерии</h2>

          <div className="space-y-4">

            <CheckboxCard
              title="Хроническая сердечная недостаточность"
              points={1}
              checked={data.chf}
              onChange={() => toggle("chf")}
            />

            <CheckboxCard
              title="Артериальная гипертензия"
              points={1}
              checked={data.hypertension}
              onChange={() => toggle("hypertension")}
            />

            <CheckboxCard
              title="Возраст ≥75 лет"
              points={1}
              checked={data.age75}
              onChange={() => toggle("age75")}
            />

            <CheckboxCard
              title="Сахарный диабет"
              points={1}
              checked={data.diabetes}
              onChange={() => toggle("diabetes")}
            />

            <CheckboxCard
              title="Инсульт или ТИА в анамнезе"
              points={2}
              checked={data.strokeTia}
              onChange={() => toggle("strokeTia")}
            />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="из 6"
          title="CHADS₂"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">
              Скорректированная частота инсульта в год
            </div>
            <div className="mt-1 text-2xl font-bold">
              {strokeRate[score]}%
            </div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          CHADS₂ — предшественник CHA₂DS₂-VASc, менее чувствителен у
          пациентов с низким риском: значительная часть пациентов с 0
          баллов по CHADS₂ при пересчёте по CHA₂DS₂-VASc попадает в
          группу с ненулевым риском инсульта за счёт учёта возраста
          65–74 лет, сосудистых заболеваний и женского пола. Для
          принятия решения о начале антикоагулянтной терапии
          предпочтительна шкала CHA₂DS₂-VASc — она сохранена на сайте
          отдельным калькулятором.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Gage BF, et al. JAMA. 2001;285(22):2864-2870.
        </p>
      </div>

    </div>
  );
}
