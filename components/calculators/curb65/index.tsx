"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  confusion: boolean;
  urea: boolean;
  rr: boolean;
  bp: boolean;
  age65: boolean;
};

const initial: Data = {
  confusion: false,
  urea: false,
  rr: false,
  bp: false,
  age65: false,
};

export default function CURB65Calculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const score =
    Number(data.confusion) +
    Number(data.urea) +
    Number(data.rr) +
    Number(data.bp) +
    Number(data.age65);

  const category = score <= 1 ? "low" : score === 2 ? "moderate" : "high";
  const color = category === "low" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "low"
      ? "Низкий риск — возможно амбулаторное лечение"
      : category === "moderate"
        ? "Умеренный риск — рассмотреть госпитализацию"
        : "Высокий риск — госпитализация, при 4–5 баллах — рассмотреть ОРИТ";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="curb65" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Критерии</h2>

          <div className="space-y-4">

            <CheckboxCard title="Спутанность сознания" points={1} checked={data.confusion} onChange={() => toggle("confusion")} />
            <CheckboxCard title="Мочевина >7 ммоль/л" points={1} checked={data.urea} onChange={() => toggle("urea")} />
            <CheckboxCard title="ЧДД ≥30 в минуту" points={1} checked={data.rr} onChange={() => toggle("rr")} />
            <CheckboxCard title="АД: САД <90 или ДАД ≤60 мм рт.ст." points={1} checked={data.bp} onChange={() => toggle("bp")} />
            <CheckboxCard title="Возраст ≥65 лет" points={1} checked={data.age65} onChange={() => toggle("age65")} />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="из 5"
          title="CURB-65"
          recommendation={label}
          color={color}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Для амбулаторного приёма, где определение мочевины
          недоступно сразу, существует упрощённый вариант CRB-65 (без
          критерия мочевины) с теми же порогами 0–1/2/3–4 балла. Шкала
          не учитывает гипоксемию, сопутствующие заболевания и
          социальные факторы (возможность ухода на дому) — при
          пограничных значениях эти обстоятельства должны влиять на
          решение о госпитализации наравне с баллом.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Lim WS, et al. Thorax. 2003;58(5):377-382.
        </p>
      </div>

    </div>
  );
}
