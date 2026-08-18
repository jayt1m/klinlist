"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

const risks = ["10%", "21%", "39%", "61%", "79%"];

export default function ApfelCalculator() {
  const [female, setFemale] = useState(false);
  const [nonSmoker, setNonSmoker] = useState(false);
  const [priorPonv, setPriorPonv] = useState(false);
  const [opioids, setOpioids] = useState(false);

  const score = [female, nonSmoker, priorPonv, opioids].filter(Boolean).length;
  const color = score <= 1 ? "green" : score === 2 ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="apfel" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
          <CheckboxCard title="Женский пол" points={1} checked={female} onChange={() => setFemale(!female)} />
          <CheckboxCard title="Некурящий" points={1} checked={nonSmoker} onChange={() => setNonSmoker(!nonSmoker)} />
          <CheckboxCard title="ПОТР или укачивание в анамнезе" points={1} checked={priorPonv} onChange={() => setPriorPonv(!priorPonv)} />
          <CheckboxCard title="Планируется применение опиоидов в послеоперационном периоде" points={1} checked={opioids} onChange={() => setOpioids(!opioids)} />
        </div>
        <ResultCard score={score} unit="из 4" title="Шкала Apfel" recommendation={`Риск послеоперационной тошноты и рвоты: ~${risks[score]}`} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Прогноз риска послеоперационной тошноты и рвоты (ПОТР) в первые 24 часа. Используется для выбора профилактики: при 0–1 факторе профилактика обычно не требуется, при 2 факторах применяют 1–2 препарата, при 3–4 — многокомпонентную профилактику и рассмотрение тотальной внутривенной анестезии вместо ингаляционной.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Apfel CC, et al. Anesthesiology. 1999;91(3):693-700.</p>
      </div>
    </div>
  );
}
