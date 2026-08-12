"use client";

import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function AnionGapCalculator() {
  const [sodium, setSodium] = useState("");
  const [chloride, setChloride] = useState("");
  const [bicarbonate, setBicarbonate] = useState("");
  const [albumin, setAlbumin] = useState("");

  const isValid = sodium !== "" && chloride !== "" && bicarbonate !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const gap = Number(sodium) - (Number(chloride) + Number(bicarbonate));
    const corrected = albumin !== "" ? gap + 0.25 * (40 - Number(albumin)) : null;
    return { gap: Number(gap.toFixed(1)), corrected: corrected !== null ? Number(corrected.toFixed(1)) : null };
  }, [isValid, sodium, chloride, bicarbonate, albumin]);

  const resultRef = useScrollToResult(result !== null);
  const high = result !== null && (result.corrected ?? result.gap) > 12;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="anion-gap" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <div className="space-y-6">
            <InputWithUnit label="Натрий" value={sodium} unit="ммоль/л" onChange={setSodium} />
            <InputWithUnit label="Хлор" value={chloride} unit="ммоль/л" onChange={setChloride} />
            <InputWithUnit label="Бикарбонат (HCO₃⁻)" value={bicarbonate} unit="ммоль/л" onChange={setBicarbonate} />
            <InputWithUnit label="Альбумин" value={albumin} unit="г/л (необязательно)" onChange={setAlbumin} />
          </div>
        </div>

        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 space-y-4 ${high ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div>
                <div className="text-sm text-gray-600">Анионный интервал</div>
                <div className="mt-1 text-4xl font-bold">{result.gap}<span className="ml-2 text-lg font-normal">ммоль/л</span></div>
              </div>
              {result.corrected !== null && (
                <div className="rounded-xl bg-white/70 p-4">
                  <div className="text-sm text-gray-600">С коррекцией на альбумин</div>
                  <div className="mt-1 text-2xl font-bold">{result.corrected} ммоль/л</div>
                </div>
              )}
              <div className="text-sm font-semibold">{high ? "Повышенный (норма 8–12 ммоль/л)" : "В пределах нормы (8–12 ммоль/л)"}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Анионный интервал = Na⁺ − (Cl⁻ + HCO₃⁻). Повышенный анионный интервал указывает на накопление неизмеряемых анионов (лактат, кетоны, уремические токсины, токсичные спирты и др.). Гипоальбуминемия занижает анионный интервал — при альбумине ниже нормы используйте коррекцию: +2.5 ммоль/л на каждые 10 г/л снижения альбумина от 40 г/л.
      </div>
    </div>
  );
}
