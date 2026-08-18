"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";

const grades = [
  { v: 5, t: "Нормальная сила", d: "Полный объём движений против силы тяжести и максимального сопротивления", c: "border-emerald-300 bg-emerald-50" },
  { v: 4, t: "Снижена", d: "Полный объём движений против силы тяжести и некоторого сопротивления", c: "border-lime-300 bg-lime-50" },
  { v: 3, t: "Умеренно снижена", d: "Полный объём движений против силы тяжести, но не против сопротивления", c: "border-amber-300 bg-amber-50" },
  { v: 2, t: "Выраженно снижена", d: "Движения возможны только при устранении силы тяжести", c: "border-orange-300 bg-orange-50" },
  { v: 1, t: "Следы сокращений", d: "Видимые или пальпируемые сокращения без движения в суставе", c: "border-red-300 bg-red-50" },
  { v: 0, t: "Паралич", d: "Сокращения отсутствуют", c: "border-red-400 bg-red-100" },
];

export default function MrcMuscleCalculator() {
  const [selected, setSelected] = useState(5);
  const current = grades.find((g) => g.v === selected)!;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <CalculatorHeader calculatorId="mrc-muscle" />
      <div className="space-y-3">
        {grades.map((g) => (
          <button key={g.v} type="button" onClick={() => setSelected(g.v)}
            className={`w-full rounded-2xl border p-5 text-left transition ${selected === g.v ? `${g.c} ring-2 ring-blue-500` : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">{g.v}</span>
              <span className="text-lg font-bold">{g.t}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{g.d}</p>
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <div className="text-sm font-medium text-blue-700">Сила мышц по шкале MRC</div>
        <div className="mt-1 text-2xl font-bold text-blue-900">{current.v} баллов — {current.t}</div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Шкала Совета медицинских исследований Великобритании — стандарт оценки мышечной силы отдельной мышечной группы. Оценивается каждая группа мышц отдельно с обеих сторон. Суммарная оценка по 12 группам (MRC sum score, максимум 60 баллов) используется для диагностики полинейромиопатии критических состояний — значение &lt;48 баллов является диагностическим порогом.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Medical Research Council. Aids to the examination of the peripheral nervous system. London: HMSO, 1976.</p>
      </div>
    </div>
  );
}
