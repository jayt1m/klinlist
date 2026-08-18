"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function PackYearsCalculator() {
  const [cigsPerDay, setCigsPerDay] = useState("");
  const [years, setYears] = useState("");
  const isValid = cigsPerDay !== "" && years !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const v = (Number(cigsPerDay) / 20) * Number(years);
    return Number(v.toFixed(1));
  }, [isValid, cigsPerDay, years]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="pack-years" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Сигарет в день" value={cigsPerDay} unit="шт" onChange={setCigsPerDay} />
            <InputWithUnit label="Стаж курения" value={years} unit="лет" onChange={setYears} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${result >= 30 ? "border-red-300 bg-red-50" : result >= 10 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Индекс курящего человека</div>
              <div className="mt-2 text-5xl font-bold">{result}<span className="ml-2 text-lg font-normal">пачка/лет</span></div>
              <div className="mt-4 text-sm font-semibold">{result >= 30 ? "≥30 — очень высокий риск ХОБЛ и рака лёгкого; кандидат на скрининг рака лёгкого" : result >= 10 ? "≥10 — существенный риск, ХОБЛ вероятна при наличии симптомов" : "Относительно небольшая экспозиция"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Индекс = (число сигарет в день / 20) × стаж курения в годах. Показатель ≥10 пачка/лет ассоциирован с существенным риском ХОБЛ, ≥30 пачка/лет входит в критерии отбора для низкодозовой КТ-скрининга рака лёгкого у лиц 50–80 лет.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: US Preventive Services Task Force. JAMA. 2021;325(10):962-970.</p>
      </div>
    </div>
  );
}
