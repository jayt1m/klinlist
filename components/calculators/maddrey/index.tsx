"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function MaddreyCalculator() {
  const [pt, setPt] = useState("");
  const [controlPt, setControlPt] = useState("");
  const [bilirubin, setBilirubin] = useState("");

  const isValid = pt !== "" && controlPt !== "" && bilirubin !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const biliMgDl = Number(bilirubin) / 17.1;
    return Number((4.6 * (Number(pt) - Number(controlPt)) + biliMgDl).toFixed(1));
  }, [isValid, pt, controlPt, bilirubin]);

  const resultRef = useScrollToResult(result !== null);
  const severe = result !== null && result >= 32;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="maddrey" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Протромбиновое время пациента" value={pt} unit="сек" onChange={setPt} />
            <InputWithUnit label="Контрольное протромбиновое время лаборатории" value={controlPt} unit="сек" onChange={setControlPt} />
            <InputWithUnit label="Общий билирубин" value={bilirubin} unit="мкмоль/л" onChange={setBilirubin} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${severe ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Дискриминантная функция Маддрея</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{severe ? "≥32 — тяжёлый алкогольный гепатит, высокая краткосрочная летальность" : "<32 — нетяжёлое течение"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>ДФ = 4.6 × (ПВ пациента − контрольное ПВ) + билирубин (мг/дл). Билирубин переводится из мкмоль/л делением на 17.1. Значение ≥32 указывает на тяжёлый алкогольный гепатит с летальностью около 30–50% в течение месяца и исторически служит порогом для рассмотрения глюкокортикоидной терапии — решение принимается с учётом противопоказаний (активная инфекция, кровотечение, почечная недостаточность) и в динамике по шкале Lille.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Maddrey WC, et al. Gastroenterology. 1978;75(2):193-199.</p>
      </div>
    </div>
  );
}
