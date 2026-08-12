"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";

function gcsCode(v: string) {
  return { "15": 4, "13": 4, "9": 3, "6": 2, "4": 1, "3": 0 }[v] ?? 0;
}

const gcsOptions = [
  { value: "13", label: "13–15" }, { value: "9", label: "9–12" }, { value: "6", label: "6–8" },
  { value: "4", label: "4–5" }, { value: "3", label: "3" },
];
const sbpOptions = [
  { value: "4", label: ">89 мм рт.ст." }, { value: "3", label: "76–89" }, { value: "2", label: "50–75" },
  { value: "1", label: "1–49" }, { value: "0", label: "0 (нет пульса)" },
];
const rrOptions = [
  { value: "4", label: "10–29 в мин" }, { value: "3", label: ">29 в мин" }, { value: "2", label: "6–9 в мин" },
  { value: "1", label: "1–5 в мин" }, { value: "0", label: "0 (апноэ)" },
];

export default function RevisedTraumaCalculator() {
  const [gcs, setGcs] = useState("13");
  const [sbp, setSbp] = useState("4");
  const [rr, setRr] = useState("4");

  const gcsC = gcsCode(gcs);
  const sbpC = Number(sbp);
  const rrC = Number(rr);

  const rts = 0.9368 * gcsC + 0.7326 * sbpC + 0.2908 * rrC;
  const rounded = Number(rts.toFixed(2));

  const color = rounded >= 7 ? "border-emerald-300 bg-emerald-50" : rounded >= 4 ? "border-amber-300 bg-amber-50" : "border-red-300 bg-red-50";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="revised-trauma" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Шкала комы Глазго" value={gcs} onChange={setGcs} columns={1} options={gcsOptions} />
          <RadioCard label="Систолическое АД" value={sbp} onChange={setSbp} columns={1} options={sbpOptions} />
          <RadioCard label="Частота дыхания" value={rr} onChange={setRr} columns={1} options={rrOptions} />
        </div>

        <div className={`rounded-3xl border p-8 ${color}`}>
          <div className="text-sm text-gray-600">Revised Trauma Score</div>
          <div className="mt-2 text-5xl font-bold">{rounded}<span className="ml-2 text-lg font-normal">из 7.84</span></div>
          <p className="mt-4 text-sm text-gray-700">Чем ниже балл, тем выше тяжесть травмы и риск летальности.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        RTS = 0.9368 × код ШКГ + 0.7326 × код САД + 0.2908 × код ЧДД. Используется для сортировки и прогноза при травме, в том числе как компонент шкалы TRISS. Существует также «триажная» несвешенная версия (T-RTS) — простая сумма кодов 0–12, для быстрой сортировки на месте происшествия.
        <p className="mt-3 text-xs text-gray-500">Источник: Champion HR, et al. J Trauma. 1989;29(5):623-629.</p>
      </div>
    </div>
  );
}
