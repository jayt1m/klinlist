"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";

type Grade = "I" | "II" | "III" | "IV" | "V";

const grades: {
  grade: Grade;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    grade: "I",
    title: "Степень I",
    description:
      "Бессимптомно либо минимальная головная боль и лёгкая ригидность затылочных мышц.",
    color: "border-emerald-300 bg-emerald-50",
  },
  {
    grade: "II",
    title: "Степень II",
    description:
      "Умеренная или сильная головная боль, ригидность затылочных мышц, без неврологического дефицита, кроме пареза черепных нервов.",
    color: "border-emerald-300 bg-emerald-50",
  },
  {
    grade: "III",
    title: "Степень III",
    description:
      "Сонливость, спутанность сознания и/или лёгкий очаговый неврологический дефицит.",
    color: "border-amber-300 bg-amber-50",
  },
  {
    grade: "IV",
    title: "Степень IV",
    description:
      "Сопор, умеренный или выраженный гемипарез, возможны ранние децеребрационные явления.",
    color: "border-red-300 bg-red-50",
  },
  {
    grade: "V",
    title: "Степень V",
    description: "Глубокая кома, децеребрационная ригидность.",
    color: "border-red-400 bg-red-100",
  },
];

export default function HuntHessCalculator() {
  const [selected, setSelected] = useState<Grade>("I");

  const current = grades.find((g) => g.grade === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">

      <CalculatorHeader calculatorId="hunt-hess" />

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
        <div className="mt-1 text-2xl font-bold text-blue-900">
          {current.title}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Шкала используется для оценки тяжести состояния при
          субарахноидальном кровоизлиянии и определения хирургической
          тактики: степени I–III обычно рассматриваются для раннего
          вмешательства (клипирование/эмболизация аневризмы), при
          IV–V решение принимается индивидуально с учётом общего
          прогноза. Наряду с Hunt-Hess в современной практике часто
          параллельно используется шкала WFNS, основанная на ШКГ и
          наличии очагового дефицита.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Hunt WE, Hess RM. J Neurosurg. 1968;28(1):14-20.
        </p>
      </div>

    </div>
  );
}
