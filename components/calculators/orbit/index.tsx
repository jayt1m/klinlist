"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  age75: boolean;
  anemia: boolean;
  bleedingHistory: boolean;
  renal: boolean;
  antiplatelet: boolean;
};

const initial: Data = {
  age75: false,
  anemia: false,
  bleedingHistory: false,
  renal: false,
  antiplatelet: false,
};

export default function OrbitCalculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const score =
    Number(data.age75) +
    Number(data.anemia) * 2 +
    Number(data.bleedingHistory) * 2 +
    Number(data.renal) +
    Number(data.antiplatelet);

  const category = score <= 2 ? "low" : score === 3 ? "medium" : "high";
  const color = category === "low" ? "green" : category === "medium" ? "yellow" : "red";
  const label =
    category === "low" ? "Низкий риск" : category === "medium" ? "Средний риск" : "Высокий риск";
  const rate =
    category === "low" ? "2.4" : category === "medium" ? "4.7" : "8.1";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="orbit" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Критерии</h2>

          <div className="space-y-4">

            <CheckboxCard
              title="Возраст ≥75 лет"
              points={1}
              checked={data.age75}
              onChange={() => toggle("age75")}
            />

            <CheckboxCard
              title="Анемия"
              description="Гемоглобин <130 г/л (муж.) / <120 г/л (жен.) или анемия в анамнезе"
              points={2}
              checked={data.anemia}
              onChange={() => toggle("anemia")}
            />

            <CheckboxCard
              title="Кровотечения в анамнезе"
              points={2}
              checked={data.bleedingHistory}
              onChange={() => toggle("bleedingHistory")}
            />

            <CheckboxCard
              title="Сниженная функция почек"
              description="СКФ <60 мл/мин/1,73м²"
              points={1}
              checked={data.renal}
              onChange={() => toggle("renal")}
            />

            <CheckboxCard
              title="Приём антиагрегантов"
              points={1}
              checked={data.antiplatelet}
              onChange={() => toggle("antiplatelet")}
            />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="из 7"
          title="ORBIT"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">
              Частота больших кровотечений
            </div>
            <div className="mt-1 text-2xl font-bold">{rate} / 100 пациенто-лет</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          ORBIT разработан как более простая и лучше калиброванная
          альтернатива HAS-BLED для оценки риска кровотечений у
          пациентов с фибрилляцией предсердий на антикоагулянтной
          терапии. Как и HAS-BLED, высокий балл по ORBIT — это не
          повод отказаться от антикоагулянтов, а сигнал
          скорректировать модифицируемые факторы риска (например,
          отменить сопутствующие антиагреганты без строгих
          показаний) и обеспечить более частое наблюдение. Решение о
          терапии принимается в сопоставлении с риском инсульта по
          CHA₂DS₂-VASc.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: O'Brien EC, et al. Eur Heart J.
          2015;36(46):3258-3264.
        </p>
      </div>

    </div>
  );
}
