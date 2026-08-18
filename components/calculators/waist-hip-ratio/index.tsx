"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

export default function WaistHipRatioCalculator() {
  const [sex, setSex] = useState<"" | "male" | "female">("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const isValid = sex !== "" && waist !== "" && hip !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    return Number((Number(waist) / Number(hip)).toFixed(2));
  }, [isValid, waist, hip]);

  const resultRef = useScrollToResult(result !== null);
  const highRisk = result !== null && sex !== "" && (sex === "male" ? result > 0.9 : result > 0.85);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="waist-hip-ratio" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <RadioCard label="Пол" value={sex} onChange={(v) => setSex(v as typeof sex)} columns={2}
              options={[{ value: "male", label: "Мужской" }, { value: "female", label: "Женский" }]} />
            <InputWithUnit label="Окружность талии" value={waist} unit="см" onChange={setWaist} />
            <InputWithUnit label="Окружность бёдер" value={hip} unit="см" onChange={setHip} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${highRisk ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Отношение талия/бёдра</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">
                {highRisk ? `Повышенный риск (норма ВОЗ: ≤${sex === "male" ? "0.90" : "0.85"} для ${sex === "male" ? "мужчин" : "женщин"})` : "В пределах нормы по критериям ВОЗ"}
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
        По критериям ВОЗ абдоминальное ожирение (повышенный сердечно-сосудистый и метаболический риск) — при отношении &gt;0.90 у мужчин и &gt;0.85 у женщин. Отражает распределение жировой ткани лучше, чем изолированный ИМТ.
        <p className="mt-3 text-xs text-gray-500">
          Источник: WHO. Waist Circumference and Waist-Hip Ratio: Report of a WHO Expert Consultation. Geneva, 2008.
        </p>
      </div>
    </div>
  );
}
