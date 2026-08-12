"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";

type Grade = "I" | "II" | "III" | "IV";

const grades: {
  grade: Grade;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    grade: "I",
    title: "Класс I",
    description: "Нет признаков сердечной недостаточности.",
    color: "border-emerald-300 bg-emerald-50",
  },
  {
    grade: "II",
    title: "Класс II",
    description:
      "Влажные хрипы в нижних отделах лёгких, третий тон сердца (S3), набухание шейных вен.",
    color: "border-amber-300 bg-amber-50",
  },
  {
    grade: "III",
    title: "Класс III",
    description: "Отёк лёгких (влажные хрипы более чем над 50% лёгочных полей).",
    color: "border-orange-300 bg-orange-50",
  },
  {
    grade: "IV",
    title: "Класс IV",
    description: "Кардиогенный шок (гипотензия, признаки периферической гипоперфузии).",
    color: "border-red-400 bg-red-100",
  },
];

export default function KillipCalculator() {
  const [selected, setSelected] = useState<Grade>("I");

  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">

      <CalculatorHeader calculatorId="killip" />

      <div className="space-y-4">

        {grades.map((g) => (
          <button
            key={g.grade}
            type="button"
            onClick={() => setSelected(g.grade)}
            className={`w-full rounded-2xl border p-6 text-left transition ${
              selected === g.grade
                ? `${g.color} ring-2 ring-blue-500`
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="text-lg font-bold">{g.title}</div>
            <p className="mt-1 text-gray-600">{g.description}</p>
          </button>
        ))}

      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">Выбрано</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">{current.title}</div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
<p>
        Классификация тяжести острой сердечной недостаточности при
        инфаркте миокарда, оцениваемая при поступлении. Является одним
        из компонентов шкалы GRACE.
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Источник: Killip T, Kimball JT. Am
        J Cardiol. 1967;20(4):457-464.
        </p>
      </div>

    </div>
  );
}
