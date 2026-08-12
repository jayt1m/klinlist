"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const mortalityBands = [
  { max: 6, label: "<10%" }, { max: 9, label: "15–20%" }, { max: 12, label: "40–50%" },
  { max: 14, label: "50–60%" }, { max: 24, label: ">80%" },
];

export default function SofaCalculator() {
  const [resp, setResp] = useState("0");
  const [coag, setCoag] = useState("0");
  const [liver, setLiver] = useState("0");
  const [cardio, setCardio] = useState("0");
  const [cns, setCns] = useState("0");
  const [renal, setRenal] = useState("0");

  const score = Number(resp) + Number(coag) + Number(liver) + Number(cardio) + Number(cns) + Number(renal);
  const band = mortalityBands.find((b) => score <= b.max)!;
  const color = score <= 6 ? "green" : score <= 9 ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="sofa" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Дыхание: PaO₂/FiO₂, мм рт.ст." value={resp} onChange={setResp} columns={1}
            options={[
              { value: "0", label: "≥400" }, { value: "1", label: "300–399" },
              { value: "2", label: "200–299" }, { value: "3", label: "100–199, на респираторной поддержке" },
              { value: "4", label: "<100, на респираторной поддержке" },
            ]} />

          <RadioCard label="Коагуляция: тромбоциты, ×10³/мкл" value={coag} onChange={setCoag}
            options={[{ value: "0", label: "≥150" }, { value: "1", label: "100–149" }, { value: "2", label: "50–99" }, { value: "3", label: "20–49" }, { value: "4", label: "<20" }]} columns={1} />

          <RadioCard label="Печень: билирубин, мкмоль/л" value={liver} onChange={setLiver}
            options={[{ value: "0", label: "<20" }, { value: "1", label: "20–32" }, { value: "2", label: "33–101" }, { value: "3", label: "102–204" }, { value: "4", label: ">204" }]} columns={1} />

          <RadioCard label="Сердечно-сосудистая: АД/вазопрессоры" value={cardio} onChange={setCardio} columns={1}
            options={[
              { value: "0", label: "САД ≥70 мм рт.ст." },
              { value: "1", label: "САД <70 мм рт.ст." },
              { value: "2", label: "Допамин <5 или добутамин (любая доза)" },
              { value: "3", label: "Допамин 5.1–15, адреналин ≤0.1, норадреналин ≤0.1 мкг/кг/мин" },
              { value: "4", label: "Допамин >15, адреналин >0.1, норадреналин >0.1 мкг/кг/мин" },
            ]} />

          <RadioCard label="ЦНС: шкала комы Глазго" value={cns} onChange={setCns}
            options={[{ value: "0", label: "15" }, { value: "1", label: "13–14" }, { value: "2", label: "10–12" }, { value: "3", label: "6–9" }, { value: "4", label: "<6" }]} columns={1} />

          <RadioCard label="Почки: креатинин, мкмоль/л" value={renal} onChange={setRenal}
            options={[{ value: "0", label: "<110" }, { value: "1", label: "110–170" }, { value: "2", label: "171–299" }, { value: "3", label: "300–440 (или диурез <500 мл/сут)" }, { value: "4", label: ">440 (или диурез <200 мл/сут)" }]} columns={1} />
        </div>

        <ResultCard score={score} unit="из 24" title="SOFA" recommendation={`Госпитальная летальность: ${band.label}`} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Оценка выраженности полиорганной дисфункции в ОРИТ. По критериям Сепсис-3 нарастание SOFA на ≥2 балла на фоне подозреваемой/подтверждённой инфекции определяет сепсис. Оценивается по худшим значениям за 24 часа.
        <p className="mt-3 text-xs text-gray-500">Источник: Vincent JL, et al. Intensive Care Med. 1996;22(7):707-710.</p>
      </div>
    </div>
  );
}
