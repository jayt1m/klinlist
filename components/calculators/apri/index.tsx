"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function ApriCalculator() {
  const [ast, setAst] = useState("");
  const [astUln, setAstUln] = useState("40");
  const [platelets, setPlatelets] = useState("");

  const isValid = ast !== "" && astUln !== "" && platelets !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const apri = ((Number(ast) / Number(astUln)) * 100) / Number(platelets);
    return Number(apri.toFixed(2));
  }, [isValid, ast, astUln, platelets]);

  const resultRef = useScrollToResult(result !== null);
  const category = result === null ? null : result < 0.5 ? "low" : result <= 1.5 ? "mid" : "high";
  const color = category === "low" ? "border-emerald-300 bg-emerald-50" : category === "mid" ? "border-amber-300 bg-amber-50" : "border-red-300 bg-red-50";
  const label = category === "low" ? "Значимый фиброз маловероятен" : category === "mid" ? "Неопределённо — нужна дополнительная оценка (эластография)" : "Высока вероятность выраженного фиброза/цирроза";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="apri" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="АСТ" value={ast} unit="Ед/л" onChange={setAst} />
            <InputWithUnit label="Верхняя граница нормы АСТ вашей лаборатории" value={astUln} unit="Ед/л" onChange={setAstUln} />
            <InputWithUnit label="Тромбоциты" value={platelets} unit="×10⁹/л" onChange={setPlatelets} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${color}`}>
              <div className="text-sm text-gray-600">APRI</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{label}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        APRI = (АСТ / верхняя граница нормы АСТ × 100) / тромбоциты (×10⁹/л). Неинвазивный маркер фиброза печени, изначально валидирован при хроническом гепатите C. Дополняет FIB-4 — оба индекса разумно использовать вместе.
        <p className="mt-3 text-xs text-gray-500">Источник: Wai CT, et al. Hepatology. 2003;38(2):518-526.</p>
      </div>
    </div>
  );
}
