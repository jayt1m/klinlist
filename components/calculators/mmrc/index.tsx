"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

const grades = [
  { grade: 0, description: "Одышка только при значительной физической нагрузке", color: "border-emerald-300 bg-emerald-50" },
  { grade: 1, description: "Одышка при быстрой ходьбе по ровной поверхности или подъёме на небольшой холм", color: "border-lime-300 bg-lime-50" },
  { grade: 2, description: "Из-за одышки идёт медленнее сверстников на ровной поверхности или останавливается для отдыха при ходьбе в своём темпе", color: "border-amber-300 bg-amber-50" },
  { grade: 3, description: "Останавливается для отдыха через ~100 м или через несколько минут ходьбы по ровной поверхности", color: "border-orange-300 bg-orange-50" },
  { grade: 4, description: "Одышка не позволяет выходить из дома, или появляется при одевании/раздевании", color: "border-red-400 bg-red-100" },
];

export default function MmrcCalculator() {
  const [selected, setSelected] = useState(0);
  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="mmrc" />

      <div className="space-y-4">
        {grades.map((g) => (
          <button key={g.grade} type="button" onClick={() => setSelected(g.grade)}
            className={`w-full rounded-2xl border p-6 text-left transition ${selected === g.grade ? `${g.color} ring-2 ring-blue-500` : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="text-lg font-bold">Степень {g.grade}</div>
            <p className="mt-1 text-gray-600">{g.description}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">mMRC</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">Степень {current.grade}</div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Модифицированная шкала одышки Британского совета медицинских исследований — используется в комплексной оценке ХОБЛ (группы GOLD A–E) и других хронических респираторных заболеваний.
        <p className="mt-3 text-xs text-gray-500">Источник: Fletcher CM, et al. Br Med J. 1959;2(5147):257-266.</p>
      </div>
    </div>
  );
}
