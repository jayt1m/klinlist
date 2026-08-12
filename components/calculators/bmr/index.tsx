"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

const activityOptions = [
  { value: "1.2", label: "Минимальная", description: "Сидячий образ жизни" },
  { value: "1.375", label: "Низкая", description: "Лёгкая активность 1–3 дня/нед" },
  { value: "1.55", label: "Умеренная", description: "Активность 3–5 дней/нед" },
  { value: "1.725", label: "Высокая", description: "Активность 6–7 дней/нед" },
  { value: "1.9", label: "Очень высокая", description: "Физический труд/спорт ежедневно" },
];

export default function BmrCalculator() {
  const [sex, setSex] = useState<"" | "male" | "female">("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");

  const isValid = sex !== "" && age !== "" && weight !== "" && height !== "" && activity !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const base = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
    const bmr = sex === "male" ? base + 5 : base - 161;
    const tdee = bmr * Number(activity);
    return { bmr: Math.round(bmr), tdee: Math.round(tdee) };
  }, [isValid, sex, age, weight, height, activity]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="bmr" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <RadioCard label="Пол" value={sex} onChange={(v) => setSex(v as typeof sex)} columns={2}
              options={[{ value: "male", label: "Мужской" }, { value: "female", label: "Женский" }]} />
            <InputWithUnit label="Возраст" value={age} unit="лет" onChange={setAge} />
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Рост" value={height} unit="см" onChange={setHeight} />
            <RadioCard label="Уровень активности" value={activity} onChange={setActivity} columns={1} options={activityOptions} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Базальный метаболизм (BMR)</div>
                <div className="mt-1 text-4xl font-bold text-blue-900">{result.bmr}<span className="ml-2 text-lg font-normal">ккал/сут</span></div>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <div className="text-sm text-blue-700">Суточный расход энергии (с учётом активности)</div>
                <div className="mt-1 text-2xl font-bold text-blue-900">{result.tdee} ккал/сут</div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Формула Миффлина-Сан Жеора: 10×вес(кг) + 6.25×рост(см) − 5×возраст(лет) + 5 (муж.) / −161 (жен.). Считается более точной, чем более старая формула Харриса-Бенедикта, для современной популяции.
        <p className="mt-3 text-xs text-gray-500">Источник: Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247.</p>
      </div>
    </div>
  );
}
