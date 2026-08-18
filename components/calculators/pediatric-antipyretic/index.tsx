"use client";
import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

export default function PediatricAntipyreticCalculator() {
  const [weight, setWeight] = useState("");
  const [drug, setDrug] = useState<"" | "paracetamol" | "ibuprofen">("");
  const [concentration, setConcentration] = useState("");

  const isValid = weight !== "" && drug !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const w = Number(weight);
    if (drug === "paracetamol") {
      const single = { min: 10 * w, max: 15 * w };
      const maxDaily = Math.min(60 * w, 4000);
      const ml = concentration !== "" ? { min: single.min / Number(concentration), max: single.max / Number(concentration) } : null;
      return { single, maxDaily, interval: "4–6 часов", maxDoses: "не более 4 раз в сутки", ml };
    }
    const single = { min: 5 * w, max: 10 * w };
    const maxDaily = Math.min(30 * w, 1200);
    const ml = concentration !== "" ? { min: single.min / Number(concentration), max: single.max / Number(concentration) } : null;
    return { single, maxDaily, interval: "6–8 часов", maxDoses: "не более 3–4 раз в сутки", ml };
  }, [isValid, weight, drug, concentration]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="pediatric-antipyretic" />
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        Расчёт носит справочный характер. Перед назначением сверьтесь с инструкцией к конкретному препарату: концентрация сиропа, возрастные ограничения и противопоказания различаются между лекарственными формами и производителями. Ибупрофен не применяется у детей младше 3 месяцев и с осторожностью при обезвоживании.
      </div>
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Масса тела ребёнка" value={weight} unit="кг" onChange={setWeight} />
            <RadioCard label="Препарат" value={drug} onChange={(v) => setDrug(v as typeof drug)} columns={1}
              options={[{ value: "paracetamol", label: "Парацетамол (10–15 мг/кг)" }, { value: "ibuprofen", label: "Ибупрофен (5–10 мг/кг)" }]} />
            <div className="border-t border-zinc-200 pt-4">
              <InputWithUnit label="Концентрация сиропа" value={concentration} unit="мг/мл (необязательно)" onChange={setConcentration} />
              <p className="mt-2 text-xs text-zinc-500">Например: 120 мг/5 мл = 24 мг/мл; 100 мг/5 мл = 20 мг/мл.</p>
            </div>
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 space-y-4">
              <div>
                <div className="text-sm text-blue-700">Разовая доза</div>
                <div className="mt-1 text-4xl font-bold text-blue-900">{Math.round(result.single.min)}–{Math.round(result.single.max)}<span className="ml-2 text-lg font-normal">мг</span></div>
              </div>
              {result.ml !== null && (
                <div className="rounded-xl bg-white/70 p-4">
                  <div className="text-sm text-blue-700">В миллилитрах сиропа</div>
                  <div className="mt-1 text-2xl font-bold text-blue-900">{result.ml.min.toFixed(1)}–{result.ml.max.toFixed(1)} мл</div>
                </div>
              )}
              <div className="rounded-xl bg-white/70 p-4 space-y-2 text-sm text-blue-900">
                <div>Интервал между приёмами: <strong>{result.interval}</strong></div>
                <div>Кратность: <strong>{result.maxDoses}</strong></div>
                <div>Максимальная суточная доза: <strong>{Math.round(result.maxDaily)} мг</strong></div>
              </div>
              <div className="flex items-start gap-2 text-sm text-blue-900">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>При лихорадке у ребёнка младше 3 месяцев, а также при сохранении лихорадки более 3 суток необходим врачебный осмотр.</span>
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
        <p>Парацетамол: 10–15 мг/кг на приём каждые 4–6 часов, не более 60 мг/кг/сут (и не более 4 г/сут). Ибупрофен: 5–10 мг/кг на приём каждые 6–8 часов, не более 30 мг/кг/сут (и не более 1200 мг/сут без назначения врача).</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Клинические рекомендации по лихорадке у детей; инструкции по медицинскому применению препаратов.</p>
      </div>
    </div>
  );
}
