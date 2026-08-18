"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function CaroIndexCalculator() {
  const [glucose, setGlucose] = useState("");
  const [insulin, setInsulin] = useState("");
  const isValid = glucose !== "" && insulin !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const v = Number(glucose) / Number(insulin);
    return Number(v.toFixed(2));
  }, [isValid, glucose, insulin]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="caro-index" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Глюкоза натощак" value={glucose} unit="ммоль/л" onChange={setGlucose} />
            <InputWithUnit label="Инсулин натощак" value={insulin} unit="мкЕд/мл" onChange={setInsulin} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${result < 0.33 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Индекс Caro</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{result < 0.33 ? "<0.33 — признак инсулинорезистентности" : "≥0.33 — инсулинорезистентность маловероятна"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Индекс Caro = глюкоза натощак (ммоль/л) / инсулин натощак (мкЕд/мл). Значение &lt;0.33 указывает на инсулинорезистентность. Используется наряду с HOMA-IR; референсные значения могут различаться между лабораториями в зависимости от метода определения инсулина.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Caro JF. J Clin Endocrinol Metab. 1991;73(4):691-695.</p>
      </div>
    </div>
  );
}
