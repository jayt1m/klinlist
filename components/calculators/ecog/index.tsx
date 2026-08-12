"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

const grades: { grade: number; description: string; color: string }[] = [
  { grade: 0, description: "Полностью активен, способен выполнять все действия без ограничений, как до болезни", color: "border-emerald-300 bg-emerald-50" },
  { grade: 1, description: "Ограничен в физически напряжённой деятельности, но может выполнять лёгкую работу (например, работу по дому, офисную)", color: "border-lime-300 bg-lime-50" },
  { grade: 2, description: "Может себя обслуживать, но не способен работать; на ногах более 50% времени бодрствования", color: "border-amber-300 bg-amber-50" },
  { grade: 3, description: "Ограниченное самообслуживание; прикован к постели или креслу более 50% времени бодрствования", color: "border-orange-300 bg-orange-50" },
  { grade: 4, description: "Полностью нетрудоспособен, не может себя обслуживать, полностью прикован к постели или креслу", color: "border-red-400 bg-red-100" },
  { grade: 5, description: "Смерть", color: "border-gray-400 bg-gray-200" },
];

export default function EcogCalculator() {
  const [selected, setSelected] = useState(0);
  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="ecog" />

      <div className="space-y-4">
        {grades.map((g) => (
          <button key={g.grade} type="button" onClick={() => setSelected(g.grade)}
            className={`w-full rounded-2xl border p-6 text-left transition ${selected === g.grade ? `${g.color} ring-2 ring-blue-500` : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="text-lg font-bold">ECOG {g.grade}</div>
            <p className="mt-1 text-gray-600">{g.description}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">Статус по ECOG</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">{current.grade}</div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Оценка общего функционального статуса онкологического пациента — используется для определения переносимости химиотерапии и включения в клинические исследования (обычно требуется ECOG 0–2).
        <p className="mt-3 text-xs text-gray-500">Источник: Oken MM, et al. Am J Clin Oncol. 1982;5(6):649-655.</p>
      </div>
    </div>
  );
}
