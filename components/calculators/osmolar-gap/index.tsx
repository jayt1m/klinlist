"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function OsmolarGapCalculator() {
  const [sodium, setSodium] = useState("");
  const [glucose, setGlucose] = useState("");
  const [urea, setUrea] = useState("");
  const [measured, setMeasured] = useState("");

  const isValid = sodium !== "" && glucose !== "" && urea !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const calculated = 2 * Number(sodium) + Number(glucose) + Number(urea);
    const gap = measured !== "" ? Number(measured) - calculated : null;
    return { calculated: Number(calculated.toFixed(1)), gap: gap !== null ? Number(gap.toFixed(1)) : null };
  }, [isValid, sodium, glucose, urea, measured]);

  const resultRef = useScrollToResult(result !== null);
  const highGap = result?.gap !== null && result !== null && result.gap !== null && result.gap > 10;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="osmolar-gap" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Натрий" value={sodium} unit="ммоль/л" onChange={setSodium} />
            <InputWithUnit label="Глюкоза" value={glucose} unit="ммоль/л" onChange={setGlucose} />
            <InputWithUnit label="Мочевина" value={urea} unit="ммоль/л" onChange={setUrea} />
            <div className="border-t border-zinc-200 pt-4">
              <InputWithUnit label="Измеренная осмоляльность (осмометр)" value={measured} unit="мОсм/кг" onChange={setMeasured} />
              <p className="mt-2 text-xs text-zinc-500">Необязательно — нужно только для расчёта осмолярного интервала.</p>
            </div>
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="space-y-6">
              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
                <div className="text-sm text-blue-700">Расчётная осмолярность</div>
                <div className="mt-2 text-5xl font-bold text-blue-900">{result.calculated}<span className="ml-2 text-lg font-normal">мОсм/л</span></div>
              </div>
              {result.gap !== null && (
                <div className={`rounded-3xl border p-8 ${highGap ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"}`}>
                  <div className="text-sm text-gray-600">Осмолярный интервал</div>
                  <div className="mt-2 text-4xl font-bold">{result.gap}</div>
                  <div className="mt-3 text-sm font-semibold">{highGap ? "Повышен (>10) — заподозрить наличие осмотически активного вещества: этанол, метанол, этиленгликоль, изопропанол, маннитол" : "В пределах нормы (обычно <10)"}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Расчётная осмолярность = 2 × Na⁺ + глюкоза + мочевина (все в ммоль/л). Осмолярный интервал = измеренная осмоляльность − расчётная осмолярность. Повышенный интервал в сочетании с метаболическим ацидозом с высоким анионным интервалом — характерная картина отравления токсичными спиртами (метанол, этиленгликоль), требующая неотложных действий.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Purssell RA, et al. Ann Emerg Med. 2001;38(6):653-659.</p>
      </div>
    </div>
  );
}
