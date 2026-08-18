"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function TygIndexCalculator() {
  const [triglycerides, setTriglycerides] = useState("");
  const [glucose, setGlucose] = useState("");
  const isValid = triglycerides !== "" && glucose !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const tgMgDl = Number(triglycerides) * 88.57;
    const gluMgDl = Number(glucose) * 18.016;
    const v = Math.log((tgMgDl * gluMgDl) / 2);
    return Number(v.toFixed(2));
  }, [isValid, triglycerides, glucose]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="tyg-index" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Триглицериды" value={triglycerides} unit="ммоль/л" onChange={setTriglycerides} />
            <InputWithUnit label="Глюкоза натощак" value={glucose} unit="ммоль/л" onChange={setGlucose} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${result >= 8.8 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Индекс TyG</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{result >= 8.8 ? "Повышен — вероятна инсулинорезистентность" : "В пределах нормы"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>TyG = ln[триглицериды (мг/дл) × глюкоза натощак (мг/дл) / 2]. Простой суррогатный маркер инсулинорезистентности, не требующий определения инсулина — удобен там, где анализ на инсулин недоступен. Пороговые значения варьируют между популяциями (чаще всего используется диапазон 8.5–8.8).</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Simental-Mendía LE, et al. Metab Syndr Relat Disord. 2008;6(4):299-304.</p>
      </div>
    </div>
  );
}
