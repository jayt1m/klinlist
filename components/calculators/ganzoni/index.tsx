"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function GanzoniCalculator() {
  const [weight, setWeight] = useState("");
  const [currentHb, setCurrentHb] = useState("");
  const [targetHb, setTargetHb] = useState("");
  const isValid = weight !== "" && currentHb !== "" && targetHb !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const w = Number(weight);
    const deficit = w * (Number(targetHb) - Number(currentHb)) * 0.24 + (w < 35 ? 15 * w : 500);
    return Math.round(deficit);
  }, [isValid, weight, currentHb, targetHb]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="ganzoni" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Текущий гемоглобин" value={currentHb} unit="г/л" onChange={setCurrentHb} />
            <InputWithUnit label="Целевой гемоглобин" value={targetHb} unit="г/л" onChange={setTargetHb} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
              <div className="text-sm text-blue-700">Общий дефицит железа</div>
              <div className="mt-2 text-5xl font-bold text-blue-900">{result}<span className="ml-2 text-lg font-normal">мг</span></div>
              <p className="mt-4 text-sm text-blue-900">Это расчётная потребность в элементарном железе для полного восполнения дефицита, включая пополнение депо. Конкретный препарат, разовая доза и режим введения определяются инструкцией к препарату и клинической ситуацией.</p>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Формула Ганзони: дефицит железа (мг) = масса тела (кг) × (целевой Hb − текущий Hb, г/л) × 0.24 + запас железа депо (500 мг при массе ≥35 кг, 15 мг/кг при массе &lt;35 кг). Применяется для расчёта курсовой дозы парентеральных препаратов железа. Целевой гемоглобин обычно принимают за 150 г/л у взрослых.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Ganzoni AM. Schweiz Med Wochenschr. 1970;100(7):301-303.</p>
      </div>
    </div>
  );
}
