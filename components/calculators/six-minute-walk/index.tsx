"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function SixMinuteWalkCalculator() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const isValid = age !== "" && height !== "" && weight !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const a = Number(age), h = Number(height), w = Number(weight);
    const male = 7.57 * h - 5.02 * a - 1.76 * w - 309;
    const female = 2.11 * h - 2.29 * w - 5.78 * a + 667;
    return { male: Math.round(male), female: Math.round(female) };
  }, [isValid, age, height, weight]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="six-minute-walk" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Возраст" value={age} unit="лет" onChange={setAge} />
            <InputWithUnit label="Рост" value={height} unit="см" onChange={setHeight} />
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Должная дистанция — мужчины</div>
                <div className="mt-1 text-4xl font-bold text-blue-900">{result.male}<span className="ml-2 text-lg font-normal">м</span></div>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <div className="text-sm text-blue-700">Должная дистанция — женщины</div>
                <div className="mt-1 text-3xl font-bold text-blue-900">{result.female} м</div>
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
        <p>Формулы Энрайта-Шеррилла для расчёта должной дистанции 6-минутного теста ходьбы у здоровых взрослых. Реальная пройденная дистанция сравнивается с должной для оценки функционального статуса при ХОБЛ, лёгочной гипертензии, сердечной недостаточности. Клинически значимым изменением при повторном тестировании обычно считают 30 метров.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Enright PL, Sherrill DL. Am J Respir Crit Care Med. 1998;158(5):1384-1387.</p>
      </div>
    </div>
  );
}
