"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function MapBpCalculator() {
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const isValid = sbp !== "" && dbp !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const map = (Number(sbp) + 2 * Number(dbp)) / 3;
    const pulse = Number(sbp) - Number(dbp);
    return { map: Number(map.toFixed(1)), pulse };
  }, [isValid, sbp, dbp]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="map-bp" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Систолическое АД" value={sbp} unit="мм рт.ст." onChange={setSbp} />
            <InputWithUnit label="Диастолическое АД" value={dbp} unit="мм рт.ст." onChange={setDbp} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Среднее артериальное давление (САД)</div>
                <div className="mt-1 text-5xl font-bold text-blue-900">{result.map}<span className="ml-2 text-lg font-normal">мм рт.ст.</span></div>
                <div className="mt-2 text-sm text-blue-900">{result.map < 65 ? "Ниже 65 — критически низкая перфузия органов, целевой уровень при шоке ≥65" : "≥65 — обычный целевой уровень при шоке"}</div>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <div className="text-sm text-blue-700">Пульсовое давление</div>
                <div className="mt-1 text-2xl font-bold text-blue-900">{result.pulse} мм рт.ст.</div>
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
        <p>САД ≈ (систолическое АД + 2 × диастолическое АД) / 3. Отражает среднее давление перфузии органов за сердечный цикл. Целевой уровень при септическом шоке — ≥65 мм рт.ст. Формула приблизительна при выраженной тахикардии (укорачивается диастола) и аортальной недостаточности.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Rhodes A, et al. Surviving Sepsis Campaign. Intensive Care Med. 2017;43(3):304-377.</p>
      </div>
    </div>
  );
}
