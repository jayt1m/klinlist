"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ResultCard from "@/components/ui/ResultCard";

export default function HbA1cCalculator() {
  const [hba1c, setHba1c] = useState("");

  const result = useMemo(() => {
    if (!hba1c) return null;

    const value = Number(hba1c);

    const mmol = 1.59 * value - 2.59;
    const mgdl = 28.7 * value - 46.7;

    return {
      mmol: Number(mmol.toFixed(1)),
      mgdl: Number(mgdl.toFixed(0)),
    };
  }, [hba1c]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="hba1c" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <InputWithUnit
            label="Гликированный гемоглобин (HbA1c)"
            value={hba1c}
            unit="%"
            onChange={setHba1c}
          />

        </div>

        <div>

          {result ? (

            <ResultCard
              score={result.mmol}
              unit="ммоль/л"
              title="Средняя глюкоза за 3 месяца"
              recommendation={`≈ ${result.mgdl} мг/дл`}
              color="blue"
            />

          ) : (

            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">Введите значение HbA1c.</p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Расчёт справедлив только при нормальном обмене эритроцитов.
          При анемии, гемоглобинопатиях, недавней гемотрансфузии,
          хронической болезни почек и беременности соответствие
          HbA1c и средней глюкозы нарушается, и расчётное значение
          может ощутимо отличаться от истинного — в этих случаях
          предпочтительны прямые измерения глюкозы (самоконтроль,
          НМГ) вместо расчётной оценки.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Формула ADAG: eAG (ммоль/л) = 1.59 × HbA1c(%) − 2.59.
          Источник: Nathan DM, et al. Diabetes Care.
          2008;31(8):1473-1478.
        </p>
      </div>

    </div>
  );
}
