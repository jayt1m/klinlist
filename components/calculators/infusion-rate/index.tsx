"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function InfusionRateCalculator() {
  const [volume, setVolume] = useState("");
  const [time, setTime] = useState("");
  const [dropFactor, setDropFactor] = useState("");
  const isValid = volume !== "" && time !== "" && dropFactor !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const mlPerHour = Number(volume) / Number(time);
    const dropsPerMin = (mlPerHour * Number(dropFactor)) / 60;
    return { mlPerHour: Number(mlPerHour.toFixed(1)), dropsPerMin: Math.round(dropsPerMin) };
  }, [isValid, volume, time, dropFactor]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="infusion-rate" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Объём раствора" value={volume} unit="мл" onChange={setVolume} />
            <InputWithUnit label="Время введения" value={time} unit="часов" onChange={setTime} />
            <InputWithUnit label="Капельный фактор системы" value={dropFactor} unit="кап/мл" onChange={setDropFactor} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Скорость в каплях</div>
                <div className="mt-1 text-5xl font-bold text-blue-900">{result.dropsPerMin}<span className="ml-2 text-lg font-normal">кап/мин</span></div>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <div className="text-sm text-blue-700">Скорость в мл/ч (для инфузомата)</div>
                <div className="mt-1 text-2xl font-bold text-blue-900">{result.mlPerHour} мл/ч</div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Скорость (кап/мин) = объём (мл) × капельный фактор (кап/мл) / время (мин). Капельный фактор указан на упаковке системы: стандартные системы для взрослых обычно 20 кап/мл (макрокапельные), педиатрические/микрокапельные — 60 кап/мл.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: стандартные расчёты инфузионной терапии.</p>
      </div>
    </div>
  );
}
