"use client";
import { useMemo, useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function LightCriteriaCalculator() {
  const [pleuralProtein, setPleuralProtein] = useState("");
  const [serumProtein, setSerumProtein] = useState("");
  const [pleuralLdh, setPleuralLdh] = useState("");
  const [serumLdh, setSerumLdh] = useState("");
  const [serumLdhUln, setSerumLdhUln] = useState("250");

  const isValid = pleuralProtein !== "" && serumProtein !== "" && pleuralLdh !== "" && serumLdh !== "" && serumLdhUln !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const proteinRatio = Number(pleuralProtein) / Number(serumProtein);
    const ldhRatio = Number(pleuralLdh) / Number(serumLdh);
    const ldhVsUln = Number(pleuralLdh) / Number(serumLdhUln);
    const c1 = proteinRatio > 0.5;
    const c2 = ldhRatio > 0.6;
    const c3 = ldhVsUln > 2 / 3;
    return { proteinRatio: Number(proteinRatio.toFixed(2)), ldhRatio: Number(ldhRatio.toFixed(2)), c1, c2, c3, exudate: c1 || c2 || c3 };
  }, [isValid, pleuralProtein, serumProtein, pleuralLdh, serumLdh, serumLdhUln]);

  const resultRef = useScrollToResult(result !== null);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="light-criteria" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Белок плевральной жидкости" value={pleuralProtein} unit="г/л" onChange={setPleuralProtein} />
            <InputWithUnit label="Белок сыворотки" value={serumProtein} unit="г/л" onChange={setSerumProtein} />
            <InputWithUnit label="ЛДГ плевральной жидкости" value={pleuralLdh} unit="Ед/л" onChange={setPleuralLdh} />
            <InputWithUnit label="ЛДГ сыворотки" value={serumLdh} unit="Ед/л" onChange={setSerumLdh} />
            <InputWithUnit label="Верхняя граница нормы ЛДГ вашей лаборатории" value={serumLdhUln} unit="Ед/л" onChange={setSerumLdhUln} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className="space-y-6">
              <div className={`rounded-3xl border p-8 ${result.exudate ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
                <div className="mb-3 flex items-center gap-3">
                  {result.exudate ? <CircleAlert className="h-7 w-7 text-amber-600" /> : <CircleCheck className="h-7 w-7 text-emerald-600" />}
                  <h3 className="text-2xl font-bold">{result.exudate ? "Экссудат" : "Транссудат"}</h3>
                </div>
                <p className="text-sm text-gray-700">{result.exudate ? "Выполнен хотя бы один критерий Лайта. Требуется поиск причины: инфекция, злокачественное новообразование, ТЭЛА, аутоиммунные заболевания." : "Ни один критерий не выполнен. Типично для сердечной недостаточности, цирроза, нефротического синдрома."}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-3 text-sm">
                <div className={`flex justify-between rounded-lg px-4 py-2 ${result.c1 ? "bg-amber-50" : "bg-gray-50"}`}>
                  <span>Белок плевральный / сывороточный &gt;0.5</span><strong>{result.proteinRatio} {result.c1 ? "✓" : "✕"}</strong>
                </div>
                <div className={`flex justify-between rounded-lg px-4 py-2 ${result.c2 ? "bg-amber-50" : "bg-gray-50"}`}>
                  <span>ЛДГ плевральная / сывороточная &gt;0.6</span><strong>{result.ldhRatio} {result.c2 ? "✓" : "✕"}</strong>
                </div>
                <div className={`flex justify-between rounded-lg px-4 py-2 ${result.c3 ? "bg-amber-50" : "bg-gray-50"}`}>
                  <span>ЛДГ плевральная &gt;2/3 верхней границы нормы</span><strong>{result.c3 ? "✓" : "✕"}</strong>
                </div>
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
        <p>Критерии Лайта разделяют плевральный выпот на экссудат и транссудат — выполнение хотя бы одного критерия означает экссудат. Критерии высокочувствительны, но могут ошибочно классифицировать транссудат как экссудат у пациентов на диуретиках (до 25% случаев) — в этой ситуации помогает градиент альбумина сыворотка-выпот (&gt;12 г/л указывает на транссудат).</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Light RW, et al. Ann Intern Med. 1972;77(4):507-513.</p>
      </div>
    </div>
  );
}
