"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

export default function PeakFlowCalculator() {
  const [sex, setSex] = useState<"" | "male" | "female">("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [measured, setMeasured] = useState("");

  const isValid = sex !== "" && age !== "" && height !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const a = Number(age), h = Number(height);
    const predicted = sex === "male"
      ? Math.exp(0.544 * Math.log(a) - 0.0151 * a - 74.7 / h + 5.48) * 60
      : Math.exp(0.376 * Math.log(a) - 0.0120 * a - 58.8 / h + 5.63) * 60;
    const percent = measured !== "" ? (Number(measured) / predicted) * 100 : null;
    return { predicted: Math.round(predicted), percent: percent !== null ? Number(percent.toFixed(0)) : null };
  }, [isValid, sex, age, height, measured]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="peak-flow" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <RadioCard label="Пол" value={sex} onChange={(v) => setSex(v as typeof sex)} columns={2}
              options={[{ value: "male", label: "Мужской" }, { value: "female", label: "Женский" }]} />
            <InputWithUnit label="Возраст" value={age} unit="лет" onChange={setAge} />
            <InputWithUnit label="Рост" value={height} unit="см" onChange={setHeight} />
            <div className="border-t border-zinc-200 pt-4">
              <InputWithUnit label="Измеренная ПСВ" value={measured} unit="л/мин (необязательно)" onChange={setMeasured} />
            </div>
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Должная пиковая скорость выдоха</div>
                <div className="mt-1 text-5xl font-bold text-blue-900">{result.predicted}<span className="ml-2 text-lg font-normal">л/мин</span></div>
              </div>
              {result.percent !== null && (
                <div className={`rounded-xl p-4 ${result.percent >= 80 ? "bg-emerald-100" : result.percent >= 50 ? "bg-amber-100" : "bg-red-100"}`}>
                  <div className="text-sm">Измеренная ПСВ от должной</div>
                  <div className="mt-1 text-3xl font-bold">{result.percent}%</div>
                  <div className="mt-1 text-sm font-semibold">{result.percent >= 80 ? "Зелёная зона — контроль удовлетворительный" : result.percent >= 50 ? "Жёлтая зона — требуется усиление терапии" : "Красная зона — тяжёлое обострение, неотложные меры"}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Расчёт должных значений пиковой скорости выдоха по формулам Nunn и Gregg для взрослых европеоидов. В практике ведения бронхиальной астмы предпочтительнее ориентироваться на лучший персональный показатель самого пациента, а не на популяционную норму: зелёная зона ≥80%, жёлтая 50–79%, красная &lt;50% от лучшего значения.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Nunn AJ, Gregg I. BMJ. 1989;298(6680):1068-1070.</p>
      </div>
    </div>
  );
}
