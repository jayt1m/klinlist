"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ResultCard from "@/components/ui/ResultCard";

export default function FeNaCalculator() {
  const [urineNa, setUrineNa] = useState("");
  const [plasmaNa, setPlasmaNa] = useState("");
  const [urineCr, setUrineCr] = useState("");
  const [plasmaCr, setPlasmaCr] = useState("");

  const result = useMemo(() => {
    if (!urineNa || !plasmaNa || !urineCr || !plasmaCr) return null;

    const value =
      ((Number(urineNa) * Number(plasmaCr)) / (Number(plasmaNa) * Number(urineCr))) * 100;

    return Number(value.toFixed(2));
  }, [urineNa, plasmaNa, urineCr, plasmaCr]);

  const category = result === null ? null : result < 1 ? "prerenal" : result <= 2 ? "mid" : "intrinsic";
  const color = category === "prerenal" ? "green" : category === "mid" ? "yellow" : "red";
  const label =
    category === "prerenal"
      ? "<1% — типично для преренальной ОПП"
      : category === "mid"
        ? "1–2% — неопределённо"
        : ">2% — типично для интраренальной ОПП (ОКН)";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="fena" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <p className="mb-4 text-sm text-zinc-500">
            Единицы измерения могут быть любыми — важно лишь, чтобы обе
            концентрации натрия были в одних единицах, а обе
            концентрации креатинина — в одних (например, ммоль/л и
            мкмоль/л соответственно).
          </p>

          <div className="space-y-6">

            <InputWithUnit label="Натрий мочи" value={urineNa} unit="ммоль/л" onChange={setUrineNa} />
            <InputWithUnit label="Натрий плазмы" value={plasmaNa} unit="ммоль/л" onChange={setPlasmaNa} />
            <InputWithUnit label="Креатинин мочи" value={urineCr} unit="мкмоль/л" onChange={setUrineCr} />
            <InputWithUnit label="Креатинин плазмы" value={plasmaCr} unit="мкмоль/л" onChange={setPlasmaCr} />

          </div>

        </div>

        <div>

          {result !== null ? (

            <ResultCard
              score={result}
              unit="%"
              title="FeNa (экскретируемая фракция натрия)"
              recommendation={label}
              color={color}
            />

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите натрий и креатинин мочи и плазмы.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        FeNa(%) = (натрий мочи × креатинин плазмы) / (натрий плазмы ×
        креатинин мочи) × 100. Помогает различить преренальную
        (гиповолемическую) и интраренальную (острый канальцевый
        некроз) причины острого повреждения почек. Неинформативен на
        фоне приёма диуретиков — в этом случае используйте фракционную
        экскрецию мочевины (FeUrea).
      </div>

    </div>
  );
}
