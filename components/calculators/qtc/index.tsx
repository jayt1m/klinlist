"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ExpandableCard from "@/components/ui/ExpandableCard";

import { Sex } from "./types";
import { calculateQTcBazett, calculateQTcFridericia } from "./formulas";
import Result from "./Result";


export default function QTcCalculator() {

  const [qt, setQt] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [sex, setSex] = useState<Sex | "">("");


  const result = useMemo(() => {

    if (!qt || !heartRate || !sex) {
      return null;
    }

    const data = {
      qt: Number(qt),
      heartRate: Number(heartRate),
      sex,
    };

    return {
      bazett: calculateQTcBazett(data),
      fridericia: calculateQTcFridericia(data),
    };

  }, [qt, heartRate, sex]);



  const resultRef = useScrollToResult(result !== null);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="qtc" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Исходные данные
          </h2>

          <div className="space-y-6">

            <InputWithUnit
              label="Интервал QT"
              value={qt}
              unit="мс"
              onChange={setQt}
            />

            <InputWithUnit
              label="Частота сердечных сокращений"
              value={heartRate}
              unit="уд/мин"
              onChange={setHeartRate}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Пол
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setSex("male")}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                    sex === "male"
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-zinc-300 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold text-zinc-800">
                    Мужчина
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSex("female")}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                    sex === "female"
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-zinc-300 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold text-zinc-800">
                    Женщина
                  </span>
                </button>

              </div>
            </div>

          </div>

        </div>

        <div ref={resultRef}>

          {result ? (

            <Result
              qtcBazett={result.bazett}
              qtcFridericia={result.fridericia}
              sex={sex as Sex}
            />

          ) : (

            <div className="flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">

              <div className="text-center">

                <div className="mb-4 text-6xl">
                  〰️
                </div>

                <h3 className="text-xl font-semibold">
                  Заполните параметры
                </h3>

                <p className="mt-2 text-zinc-500">
                  Введите QT и ЧСС для расчёта корригированного
                  интервала.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

      <ExpandableCard title="О калькуляторе QTc">

        <div className="space-y-4 text-gray-700">

          <p>
            Корригированный QT (QTc) устраняет зависимость
            интервала QT от частоты сердечных сокращений, что
            важно при контроле терапии препаратами, удлиняющими
            QT (антиаритмики, некоторые антибиотики,
            антипсихотики и др.).
          </p>

          <p>
            Пороги: норма ≤430 мс (мужчины) / ≤450 мс (женщины),
            пограничные значения до 450/470 мс, удлинение выше
            этих значений. QTc ≥500 мс — существенный фактор
            риска torsades de pointes.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Источники: Bazett HC. Heart. 1920;7:353-370. Fridericia
            LS. Acta Med Scand. 1920;53:469-486. Пороги — Rautaharju
            PM, et al. Circulation. 2009;119(10):e241-e250.
          </p>

        </div>

      </ExpandableCard>

    </div>
  );
}
