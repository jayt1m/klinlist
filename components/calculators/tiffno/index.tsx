"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function TiffnoCalculator() {
  const [fev1, setFev1] = useState("");
  const [fvc, setFvc] = useState("");
  const isValid = fev1 !== "" && fvc !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const v = (Number(fev1) / Number(fvc)) * 100;
    return Number(v.toFixed(1));
  }, [isValid, fev1, fvc]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="tiffno" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="ОФВ1 (объём форсированного выдоха за 1 сек)" value={fev1} unit="л" onChange={setFev1} />
            <InputWithUnit label="ФЖЕЛ (форсированная жизненная ёмкость лёгких)" value={fvc} unit="л" onChange={setFvc} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${result < 70 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Индекс Тиффно (ОФВ1/ФЖЕЛ)</div>
              <div className="mt-2 text-5xl font-bold">{result}<span className="ml-2 text-lg font-normal">%</span></div>
              <div className="mt-4 text-sm font-semibold">{result < 70 ? "<70% — признак бронхиальной обструкции" : "≥70% — обструкции нет"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Индекс Тиффно = ОФВ1 / ФЖЕЛ × 100%. Значение &lt;70% после применения бронхолитика — критерий стойкой бронхиальной обструкции и один из ключевых критериев диагностики ХОБЛ. У пожилых возможна гипердиагностика при фиксированном пороге 70% — предпочтительно использовать нижнюю границу нормы (LLN) с учётом возраста, пола и роста.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Global Initiative for Chronic Obstructive Lung Disease (GOLD), 2024 Report.</p>
      </div>
    </div>
  );
}
