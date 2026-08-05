"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";

import { calculateBMI } from "./formulas";
import Result from "./Result";


export default function BMICalculator() {

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");


  const bmi = useMemo(() => {

    if (!weight || !height) {
      return null;
    }

    return calculateBMI({
      weight: Number(weight),
      height: Number(height),
    });

  }, [weight, height]);


  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="bmi" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Исходные данные
          </h2>

          <div className="space-y-6">

            <InputWithUnit
              label="Масса тела"
              value={weight}
              unit="кг"
              onChange={setWeight}
            />

            <InputWithUnit
              label="Рост"
              value={height}
              unit="см"
              onChange={setHeight}
            />

          </div>

        </div>

        <div>

          {bmi !== null ? (

            <Result bmi={bmi} />

          ) : (

            <div className="flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">

              <div className="text-center">

                <div className="mb-4 text-6xl">
                  ⚖️
                </div>

                <h3 className="text-xl font-semibold">
                  Заполните параметры
                </h3>

                <p className="mt-2 text-zinc-500">
                  Введите вес и рост, чтобы рассчитать ИМТ.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        ИМТ не различает мышечную и жировую массу и может вводить в
        заблуждение у спортсменов с развитой мускулатурой (завышает
        категорию) и у пожилых пациентов с саркопенией (занижает
        категорию при сохранном или избыточном жировом компоненте).
        Не применяется у беременных и у детей — для детей
        используются возрастные перцентильные таблицы ВОЗ.
      </div>

    </div>
  );
}
