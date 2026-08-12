"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

type Grade = "I" | "II" | "III" | "IV";

const grades: { grade: Grade; title: string; description: string; color: string }[] = [
  { grade: "I", title: "Класс I", description: "Заболевание сердца без ограничения физической активности. Обычная нагрузка не вызывает одышку, утомляемость или сердцебиение.", color: "border-emerald-300 bg-emerald-50" },
  { grade: "II", title: "Класс II", description: "Незначительное ограничение физической активности. Комфортно в покое, но обычная нагрузка вызывает симптомы.", color: "border-amber-300 bg-amber-50" },
  { grade: "III", title: "Класс III", description: "Заметное ограничение активности. Комфортно в покое, но нагрузка меньше обычной вызывает симптомы.", color: "border-orange-300 bg-orange-50" },
  { grade: "IV", title: "Класс IV", description: "Невозможность выполнять любую физическую нагрузку без дискомфорта. Симптомы могут быть и в покое.", color: "border-red-400 bg-red-100" },
];

export default function NyhaCalculator() {
  const [selected, setSelected] = useState<Grade>("I");
  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="nyha" />

      <div className="space-y-4">
        {grades.map((g) => (
          <button key={g.grade} type="button" onClick={() => setSelected(g.grade)}
            className={`w-full rounded-2xl border p-6 text-left transition ${selected === g.grade ? `${g.color} ring-2 ring-blue-500` : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="text-lg font-bold">{g.title}</div>
            <p className="mt-1 text-gray-600">{g.description}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">Функциональный класс ХСН</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">{current.title}</div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Классификация Нью-Йоркской кардиологической ассоциации оценивает выраженность симптомов хронической сердечной недостаточности по ограничению физической активности — субъективна и может меняться на фоне лечения.
        <p className="mt-3 text-xs text-gray-500">Источник: The Criteria Committee of the New York Heart Association. Nomenclature and Criteria for Diagnosis of Diseases of the Heart and Great Vessels. 9th ed. 1994.</p>
      </div>
    </div>
  );
}
