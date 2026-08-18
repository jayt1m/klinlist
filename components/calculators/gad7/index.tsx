"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const freqOptions = [
  { value: "0", label: "Совсем нет" }, { value: "1", label: "Несколько дней" },
  { value: "2", label: "Более половины дней" }, { value: "3", label: "Почти каждый день" },
];

const items = [
  "Нервозность, тревога или ощущение взвинченности",
  "Неспособность остановить или контролировать беспокойство",
  "Чрезмерное беспокойство по разным поводам",
  "Трудности с расслаблением",
  "Такое сильное беспокойство, что трудно усидеть на месте",
  "Раздражительность или вспыльчивость",
  "Чувство страха, будто может произойти что-то ужасное",
];

export default function Gad7Calculator() {
  const [values, setValues] = useState<string[]>(Array(7).fill("0"));
  const score = values.reduce((s, v) => s + Number(v), 0);
  const category = score <= 4 ? "minimal" : score <= 9 ? "mild" : score <= 14 ? "moderate" : "severe";
  const color = category === "minimal" || category === "mild" ? "green" : category === "moderate" ? "yellow" : "red";
  const label = { minimal: "Минимальная тревога", mild: "Лёгкая тревога", moderate: "Умеренная тревога", severe: "Тяжёлая тревога" }[category];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="gad7" />
      <p className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">За последние 2 недели, как часто вас беспокоило что-либо из перечисленного?</p>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          {items.map((label, i) => (
            <RadioCard key={i} label={label} value={values[i]} columns={2} options={freqOptions}
              onChange={(v) => setValues((p) => { const n = [...p]; n[i] = v; return n; })} />
          ))}
        </div>
        <ResultCard score={score} unit="из 21" title="GAD-7" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Скрининговый инструмент для оценки выраженности генерализованного тревожного расстройства, не заменяет клиническую диагностику. Балл ≥10 обычно рассматривается как порог для дальнейшей оценки.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Spitzer RL, Kroenke K, Williams JBW, Löwe B. Arch Intern Med. 2006;166(10):1092-1097.</p>
      </div>
    </div>
  );
}
