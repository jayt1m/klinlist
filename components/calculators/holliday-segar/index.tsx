"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function HollidaySegarCalculator() {
  const [weight, setWeight] = useState("");
  const isValid = weight !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const w = Number(weight);
    let perDay = 0;
    if (w <= 10) perDay = w * 100;
    else if (w <= 20) perDay = 1000 + (w - 10) * 50;
    else perDay = 1500 + (w - 20) * 20;
    return { perDay: Math.round(perDay), perHour: Math.round(perDay / 24) };
  }, [isValid, weight]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="holliday-segar" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <InputWithUnit label="Масса тела ребёнка" value={weight} unit="кг" onChange={setWeight} />
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Поддерживающая потребность в жидкости</div>
                <div className="mt-1 text-5xl font-bold text-blue-900">{result.perDay}<span className="ml-2 text-lg font-normal">мл/сут</span></div>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <div className="text-sm text-blue-700">Скорость инфузии</div>
                <div className="mt-1 text-2xl font-bold text-blue-900">{result.perHour} мл/ч</div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Укажите массу тела</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Правило Холлидея-Сегара («4-2-1»): 100 мл/кг на первые 10 кг + 50 мл/кг на вторые 10 кг + 20 мл/кг на каждый последующий кг за сутки; в пересчёте на час — 4-2-1 мл/кг/ч. Это поддерживающая потребность, которая НЕ включает восполнение дефицита при обезвоживании и текущие патологические потери (рвота, диарея, дренажи, лихорадка) — их рассчитывают дополнительно.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Holliday MA, Segar WE. Pediatrics. 1957;19(5):823-832.</p>
      </div>
    </div>
  );
}
