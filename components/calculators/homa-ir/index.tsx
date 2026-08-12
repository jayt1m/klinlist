"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ResultCard from "@/components/ui/ResultCard";

export default function HomaIrCalculator() {
  const [glucose, setGlucose] = useState("");
  const [insulin, setInsulin] = useState("");

  const result = useMemo(() => {
    if (!glucose || !insulin) return null;

    const value = (Number(glucose) * Number(insulin)) / 22.5;

    return Number(value.toFixed(2));
  }, [glucose, insulin]);

  const resistant = result !== null && result >= 2.7;


  const resultRef = useScrollToResult(result !== null);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="homa-ir" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <InputWithUnit
              label="Глюкоза натощак"
              value={glucose}
              unit="ммоль/л"
              onChange={setGlucose}
            />

            <InputWithUnit
              label="Инсулин натощак"
              value={insulin}
              unit="мкЕд/мл"
              onChange={setInsulin}
            />

          </div>

        </div>

        <div ref={resultRef}>

          {result !== null ? (

            <ResultCard
              score={result}
              unit=""
              title="Индекс HOMA-IR"
              recommendation={
                resistant
                  ? "Признаки инсулинорезистентности"
                  : "Инсулинорезистентность маловероятна"
              }
              color={resistant ? "yellow" : "green"}
            />

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите глюкозу и инсулин натощак.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          HOMA-IR = глюкоза (ммоль/л) × инсулин (мкЕд/мл) / 22.5.
          Порог ≥2.7 условно указывает на инсулинорезистентность, но
          референсные значения различаются между лабораториями и
          методами определения инсулина — при пограничных значениях
          ориентируйтесь на референс конкретной лаборатории. Индекс
          неинформативен у пациентов на инсулинотерапии и требует
          строго натощакового забора крови (8–12 часов голодания).
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Matthews DR, et al. Diabetologia.
          1985;28(7):412-419.
        </p>
      </div>

    </div>
  );
}
