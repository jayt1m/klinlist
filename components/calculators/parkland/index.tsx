"use client";
import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function ParklandCalculator() {
  const [weight, setWeight] = useState("");
  const [tbsa, setTbsa] = useState("");

  const isValid = weight !== "" && tbsa !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const total = 4 * Number(weight) * Number(tbsa);
    return { total: Math.round(total), first8: Math.round(total / 2), next16: Math.round(total / 2), rateFirst8: Math.round(total / 2 / 8) };
  }, [isValid, weight, tbsa]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="parkland" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Площадь ожога (% поверхности тела)" value={tbsa} unit="%" onChange={setTbsa} />
            <p className="text-xs text-zinc-500">Учитываются только ожоги II степени и глубже. Для оценки площади используйте правило девяток.</p>
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="space-y-6">
              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
                <div className="text-sm text-blue-700">Общий объём за первые 24 часа</div>
                <div className="mt-2 text-5xl font-bold text-blue-900">{result.total}<span className="ml-2 text-lg font-normal">мл</span></div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/70 p-4">
                    <div className="text-sm text-blue-700">Первые 8 часов (от момента ожога)</div>
                    <div className="mt-1 text-2xl font-bold text-blue-900">{result.first8} мл</div>
                    <div className="mt-1 text-sm text-blue-700">≈ {result.rateFirst8} мл/ч</div>
                  </div>
                  <div className="rounded-xl bg-white/70 p-4">
                    <div className="text-sm text-blue-700">Следующие 16 часов</div>
                    <div className="mt-1 text-2xl font-bold text-blue-900">{result.next16} мл</div>
                    <div className="mt-1 text-sm text-blue-700">≈ {Math.round(result.next16 / 16)} мл/ч</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                <p>Это стартовая расчётная оценка, а не фиксированное назначение. Реальный объём титруется по диурезу (цель 0.5 мл/кг/ч у взрослых, 1 мл/кг/ч у детей) и показателям гемодинамики. Отсчёт 8 часов ведётся от момента получения ожога, а не от начала инфузии.</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Формула Паркленда: 4 мл × масса тела (кг) × площадь ожога (%) кристаллоидного раствора (обычно раствор Рингера лактат) за первые 24 часа; половина объёма вводится за первые 8 часов от момента травмы, вторая половина — за последующие 16 часов.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Baxter CR, Shires T. Ann N Y Acad Sci. 1968;150(3):874-894.</p>
      </div>
    </div>
  );
}
