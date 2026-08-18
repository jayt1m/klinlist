"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

export default function FreeWaterDeficitCalculator() {
  const [weight, setWeight] = useState("");
  const [sodium, setSodium] = useState("");
  const [group, setGroup] = useState<"" | "man" | "woman" | "elderlyMan" | "elderlyWoman">("");
  const [targetNa, setTargetNa] = useState("140");

  const tbwFactor: Record<string, number> = { man: 0.6, woman: 0.5, elderlyMan: 0.5, elderlyWoman: 0.45 };

  const isValid = weight !== "" && sodium !== "" && group !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const tbw = tbwFactor[group] * Number(weight);
    const deficit = tbw * (Number(sodium) / Number(targetNa) - 1);
    return Number(deficit.toFixed(2));
  }, [isValid, group, weight, sodium, targetNa]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="free-water-deficit" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <RadioCard label="Группа" value={group} onChange={(v) => setGroup(v as typeof group)} columns={1}
              options={[
                { value: "man", label: "Мужчина" },
                { value: "woman", label: "Женщина" },
                { value: "elderlyMan", label: "Мужчина ≥65 лет" },
                { value: "elderlyWoman", label: "Женщина ≥65 лет" },
              ]} />
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Натрий плазмы (текущий)" value={sodium} unit="ммоль/л" onChange={setSodium} />
            <InputWithUnit label="Целевой натрий" value={targetNa} unit="ммоль/л" onChange={setTargetNa} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
              <div className="text-sm text-blue-700">Дефицит свободной воды</div>
              <div className="mt-2 text-5xl font-bold text-blue-900">{result}<span className="ml-2 text-lg font-normal">л</span></div>
              <p className="mt-4 text-sm text-blue-900">Коррекцию гипернатриемии проводят постепенно — снижение натрия не более чем на 8–10 ммоль/л за 24 часа (риск отёка мозга при быстрой коррекции).
        <p className="mt-3 text-xs text-gray-500">
          Источник: Adrogué HJ, Madias NE. N Engl J Med. 2000;342(20):1493-1499.
        </p></p>
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Дефицит воды (л) = Общая вода тела × (Na⁺ текущий / Na⁺ целевой − 1). Общая вода тела = масса тела × коэффициент (0.6 мужчины, 0.5 женщины/пожилые мужчины, 0.45 пожилые женщины). Используется при гипернатриемии; не учитывает продолжающиеся потери жидкости.
      </div>
    </div>
  );
}
