"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function ShockIndexCalculator() {
  const [hr, setHr] = useState("");
  const [sbp, setSbp] = useState("");
  const isValid = hr !== "" && sbp !== "" && Number(sbp) > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return Number((Number(hr) / Number(sbp)).toFixed(2));
  }, [isValid, hr, sbp]);

  const resultRef = useScrollToResult(result !== null);
  const elevated = result !== null && result >= 0.9;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="shock-index" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="ЧСС" value={hr} unit="уд/мин" onChange={setHr} />
            <InputWithUnit label="Систолическое АД" value={sbp} unit="мм рт.ст." onChange={setSbp} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${elevated ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Шоковый индекс</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{elevated ? "Повышен (≥0.9) — вероятна гемодинамическая нестабильность" : "В пределах нормы (0.5–0.7)"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Шоковый индекс = ЧСС / систолическое АД. Норма 0.5–0.7. Повышение ≥0.9 ассоциировано с гиповолемией, кровопотерей и повышенным риском неблагоприятного исхода — иногда раньше, чем изменяются отдельно взятые АД или ЧСС. Неинформативен на фоне бета-блокаторов, при фибрилляции предсердий с высокой ЧСС и у пациентов с водителем ритма.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Allgöwer M, Burri C. Dtsch Med Wochenschr. 1967;92(43):1947-1950.</p>
      </div>
    </div>
  );
}
