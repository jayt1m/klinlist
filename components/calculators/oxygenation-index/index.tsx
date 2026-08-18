"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function OxygenationIndexCalculator() {
  const [pao2, setPao2] = useState("");
  const [fio2, setFio2] = useState("");
  const isValid = pao2 !== "" && fio2 !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const v = Number(pao2) / (Number(fio2) / 100);
    return Number(v.toFixed(0));
  }, [isValid, pao2, fio2]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="oxygenation-index" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="paO₂ (артериальная кровь)" value={pao2} unit="мм рт.ст." onChange={setPao2} />
            <InputWithUnit label="FiO₂ (доля кислорода)" value={fio2} unit="% (21–100)" onChange={setFio2} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${result < 100 ? "border-red-300 bg-red-50" : result < 200 ? "border-orange-300 bg-orange-50" : result < 300 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Индекс оксигенации paO₂/FiO₂</div>
              <div className="mt-2 text-5xl font-bold">{result}<span className="ml-2 text-lg font-normal">мм рт.ст.</span></div>
              <div className="mt-4 text-sm font-semibold">{result < 100 ? "<100 — тяжёлый ОРДС" : result < 200 ? "100–199 — среднетяжёлый ОРДС" : result < 300 ? "200–299 — лёгкий ОРДС" : "≥300 — критериям ОРДС по оксигенации не соответствует"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Индекс оксигенации (индекс Горовица) = paO₂ / FiO₂. Ключевой критерий тяжести острого респираторного дистресс-синдрома по Берлинскому определению — при условии, что пациент получает ПДКВ (PEEP) ≥5 см вод.ст. Диагноз ОРДС требует также острого начала, двусторонних инфильтратов и исключения кардиогенного отёка лёгких.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: ARDS Definition Task Force. JAMA. 2012;307(23):2526-2533.</p>
      </div>
    </div>
  );
}
