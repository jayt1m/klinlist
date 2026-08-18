"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function CorrectedCalciumCalculator() {
  const [calcium, setCalcium] = useState("");
  const [albumin, setAlbumin] = useState("");

  const isValid = calcium !== "" && albumin !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    // Са(корр., ммоль/л) = Са(изм.) + 0.02 × (40 − альбумин(г/л))
    const corrected = Number(calcium) + 0.02 * (40 - Number(albumin));
    return Number(corrected.toFixed(2));
  }, [isValid, calcium, albumin]);

  const resultRef = useScrollToResult(result !== null);
  const high = result !== null && result > 2.6;
  const low = result !== null && result < 2.1;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="corrected-calcium" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Общий кальций (измеренный)" value={calcium} unit="ммоль/л" onChange={setCalcium} />
            <InputWithUnit label="Альбумин" value={albumin} unit="г/л" onChange={setAlbumin} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${high || low ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Скорректированный кальций</div>
              <div className="mt-2 text-5xl font-bold">{result}<span className="ml-2 text-lg font-normal">ммоль/л</span></div>
              <div className="mt-4 text-sm font-semibold">{high ? "Выше нормы (норма 2.1–2.6 ммоль/л)" : low ? "Ниже нормы (норма 2.1–2.6 ммоль/л)" : "В пределах нормы"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Скорректированный Ca (ммоль/л) = измеренный Ca + 0.02 × (40 − альбумин, г/л). Поправка нужна, поскольку около 40% кальция плазмы связано с альбумином — при гипоальбуминемии измеренный общий кальций занижает истинный уровень. При сомнении предпочтителен прямой анализ ионизированного кальция.
        <p className="mt-3 text-xs text-gray-500">
          Источник формулы: Payne RB, et al. Br Med J. 1973;4(5893):643-646.
        </p>
      </div>
    </div>
  );
}
