"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

const grades: { grade: string; description: string; color: string }[] = [
  { grade: "I", description: "Полностью видны мягкое нёбо, зев, язычок, передние и задние нёбные дужки", color: "border-emerald-300 bg-emerald-50" },
  { grade: "II", description: "Видны мягкое нёбо, зев, язычок", color: "border-lime-300 bg-lime-50" },
  { grade: "III", description: "Видны мягкое нёбо и основание язычка", color: "border-amber-300 bg-amber-50" },
  { grade: "IV", description: "Видно только твёрдое нёбо, мягкое нёбо не визуализируется", color: "border-red-400 bg-red-100" },
];

export default function MallampatiCalculator() {
  const [selected, setSelected] = useState("I");
  const current = grades.find((g) => g.grade === selected)!;
  const difficult = selected === "III" || selected === "IV";

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="mallampati" />

      <div className="space-y-4">
        {grades.map((g) => (
          <button key={g.grade} type="button" onClick={() => setSelected(g.grade)}
            className={`w-full rounded-2xl border p-6 text-left transition ${selected === g.grade ? `${g.color} ring-2 ring-blue-500` : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="text-lg font-bold">Класс {g.grade}</div>
            <p className="mt-1 text-gray-600">{g.description}</p>
          </button>
        ))}
      </div>

      <div className={`rounded-3xl border p-6 ${difficult ? "border-amber-300 bg-amber-50" : "border-blue-200 bg-blue-50"}`}>
        <div className="text-sm font-medium">Класс Маллампати</div>
        <div className="mt-1 text-2xl font-bold">{current.grade}</div>
        {difficult && <p className="mt-2 text-sm text-amber-900">Ассоциирован с повышенной вероятностью трудной интубации — рассмотреть дополнительную оценку дыхательных путей и план на случай трудной интубации.</p>}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Оценивается визуально при максимальном открытии рта в положении сидя, язык высунут, без фонации. Один из компонентов комплексной предоперационной оценки дыхательных путей — сам по себе обладает ограниченной предсказательной ценностью.
        <p className="mt-3 text-xs text-gray-500">Источник: Mallampati SR, et al. Can Anaesth Soc J. 1985;32(4):429-434. Samsoon GL, Young JR. Anaesthesia. 1987;42(5):487-490.</p>
      </div>
    </div>
  );
}
