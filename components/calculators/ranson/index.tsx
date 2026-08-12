"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function RansonCalculator() {
  const [age, setAge] = useState(false);
  const [wbc, setWbc] = useState(false);
  const [glucose, setGlucose] = useState(false);
  const [ldh, setLdh] = useState(false);
  const [ast, setAst] = useState(false);

  const [hctDrop, setHctDrop] = useState(false);
  const [bunRise, setBunRise] = useState(false);
  const [calcium, setCalcium] = useState(false);
  const [pao2, setPao2] = useState(false);
  const [baseDeficit, setBaseDeficit] = useState(false);
  const [fluidSeq, setFluidSeq] = useState(false);

  const admission = [age, wbc, glucose, ldh, ast].filter(Boolean).length;
  const at48h = [hctDrop, bunRise, calcium, pao2, baseDeficit, fluidSeq].filter(Boolean).length;
  const score = admission + at48h;

  const category = score <= 2 ? "low" : score <= 5 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const mortality = category === "low" ? "0–3%" : category === "mid" ? "11–15%" : "≥40%";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="ranson" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">При поступлении</h2>
            <div className="space-y-4">
              <CheckboxCard title="Возраст >55 лет" points={1} checked={age} onChange={() => setAge(!age)} />
              <CheckboxCard title="Лейкоциты >16×10⁹/л" points={1} checked={wbc} onChange={() => setWbc(!wbc)} />
              <CheckboxCard title="Глюкоза >11.1 ммоль/л" points={1} checked={glucose} onChange={() => setGlucose(!glucose)} />
              <CheckboxCard title="ЛДГ >350 Ед/л" points={1} checked={ldh} onChange={() => setLdh(!ldh)} />
              <CheckboxCard title="АСТ >250 Ед/л" points={1} checked={ast} onChange={() => setAst(!ast)} />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">Через 48 часов</h2>
            <div className="space-y-4">
              <CheckboxCard title="Снижение гематокрита >10%" points={1} checked={hctDrop} onChange={() => setHctDrop(!hctDrop)} />
              <CheckboxCard title="Повышение мочевины >1.8 ммоль/л, несмотря на инфузию" points={1} checked={bunRise} onChange={() => setBunRise(!bunRise)} />
              <CheckboxCard title="Кальций <2.0 ммоль/л" points={1} checked={calcium} onChange={() => setCalcium(!calcium)} />
              <CheckboxCard title="paO₂ <60 мм рт.ст." points={1} checked={pao2} onChange={() => setPao2(!pao2)} />
              <CheckboxCard title="Дефицит оснований >4 мэкв/л" points={1} checked={baseDeficit} onChange={() => setBaseDeficit(!baseDeficit)} />
              <CheckboxCard title="Секвестрация жидкости >6 л" points={1} checked={fluidSeq} onChange={() => setFluidSeq(!fluidSeq)} />
            </div>
          </div>
        </div>

        <ResultCard score={score} unit="из 11" title="Критерии Ranson" recommendation={`Летальность: ${mortality}`} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Для неалкогольного/небилиарного панкреатита; для билиарного панкреатита пороги части критериев отличаются. Полный балл доступен только через 48 часов — для более ранней оценки предпочтительны BISAP или APACHE II.
        <p className="mt-3 text-xs text-gray-500">Источник: Ranson JH, et al. Surg Gynecol Obstet. 1974;139(1):69-81.</p>
      </div>
    </div>
  );
}
