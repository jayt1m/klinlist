"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function ABCD2Calculator() {
  const [age60, setAge60] = useState(false);
  const [bp, setBp] = useState(false);
  const [features, setFeatures] = useState("0");
  const [duration, setDuration] = useState("0");
  const [diabetes, setDiabetes] = useState(false);

  const score =
    Number(age60) + Number(bp) + Number(features) + Number(duration) + Number(diabetes);

  const category = score <= 3 ? "low" : score <= 5 ? "moderate" : "high";
  const color = category === "low" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "low" ? "Низкий риск" : category === "moderate" ? "Умеренный риск" : "Высокий риск";
  const risk =
    category === "low" ? "1–2" : category === "moderate" ? "4–8" : "8–12";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="abcd2" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <CheckboxCard title="Возраст ≥60 лет" points={1} checked={age60} onChange={() => setAge60(!age60)} />

          <CheckboxCard
            title="АД ≥140/90 мм рт.ст."
            description="При первом осмотре после ТИА"
            points={1}
            checked={bp}
            onChange={() => setBp(!bp)}
          />

          <RadioCard
            label="Клинические особенности"
            value={features}
            onChange={setFeatures}
            options={[
              { value: "0", label: "Другие симптомы" },
              { value: "1", label: "Только нарушение речи" },
              { value: "2", label: "Односторонняя слабость" },
            ]}
          />

          <RadioCard
            label="Продолжительность симптомов"
            value={duration}
            onChange={setDuration}
            options={[
              { value: "0", label: "<10 минут" },
              { value: "1", label: "10–59 минут" },
              { value: "2", label: "≥60 минут" },
            ]}
          />

          <CheckboxCard title="Сахарный диабет" points={1} checked={diabetes} onChange={() => setDiabetes(!diabetes)} />

        </div>

        <ResultCard
          score={score}
          unit="из 7"
          title="ABCD²"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">Риск инсульта в течение 7 дней</div>
            <div className="mt-1 text-2xl font-bold">{risk}%</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Оценка краткосрочного риска инсульта после транзиторной
          ишемической атаки. Современные протоколы (в т.ч. с
          использованием диффузионно-взвешенной МРТ и экспресс-оценки
          у сосудистого невролога) показывают, что специализированная
          срочная помощь снижает риск сильнее, чем сам балл ABCD² —
          шкала не должна использоваться для отказа от срочного
          обследования при низком балле, если клиническая картина
          настораживает.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Johnston SC, et al. Lancet.
          2007;369(9558):283-292.
        </p>
      </div>

    </div>
  );
}
