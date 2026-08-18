"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function CalciumPhosphateCalculator() {
  const [calcium, setCalcium] = useState("");
  const [phosphate, setPhosphate] = useState("");

  const isValid = calcium !== "" && phosphate !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const mmol2 = Number(calcium) * Number(phosphate);
    const mgdl2 = mmol2 * 4.008 * 3.097;
    return { mmol2: Number(mmol2.toFixed(2)), mgdl2: Number(mgdl2.toFixed(0)) };
  }, [isValid, calcium, phosphate]);

  const resultRef = useScrollToResult(result !== null);
  const high = result !== null && result.mmol2 > 4.4;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="calcium-phosphate" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Кальций общий (скорректированный)" value={calcium} unit="ммоль/л" onChange={setCalcium} />
            <InputWithUnit label="Фосфор" value={phosphate} unit="ммоль/л" onChange={setPhosphate} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${high ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Кальций-фосфорное произведение</div>
              <div className="mt-2 text-5xl font-bold">{result.mmol2}<span className="ml-2 text-lg font-normal">ммоль²/л²</span></div>
              <div className="mt-2 text-sm text-gray-600">≈ {result.mgdl2} мг²/дл²</div>
              <div className="mt-4 text-sm font-semibold">{high ? "Повышено (>4.4 ммоль²/л² ≈ 55 мг²/дл²) — риск внекостной кальцификации, включая сосудистую" : "В пределах целевых значений"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Показатель используется при минерально-костных нарушениях у пациентов с хронической болезнью почек. Целевое значение обычно &lt;4.4 ммоль²/л² (≈55 мг²/дл²). Актуальные рекомендации KDIGO смещают акцент с изолированного произведения на контроль самих уровней кальция и фосфора в динамике, поэтому показатель используется как вспомогательный.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: KDIGO Clinical Practice Guideline for CKD-MBD, 2017 update.</p>
      </div>
    </div>
  );
}
