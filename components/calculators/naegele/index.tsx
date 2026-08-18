"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";

function formatDate(d: Date) {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function NaegeleCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const result = useMemo(() => {
    if (!lmp) return null;
    const lmpDate = new Date(lmp + "T00:00:00");
    if (isNaN(lmpDate.getTime())) return null;

    const cycleAdjustment = (Number(cycleLength) || 28) - 28;

    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280 + cycleAdjustment);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - lmpDate.getTime()) / 86400000);
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    return { dueDate, weeks, days, diffDays };
  }, [lmp, cycleLength]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="naegele" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Дата последней менструации</label>
              <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Длина цикла, дней</label>
              <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Предполагаемая дата родов</div>
                <div className="mt-1 text-3xl font-bold text-blue-900">{formatDate(result.dueDate)}</div>
              </div>
              {result.diffDays >= 0 && result.diffDays <= 300 && (
                <div className="rounded-xl bg-white/70 p-4">
                  <div className="text-sm text-blue-700">Текущий срок беременности</div>
                  <div className="mt-1 text-2xl font-bold text-blue-900">{result.weeks} нед {result.days} дн</div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Укажите дату последней менструации</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Правило Негеле: ПДР = дата последней менструации + 280 дней (40 недель), с поправкой на отклонение длины цикла от стандартных 28 дней. Точность зависит от регулярности цикла — при известном сроке по УЗИ в I триместре предпочтительнее ультразвуковая оценка.
        <p className="mt-3 text-xs text-gray-500">
          Источник: Naegele FK, 1812. Современные рекомендации по определению срока — ACOG Committee Opinion No. 700, 2017.
        </p>
      </div>
    </div>
  );
}
