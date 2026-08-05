"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import { CircleAlert, CircleCheck } from "lucide-react";

type Data = {
  age50: boolean;
  hr100: boolean;
  spo2: boolean;
  legSwelling: boolean;
  hemoptysis: boolean;
  surgery: boolean;
  priorVte: boolean;
  hormones: boolean;
};

const initial: Data = {
  age50: false,
  hr100: false,
  spo2: false,
  legSwelling: false,
  hemoptysis: false,
  surgery: false,
  priorVte: false,
  hormones: false,
};

export default function PERCCalculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const positive = Object.values(data).some(Boolean);

  return (
    <div className="mx-auto max-w-4xl space-y-10">

      <CalculatorHeader calculatorId="perc" />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">Критерии PERC</h2>

        <div className="space-y-4">

          <CheckboxCard title="Возраст ≥50 лет" points={1} checked={data.age50} onChange={() => toggle("age50")} />
          <CheckboxCard title="ЧСС ≥100 в минуту" points={1} checked={data.hr100} onChange={() => toggle("hr100")} />
          <CheckboxCard title="SpO₂ <95% на воздухе" points={1} checked={data.spo2} onChange={() => toggle("spo2")} />
          <CheckboxCard title="Односторонний отёк ноги" points={1} checked={data.legSwelling} onChange={() => toggle("legSwelling")} />
          <CheckboxCard title="Кровохарканье" points={1} checked={data.hemoptysis} onChange={() => toggle("hemoptysis")} />
          <CheckboxCard title="Операция или травма за последние 4 недели" points={1} checked={data.surgery} onChange={() => toggle("surgery")} />
          <CheckboxCard title="ТЭЛА или ТГВ в анамнезе" points={1} checked={data.priorVte} onChange={() => toggle("priorVte")} />
          <CheckboxCard title="Приём эстрогенов" points={1} checked={data.hormones} onChange={() => toggle("hormones")} />

        </div>

      </div>

      <div
        className={`rounded-3xl border p-8 ${
          positive ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"
        }`}
      >
        <div className="mb-3 flex items-center gap-3">
          {positive ? (
            <CircleAlert className="h-7 w-7 text-amber-600" />
          ) : (
            <CircleCheck className="h-7 w-7 text-emerald-600" />
          )}

          <h3 className="text-xl font-bold">
            {positive ? "PERC положительный" : "PERC отрицательный"}
          </h3>
        </div>

        <p className="leading-7 text-gray-700">
          {positive
            ? "Хотя бы один критерий положителен — правило PERC не позволяет исключить ТЭЛА. Требуется дальнейшая диагностика (D-димер и/или визуализация)."
            : "Все критерии отрицательны. При изначально низкой клинической вероятности ТЭЛА (например, по шкале Wells) диагноз может быть исключён без дальнейшего тестирования."}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        PERC применяется только у пациентов с изначально низкой
        клинической вероятностью ТЭЛА. Источник: Kline JA, et al. J
        Thromb Haemost. 2004;2(8):1247-1255.
      </div>

    </div>
  );
}
