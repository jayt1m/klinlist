"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

export default function DukeTreadmillCalculator() {
  const [time, setTime] = useState("");
  const [stDeviation, setStDeviation] = useState("");
  const [angina, setAngina] = useState<"" | "0" | "1" | "2">("");

  const isValid = time !== "" && stDeviation !== "" && angina !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const score = Number(time) - 5 * Number(stDeviation) - 4 * Number(angina);
    return Number(score.toFixed(1));
  }, [isValid, time, stDeviation, angina]);

  const resultRef = useScrollToResult(result !== null);

  const category = result === null ? null : result >= 5 ? "low" : result >= -10 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = category === "low" ? "Низкий риск (~0.25% годовая смертность)" : category === "mid" ? "Умеренный риск (~1.25% годовая смертность)" : "Высокий риск (~5.25% годовая смертность)";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="duke-treadmill" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные (протокол Bruce)</h2>
          <div className="space-y-6">
            <InputWithUnit label="Продолжительность нагрузки" value={time} unit="мин" onChange={setTime} />
            <InputWithUnit label="Максимальная депрессия ST" value={stDeviation} unit="мм" onChange={setStDeviation} />
            <RadioCard label="Индекс стенокардии" value={angina} onChange={(v) => setAngina(v as typeof angina)} columns={1}
              options={[
                { value: "0", label: "Нет стенокардии во время теста" },
                { value: "1", label: "Стенокардия есть, но не ограничивающая тест" },
                { value: "2", label: "Стенокардия — причина остановки теста" },
              ]} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${color === "green" ? "border-emerald-300 bg-emerald-50" : color === "yellow" ? "border-amber-300 bg-amber-50" : "border-red-300 bg-red-50"}`}>
              <div className="text-sm text-gray-600">Duke Treadmill Score</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{label}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Индекс = время нагрузки (мин) − 5 × депрессия ST (мм) − 4 × индекс стенокардии. Валидирован для стандартного протокола Bruce на тредмиле у пациентов с подозрением на стабильную ИБС.
        <p className="mt-3 text-xs text-gray-500">Источник: Mark DB, et al. N Engl J Med. 1991;325(12):849-853.</p>
      </div>
    </div>
  );
}
