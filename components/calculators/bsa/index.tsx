"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ResultCard from "@/components/ui/ResultCard";

export default function BSACalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const result = useMemo(() => {
    if (!weight || !height) return null;

    const w = Number(weight);
    const h = Number(height);

    const duBois =
      0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);

    const mosteller = Math.sqrt((h * w) / 3600);

    return {
      duBois: Number(duBois.toFixed(2)),
      mosteller: Number(mosteller.toFixed(2)),
    };
  }, [weight, height]);


  const resultRef = useScrollToResult(result !== null);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="bsa" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Рост" value={height} unit="см" onChange={setHeight} />
          </div>

        </div>

        <div ref={resultRef}>

          {result ? (

            <ResultCard
              score={result.duBois}
              unit="м² (Du Bois)"
              title="Площадь поверхности тела"
              recommendation={`Mosteller: ${result.mosteller} м²`}
              color="blue"
            />

          ) : (

            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">Введите вес и рост.</p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
<p>
        Используется для расчёта доз химиопрепаратов, сердечного
        индекса и других показателей. Du Bois: 0.007184 × вес^0.425 ×
        рост^0.725.
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Источники: Du Bois D, Du Bois EF. Arch Intern
        Med. 1916;17(6):863-871. Mosteller RD. N Engl J Med.
        1987;317(17):1098.
        </p>
      </div>

    </div>
  );
}
