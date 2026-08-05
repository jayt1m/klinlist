"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ResultCard from "@/components/ui/ResultCard";

export default function MeldNaCalculator() {
  const [creatinine, setCreatinine] = useState(""); // мкмоль/л
  const [bilirubin, setBilirubin] = useState(""); // мкмоль/л
  const [inr, setInr] = useState("");
  const [sodium, setSodium] = useState(""); // ммоль/л
  const [dialysis, setDialysis] = useState(false);

  const isValid = creatinine !== "" && bilirubin !== "" && inr !== "" && sodium !== "";

  const result = useMemo(() => {
    if (!isValid) return null;

    // мкмоль/л → мг/дл (креатинин ÷88.4, билирубин ÷17.1)
    let cr = Number(creatinine) / 88.4;
    let bili = Number(bilirubin) / 17.1;
    let inrVal = Number(inr);
    let na = Number(sodium);

    if (dialysis) cr = 4.0;

    cr = Math.max(cr, 1.0);
    if (cr > 4.0) cr = 4.0;
    bili = Math.max(bili, 1.0);
    inrVal = Math.max(inrVal, 1.0);

    const meldI =
      0.957 * Math.log(cr) + 0.378 * Math.log(bili) + 1.12 * Math.log(inrVal) + 0.643;

    let meld = Math.round(meldI * 10);

    if (meld > 11) {
      const naBounded = Math.min(Math.max(na, 125), 137);
      meld = Math.round(
        meld + 1.32 * (137 - naBounded) - 0.033 * meld * (137 - naBounded)
      );
    }

    meld = Math.max(6, Math.min(40, meld));

    return meld;
  }, [creatinine, bilirubin, inr, sodium, dialysis, isValid]);

  const category =
    result === null
      ? null
      : result < 10
        ? "low"
        : result < 20
          ? "mid"
          : result < 30
            ? "high"
            : "veryhigh";

  const color =
    category === "low" ? "green" : category === "mid" ? "yellow" : "red";

  const mortality =
    category === "low"
      ? "≈1.9%"
      : category === "mid"
        ? "≈6.0%"
        : category === "high"
          ? "≈19.6%"
          : "≈52.6% и выше";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="meld-na" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <InputWithUnit label="Креатинин" value={creatinine} unit="мкмоль/л" onChange={setCreatinine} />
            <InputWithUnit label="Билирубин общий" value={bilirubin} unit="мкмоль/л" onChange={setBilirubin} />
            <InputWithUnit label="МНО" value={inr} unit="" onChange={setInr} />
            <InputWithUnit label="Натрий" value={sodium} unit="ммоль/л" onChange={setSodium} />

            <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4">
              <input
                type="checkbox"
                checked={dialysis}
                onChange={() => setDialysis(!dialysis)}
                className="h-5 w-5"
              />
              <span className="text-sm font-medium text-zinc-700">
                Диализ ≥2 раз за последние 7 дней
              </span>
            </label>

          </div>

        </div>

        <div>

          {result !== null ? (

            <ResultCard
              score={result}
              unit="баллов"
              title="MELD-Na"
              recommendation={`Ориентировочная 3-месячная летальность: ${mortality}`}
              color={color}
            />

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите креатинин, билирубин, МНО и натрий.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Действующая (с 2016 года) версия шкалы MELD, применяемая UNOS/OPTN
        для приоритизации в листе ожидания трансплантации печени.
        Значения лабораторных показателей ограничены нижними и верхними
        порогами согласно официальной методике расчёта. Источники:
        Kamath PS, et al. Hepatology. 2001;33(2):464-470. Wiesner R,
        et al. Gastroenterology. 2003;124(1):91-96. OPTN Policy,
        2016.
      </div>

    </div>
  );
}
