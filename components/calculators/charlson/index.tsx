"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const conditions1: { key: string; title: string }[] = [
  { key: "mi", title: "Инфаркт миокарда в анамнезе" },
  { key: "chf", title: "Хроническая сердечная недостаточность" },
  { key: "pvd", title: "Заболевание периферических артерий" },
  { key: "cvd", title: "Цереброваскулярное заболевание (инсульт/ТИА)" },
  { key: "dementia", title: "Деменция" },
  { key: "copd", title: "Хроническое заболевание лёгких" },
  { key: "rheumatic", title: "Ревматическое заболевание" },
  { key: "ulcer", title: "Язвенная болезнь" },
  { key: "liverMild", title: "Лёгкое заболевание печени" },
  { key: "diabetes", title: "Сахарный диабет без осложнений" },
];

const conditions2: { key: string; title: string }[] = [
  { key: "hemiplegia", title: "Гемиплегия/параплегия" },
  { key: "renal", title: "Умеренное/тяжёлое заболевание почек" },
  { key: "diabetesComp", title: "Сахарный диабет с осложнениями" },
  { key: "malignancy", title: "Злокачественное новообразование (без метастазов)" },
];

const conditions3: { key: string; title: string }[] = [
  { key: "liverSevere", title: "Умеренное/тяжёлое заболевание печени" },
];

const conditions6: { key: string; title: string }[] = [
  { key: "metastatic", title: "Метастатическая солидная опухоль" },
  { key: "aids", title: "СПИД" },
];

export default function CharlsonCalculator() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ageBand, setAgeBand] = useState("0");

  function toggle(key: string) {
    setChecked((p) => ({ ...p, [key]: !p[key] }));
  }

  const conditionScore =
    conditions1.filter((c) => checked[c.key]).length * 1 +
    conditions2.filter((c) => checked[c.key]).length * 2 +
    conditions3.filter((c) => checked[c.key]).length * 3 +
    conditions6.filter((c) => checked[c.key]).length * 6;

  const score = conditionScore + Number(ageBand);

  const survival10y = Math.round(0.983 ** Math.exp(score * 0.9) * 100 * 10) / 10;

  const color = score === 0 ? "green" : score <= 2 ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="charlson" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <RadioCard label="Возраст" value={ageBand} onChange={setAgeBand}
              options={[
                { value: "0", label: "<50 лет" }, { value: "1", label: "50–59" },
                { value: "2", label: "60–69" }, { value: "3", label: "70–79" }, { value: "4", label: "≥80" },
              ]} columns={3} />
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">1 балл</h2>
            <div className="space-y-3">
              {conditions1.map((c) => (
                <CheckboxCard key={c.key} title={c.title} points={1} checked={!!checked[c.key]} onChange={() => toggle(c.key)} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">2 балла</h2>
            <div className="space-y-3">
              {conditions2.map((c) => (
                <CheckboxCard key={c.key} title={c.title} points={2} checked={!!checked[c.key]} onChange={() => toggle(c.key)} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">3 балла</h2>
            <div className="space-y-3">
              {conditions3.map((c) => (
                <CheckboxCard key={c.key} title={c.title} points={3} checked={!!checked[c.key]} onChange={() => toggle(c.key)} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">6 баллов</h2>
            <div className="space-y-3">
              {conditions6.map((c) => (
                <CheckboxCard key={c.key} title={c.title} points={6} checked={!!checked[c.key]} onChange={() => toggle(c.key)} />
              ))}
            </div>
          </div>
        </div>

        <ResultCard score={score} unit="баллов" title="Индекс коморбидности Charlson" recommendation={`Ориентировочная 10-летняя выживаемость: ~${survival10y}%`} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Взвешенный индекс тяжести и количества сопутствующих заболеваний, широко используется для прогноза и корректировки риска в исследованиях. Оценка выживаемости — ориентировочная, по исходной публикации.
        <p className="mt-3 text-xs text-gray-500">Источник: Charlson ME, et al. J Chronic Dis. 1987;40(5):373-383.</p>
      </div>
    </div>
  );
}
