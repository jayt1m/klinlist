"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function CorrectedSodiumCalculator() {
  const [sodium, setSodium] = useState("");
  const [glucose, setGlucose] = useState("");

  const isValid = sodium !== "" && glucose !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    // Na(корр.) = Na(изм.) + 1.6 × (глюкоза − 5.5) / 5.5, глюкоза в ммоль/л
    const corrected = Number(sodium) + 1.6 * ((Number(glucose) - 5.5) / 5.5);
    return Number(corrected.toFixed(1));
  }, [isValid, sodium, glucose]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="corrected-sodium" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Натрий (измеренный)" value={sodium} unit="ммоль/л" onChange={setSodium} />
            <InputWithUnit label="Глюкоза плазмы" value={glucose} unit="ммоль/л" onChange={setGlucose} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
              <div className="text-sm text-blue-700">Скорректированный натрий</div>
              <div className="mt-2 text-5xl font-bold text-blue-900">{result}<span className="ml-2 text-lg font-normal">ммоль/л</span></div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Скорректированный Na (ммоль/л) = измеренный Na + 1.6 × (глюкоза − 5.5) / 5.5 (глюкоза в ммоль/л). Выраженная гипергликемия вызывает осмотический выход воды из клеток, разбавляя измеренный натрий — истинный дефицит воды может быть замаскирован. Некоторые источники используют коэффициент 2.4 при очень высокой гликемии.
      </div>
    </div>
  );
}
