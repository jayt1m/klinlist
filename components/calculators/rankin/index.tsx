"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

const grades: { grade: number; description: string; color: string }[] = [
  { grade: 0, description: "Нет симптомов", color: "border-emerald-300 bg-emerald-50" },
  { grade: 1, description: "Отсутствие существенных нарушений жизнедеятельности, несмотря на симптомы: способен выполнять все обычные обязанности и виды деятельности", color: "border-emerald-300 bg-emerald-50" },
  { grade: 2, description: "Лёгкое нарушение: не способен выполнять все прежние виды деятельности, но справляется с собственными делами без посторонней помощи", color: "border-lime-300 bg-lime-50" },
  { grade: 3, description: "Умеренное нарушение: требуется некоторая помощь, но способен ходить самостоятельно", color: "border-amber-300 bg-amber-50" },
  { grade: 4, description: "Умеренно тяжёлое нарушение: не способен ходить и справляться с физическими потребностями без посторонней помощи", color: "border-orange-300 bg-orange-50" },
  { grade: 5, description: "Тяжёлое нарушение: прикован к постели, недержание, требует постоянного ухода", color: "border-red-400 bg-red-100" },
  { grade: 6, description: "Смерть", color: "border-gray-400 bg-gray-200" },
];

export default function RankinCalculator() {
  const [selected, setSelected] = useState(0);
  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="rankin" />

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
        <div className="text-sm font-medium text-blue-700">Модифицированная шкала Рэнкина</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">Степень {current.grade}</div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Оценивает степень инвалидизации/зависимости после инсульта и других неврологических событий. Широко используется как основная конечная точка в исследованиях по инсульту (0–2 обычно расценивается как благоприятный исход).
        <p className="mt-3 text-xs text-gray-500">Источник: van Swieten JC, et al. Stroke. 1988;19(5):604-607.</p>
      </div>
    </div>
  );
}
