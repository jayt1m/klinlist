"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function LrinecCalculator() {
  const [crp, setCrp] = useState("0");
  const [wbc, setWbc] = useState("0");
  const [hb, setHb] = useState("0");
  const [sodium, setSodium] = useState("0");
  const [creatinine, setCreatinine] = useState("0");
  const [glucose, setGlucose] = useState("0");

  const score = Number(crp) + Number(wbc) + Number(hb) + Number(sodium) + Number(creatinine) + Number(glucose);
  const category = score <= 5 ? "low" : score <= 7 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = category === "low" ? "Низкий риск (<50%)" : category === "mid" ? "Промежуточный риск (50–75%)" : "Высокий риск (>75%)";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="lrinec" />
      <div className="rounded-2xl border border-red-300 bg-red-50 p-5 text-sm text-red-900">
        Некротизирующий фасциит — хирургическая неотложность. Низкий балл НЕ исключает диагноз: при клиническом подозрении (боль, непропорциональная находкам, быстрое прогрессирование, крепитация, буллы, системная токсичность) показана срочная хирургическая ревизия независимо от шкалы.
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="С-реактивный белок" value={crp} onChange={setCrp} columns={2}
            options={[{ value: "0", label: "<150 мг/л" }, { value: "4", label: "≥150 мг/л" }]} />
          <RadioCard label="Лейкоциты" value={wbc} onChange={setWbc}
            options={[{ value: "0", label: "<15 ×10⁹/л" }, { value: "1", label: "15–25 ×10⁹/л" }, { value: "2", label: ">25 ×10⁹/л" }]} />
          <RadioCard label="Гемоглобин" value={hb} onChange={setHb}
            options={[{ value: "0", label: ">135 г/л" }, { value: "1", label: "110–135 г/л" }, { value: "2", label: "<110 г/л" }]} />
          <RadioCard label="Натрий" value={sodium} onChange={setSodium} columns={2}
            options={[{ value: "0", label: "≥135 ммоль/л" }, { value: "2", label: "<135 ммоль/л" }]} />
          <RadioCard label="Креатинин" value={creatinine} onChange={setCreatinine} columns={2}
            options={[{ value: "0", label: "≤141 мкмоль/л" }, { value: "2", label: ">141 мкмоль/л" }]} />
          <RadioCard label="Глюкоза" value={glucose} onChange={setGlucose} columns={2}
            options={[{ value: "0", label: "≤10 ммоль/л" }, { value: "1", label: ">10 ммоль/л" }]} />
        </div>
        <ResultCard score={score} unit="из 13" title="LRINEC" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Лабораторный индикатор риска некротизирующего фасциита — вспомогательный инструмент для дифференциации некротизирующей инфекции мягких тканей от тяжёлого целлюлита. Последующие валидационные исследования показали более низкую чувствительность, чем в оригинальной работе, поэтому шкала не должна использоваться для исключения диагноза.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Wong CH, et al. Crit Care Med. 2004;32(7):1535-1541.</p>
      </div>
    </div>
  );
}
