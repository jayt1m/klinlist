"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function ApgarCalculator() {
  const [heartRate, setHeartRate] = useState("0");
  const [breathing, setBreathing] = useState("0");
  const [tone, setTone] = useState("0");
  const [reflex, setReflex] = useState("0");
  const [color, setColor] = useState("0");

  const score =
    Number(heartRate) + Number(breathing) + Number(tone) + Number(reflex) + Number(color);

  const category = score >= 7 ? "good" : score >= 4 ? "moderate" : "low";
  const cardColor = category === "good" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "good"
      ? "Норма"
      : category === "moderate"
        ? "Умеренное угнетение — требуется наблюдение/стимуляция"
        : "Выраженное угнетение — требуется реанимационное пособие";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="apgar" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard
            label="Частота сердечных сокращений"
            value={heartRate}
            onChange={setHeartRate}
            options={[
              { value: "0", label: "Отсутствует" },
              { value: "1", label: "<100 в минуту" },
              { value: "2", label: "≥100 в минуту" },
            ]}
          />

          <RadioCard
            label="Дыхание"
            value={breathing}
            onChange={setBreathing}
            options={[
              { value: "0", label: "Отсутствует" },
              { value: "1", label: "Слабое, нерегулярное" },
              { value: "2", label: "Хороший крик" },
            ]}
          />

          <RadioCard
            label="Мышечный тонус"
            value={tone}
            onChange={setTone}
            options={[
              { value: "0", label: "Вялый" },
              { value: "1", label: "Некоторое сгибание конечностей" },
              { value: "2", label: "Активные движения" },
            ]}
          />

          <RadioCard
            label="Рефлекторная возбудимость"
            value={reflex}
            onChange={setReflex}
            options={[
              { value: "0", label: "Отсутствует" },
              { value: "1", label: "Гримаса" },
              { value: "2", label: "Крик, кашель, чихание" },
            ]}
          />

          <RadioCard
            label="Окраска кожи"
            value={color}
            onChange={setColor}
            options={[
              { value: "0", label: "Синюшность/бледность" },
              { value: "1", label: "Акроцианоз" },
              { value: "2", label: "Розовая" },
            ]}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 10"
          title="Шкала Апгар"
          recommendation={label}
          color={cardColor}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Оценивается на 1-й и 5-й минуте после рождения; при сумме
          &lt;7 баллов на 5-й минуте оценку повторяют каждые 5 минут
          до 20-й минуты или до стабилизации. Низкий балл на 1-й
          минуте отражает состояние при рождении и требует
          реанимационных мероприятий по протоколу, а не ожидания
          следующей оценки — решения о реанимации новорождённого
          принимаются по клинической картине (дыхание, ЧСС, тонус) в
          реальном времени, а не по итоговому баллу.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Apgar V. Curr Res Anesth Analg.
          1953;32(4):260-267.
        </p>
      </div>

    </div>
  );
}
