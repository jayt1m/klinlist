"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function BodeCalculator() {
  const [bmi, setBmi] = useState("0");
  const [fev1, setFev1] = useState("0");
  const [distance, setDistance] = useState("0");
  const [mmrc, setMmrc] = useState("0");

  const score = Number(bmi) + Number(fev1) + Number(distance) + Number(mmrc);
  const category = score <= 2 ? "low" : score <= 4 ? "mid" : score <= 6 ? "high" : "veryhigh";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const survival = { low: "80%", mid: "67%", high: "57%", veryhigh: "18%" }[category];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="bode" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="ИМТ" value={bmi} onChange={setBmi} columns={2}
            options={[{ value: "0", label: ">21 кг/м²" }, { value: "1", label: "≤21 кг/м²" }]} />
          <RadioCard label="ОФВ1 (% от должного)" value={fev1} onChange={setFev1}
            options={[{ value: "0", label: "≥65%" }, { value: "1", label: "50–64%" }, { value: "2", label: "36–49%" }, { value: "3", label: "≤35%" }]} />
          <RadioCard label="Дистанция 6-минутной ходьбы" value={distance} onChange={setDistance}
            options={[{ value: "0", label: "≥350 м" }, { value: "1", label: "250–349 м" }, { value: "2", label: "150–249 м" }, { value: "3", label: "≤149 м" }]} />
          <RadioCard label="Одышка по mMRC" value={mmrc} onChange={setMmrc}
            options={[{ value: "0", label: "0–1" }, { value: "1", label: "2" }, { value: "2", label: "3" }, { value: "3", label: "4" }]} />
        </div>

        <ResultCard score={score} unit="из 10" title="BODE Index" recommendation={`4-летняя выживаемость: ~${survival}`} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Многомерная шкала прогноза при ХОБЛ — сочетает индекс массы тела (B), обструкцию (O, ОФВ1), одышку (D) и переносимость нагрузки (E). Точнее предсказывает смертность, чем изолированный ОФВ1.
        <p className="mt-3 text-xs text-gray-500">Источник: Celli BR, et al. N Engl J Med. 2004;350(10):1005-1012.</p>
      </div>
    </div>
  );
}
