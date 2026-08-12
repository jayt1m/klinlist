"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const freqOptions = [
  { value: "0", label: "Никогда" },
  { value: "1", label: "Реже чем в 1 случае из 5" },
  { value: "2", label: "Менее чем в половине случаев" },
  { value: "3", label: "Примерно в половине случаев" },
  { value: "4", label: "Более чем в половине случаев" },
  { value: "5", label: "Почти всегда" },
];

export default function IPSSCalculator() {
  const [emptying, setEmptying] = useState("0");
  const [frequency, setFrequency] = useState("0");
  const [intermittency, setIntermittency] = useState("0");
  const [urgency, setUrgency] = useState("0");
  const [weakStream, setWeakStream] = useState("0");
  const [straining, setStraining] = useState("0");
  const [nocturia, setNocturia] = useState("0");

  const score =
    Number(emptying) +
    Number(frequency) +
    Number(intermittency) +
    Number(urgency) +
    Number(weakStream) +
    Number(straining) +
    Number(nocturia);

  const category = score <= 7 ? "mild" : score <= 19 ? "moderate" : "severe";
  const color = category === "mild" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "mild" ? "Лёгкая симптоматика" : category === "moderate" ? "Умеренная симптоматика" : "Тяжёлая симптоматика";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="ipss" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard label="Ощущение неполного опорожнения мочевого пузыря" value={emptying} onChange={setEmptying} options={freqOptions} columns={2} />
          <RadioCard label="Повторное мочеиспускание менее чем через 2 часа" value={frequency} onChange={setFrequency} options={freqOptions} columns={2} />
          <RadioCard label="Прерывистое мочеиспускание" value={intermittency} onChange={setIntermittency} options={freqOptions} columns={2} />
          <RadioCard label="Затруднение в удержании мочеиспускания" value={urgency} onChange={setUrgency} options={freqOptions} columns={2} />
          <RadioCard label="Слабая струя мочи" value={weakStream} onChange={setWeakStream} options={freqOptions} columns={2} />
          <RadioCard label="Необходимость тужиться для начала мочеиспускания" value={straining} onChange={setStraining} options={freqOptions} columns={2} />

          <RadioCard
            label="Количество ночных мочеиспусканий (от засыпания до подъёма утром)"
            value={nocturia}
            onChange={setNocturia}
            options={[
              { value: "0", label: "Ни разу" },
              { value: "1", label: "1 раз" },
              { value: "2", label: "2 раза" },
              { value: "3", label: "3 раза" },
              { value: "4", label: "4 раза" },
              { value: "5", label: "5 раз и более" },
            ]}
            columns={2}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 35"
          title="IPSS"
          recommendation={label}
          color={color}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
<p>
        Оценка выраженности симптомов нижних мочевыводящих путей (СНМП),
        чаще всего при доброкачественной гиперплазии предстательной
        железы. Не является диагностическим инструментом для постановки
        диагноза ДГПЖ и не заменяет обследование (пальцевое ректальное
        исследование, ПСА, УЗИ) — используется для оценки выраженности
        симптомов и динамики на фоне лечения.
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Источник: Barry MJ, et
        al. J Urol. 1992;148(5):1549-1557.
        </p>
      </div>

    </div>
  );
}
