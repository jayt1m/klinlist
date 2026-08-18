"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function HyponatremiaCorrectionCalculator() {
  const [weight, setWeight] = useState("");
  const [currentNa, setCurrentNa] = useState("");
  const [infusateNa, setInfusateNa] = useState("");
  const isValid = weight !== "" && currentNa !== "" && infusateNa !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const tbw = 0.6 * Number(weight);
    const change = (Number(infusateNa) - Number(currentNa)) / (tbw + 1);
    const maxPerDay = 8;
    const litersPerDay = change > 0 ? maxPerDay / change : null;
    return { change: Number(change.toFixed(2)), litersPerDay: litersPerDay !== null ? Number(litersPerDay.toFixed(2)) : null };
  }, [isValid, weight, currentNa, infusateNa]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="hyponatremia-correction" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Текущий натрий" value={currentNa} unit="ммоль/л" onChange={setCurrentNa} />
            <InputWithUnit label="Натрий инфузионного раствора" value={infusateNa} unit="ммоль/л" onChange={setInfusateNa} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-amber-300 bg-amber-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-amber-800">Изменение натрия на 1 литр раствора</div>
                <div className="mt-1 text-5xl font-bold text-amber-900">{result.change > 0 ? "+" : ""}{result.change}<span className="ml-2 text-lg font-normal">ммоль/л</span></div>
              </div>
              {result.litersPerDay !== null && (
                <div className="rounded-xl bg-white/70 p-4">
                  <div className="text-sm text-amber-800">Объём для безопасного прироста 8 ммоль/л за сутки</div>
                  <div className="mt-1 text-2xl font-bold text-amber-900">≈ {result.litersPerDay} л/сут</div>
                </div>
              )}
              <p className="text-sm leading-6 text-amber-900">Расчёт ориентировочный: формула Адрогé-Мадиаса не учитывает продолжающиеся потери. Скорость коррекции не должна превышать 8–10 ммоль/л за 24 часа (при хронической гипонатриемии и высоком риске осмотической демиелинизации — не более 8 ммоль/л). Обязателен контроль натрия каждые 2–4 часа.</p>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Формула Адрогé-Мадиаса: изменение Na⁺ = (Na⁺ раствора − Na⁺ плазмы) / (общая вода тела + 1). Общая вода тела принята как 0.6 × масса тела. Слишком быстрая коррекция хронической гипонатриемии может вызвать синдром осмотической демиелинизации — необратимое неврологическое осложнение.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Adrogué HJ, Madias NE. N Engl J Med. 2000;342(21):1581-1589.</p>
      </div>
    </div>
  );
}
