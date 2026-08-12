"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

export default function IdealBodyWeightCalculator() {
  const [sex, setSex] = useState<"" | "male" | "female">("");
  const [height, setHeight] = useState("");
  const [actualWeight, setActualWeight] = useState("");

  const isValid = sex !== "" && height !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const heightIn = Number(height) / 2.54;
    const over60 = heightIn - 60;
    const ibw = (sex === "male" ? 50 : 45.5) + 2.3 * Math.max(over60, 0);
    const adjBw = actualWeight !== "" ? ibw + 0.4 * (Number(actualWeight) - ibw) : null;
    return { ibw: Number(ibw.toFixed(1)), adjBw: adjBw !== null ? Number(adjBw.toFixed(1)) : null };
  }, [isValid, sex, height, actualWeight]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="ideal-body-weight" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <RadioCard label="Пол" value={sex} onChange={(v) => setSex(v as typeof sex)} columns={2}
              options={[{ value: "male", label: "Мужской" }, { value: "female", label: "Женский" }]} />
            <InputWithUnit label="Рост" value={height} unit="см" onChange={setHeight} />
            <InputWithUnit label="Фактическая масса тела" value={actualWeight} unit="кг (необязательно)" onChange={setActualWeight} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Идеальная масса тела (формула Девайна)</div>
                <div className="mt-1 text-4xl font-bold text-blue-900">{result.ibw}<span className="ml-2 text-lg font-normal">кг</span></div>
              </div>
              {result.adjBw !== null && (
                <div className="rounded-xl bg-white/70 p-4">
                  <div className="text-sm text-blue-700">Скорректированная масса тела (для дозирования при ожирении)</div>
                  <div className="mt-1 text-2xl font-bold text-blue-900">{result.adjBw} кг</div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Формула Девайна: мужчины 50 + 2.3 × (рост в дюймах − 60); женщины 45.5 + 2.3 × (рост в дюймах − 60). Используется в первую очередь для расчёта доз препаратов (не для оценки «нормального» веса пациента). Скорректированная масса тела = ИМТ + 0.4 × (фактическая масса − ИМТ) применяется при ожирении для дозирования гидрофильных препаратов.
        <p className="mt-3 text-xs text-gray-500">Источник: Devine BJ. Drug Intell Clin Pharm. 1974;8:650-655.</p>
      </div>
    </div>
  );
}
