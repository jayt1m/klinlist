"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

import { LipidUnit } from "./types";
import { calculateLDL } from "./formulas";
import Result from "./Result";


export default function LDLCalculator() {

  const [unit, setUnit] = useState<LipidUnit>("mmol");

  const [totalChol, setTotalChol] = useState("");
  const [hdl, setHdl] = useState("");
  const [triglycerides, setTriglycerides] = useState("");


  const unitLabel = unit === "mmol" ? "ммоль/л" : "мг/дл";


  const ldl = useMemo(() => {

    if (!totalChol || !hdl || !triglycerides) {
      return undefined;
    }

    return calculateLDL({
      totalChol: Number(totalChol),
      hdl: Number(hdl),
      triglycerides: Number(triglycerides),
      unit,
    });

  }, [totalChol, hdl, triglycerides, unit]);



  const resultRef = useScrollToResult(ldl !== undefined);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="ldl" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Исходные данные
          </h2>

          <div className="space-y-6">

            <RadioCard
              label="Единицы измерения"
              value={unit}
              onChange={(value) =>
                setUnit(value as LipidUnit)
              }
              columns={2}
              options={[
                { value: "mmol", label: "ммоль/л" },
                { value: "mgdl", label: "мг/дл" },
              ]}
            />

            <InputWithUnit
              label="Общий холестерин"
              value={totalChol}
              unit={unitLabel}
              onChange={setTotalChol}
            />

            <InputWithUnit
              label="ЛПВП"
              value={hdl}
              unit={unitLabel}
              onChange={setHdl}
            />

            <InputWithUnit
              label="Триглицериды"
              value={triglycerides}
              unit={unitLabel}
              onChange={setTriglycerides}
            />

          </div>

        </div>

        <div ref={resultRef}>

          {ldl !== undefined ? (

            <Result ldl={ldl} unit={unit} />

          ) : (

            <div className="flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">

              <div className="text-center">

                <div className="mb-4 text-6xl">
                  🧪
                </div>

                <h3 className="text-xl font-semibold">
                  Заполните параметры
                </h3>

                <p className="mt-2 text-zinc-500">
                  Введите общий холестерин, ЛПВП и триглицериды.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Формула Фридвальда систематически занижает ЛПНП при высоких
          триглицеридах и после недавнего приёма пищи — по возможности
          используйте показатели натощак. При ЛПНП &lt;1.8 ммоль/л
          погрешность расчёта также растёт; в этих случаях
          предпочтительнее прямое измерение ЛПНП или расчёт по
          формуле Мартина-Хопкинса. Альтернативой при высоких ТГ
          может служить не-ЛПВП холестерин (ОХС − ЛПВП), не
          требующий деления на ТГ.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник формулы: Friedewald WT, et al. Clin Chem.
          1972;18(6):499-502.
        </p>
      </div>

    </div>
  );
}
