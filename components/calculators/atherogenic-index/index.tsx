"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function AtherogenicIndexCalculator() {
  const [totalChol, setTotalChol] = useState("");
  const [hdl, setHdl] = useState("");
  const isValid = totalChol !== "" && hdl !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const v = (Number(totalChol) - Number(hdl)) / Number(hdl);
    return Number(v.toFixed(2));
  }, [isValid, totalChol, hdl]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="atherogenic-index" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Общий холестерин" value={totalChol} unit="ммоль/л" onChange={setTotalChol} />
            <InputWithUnit label="ЛПВП" value={hdl} unit="ммоль/л" onChange={setHdl} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${result > 3 ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Коэффициент атерогенности</div>
              <div className="mt-2 text-5xl font-bold">{result}</div>
              <div className="mt-4 text-sm font-semibold">{result > 3 ? "Выше 3 — повышенный риск атеросклероза" : "В пределах нормы (до 3)"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>КА = (общий холестерин − ЛПВП) / ЛПВП. Показатель распространён в отечественной практике; в актуальных международных рекомендациях основным целевым показателем является уровень ЛПНП, а при высоких триглицеридах — не-ЛПВП холестерин. Используйте коэффициент как дополнительный, а не основной ориентир.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Климов А.Н., Никульчева Н.Г. Обмен липидов и липопротеидов и его нарушения. СПб, 1999.</p>
      </div>
    </div>
  );
}
