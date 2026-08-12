"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const mortalityByScore: Record<number, string> = { 0: "0", 1: "13", 2: "26", 3: "72", 4: "97", 5: "100", 6: "100" };

export default function IchScoreCalculator() {
  const [gcs, setGcs] = useState("0");
  const [age80, setAge80] = useState(false);
  const [infratentorial, setInfratentorial] = useState(false);
  const [volume30, setVolume30] = useState(false);
  const [ivh, setIvh] = useState(false);

  const score = Number(gcs) + Number(age80) + Number(infratentorial) + Number(volume30) + Number(ivh);
  const color = score === 0 ? "green" : score <= 2 ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="ich-score" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Шкала комы Глазго при поступлении" value={gcs} onChange={setGcs}
            options={[{ value: "0", label: "13–15" }, { value: "1", label: "5–12" }, { value: "2", label: "3–4" }]} />
          <div className="space-y-4">
            <CheckboxCard title="Возраст ≥80 лет" points={1} checked={age80} onChange={() => setAge80(!age80)} />
            <CheckboxCard title="Инфратенториальная локализация" description="Ствол мозга или мозжечок" points={1} checked={infratentorial} onChange={() => setInfratentorial(!infratentorial)} />
            <CheckboxCard title="Объём гематомы ≥30 см³" points={1} checked={volume30} onChange={() => setVolume30(!volume30)} />
            <CheckboxCard title="Внутрижелудочковое кровоизлияние" points={1} checked={ivh} onChange={() => setIvh(!ivh)} />
          </div>
        </div>

        <ResultCard score={score} unit="из 6" title="ICH Score" recommendation={`30-дневная летальность: ${mortalityByScore[score]}%`} color={color} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Прогностическая шкала при спонтанном внутримозговом кровоизлиянии — оценивает 30-дневную летальность. Не заменяет комплексную нейрохирургическую оценку.
        <p className="mt-3 text-xs text-gray-500">Источник: Hemphill JC 3rd, et al. Stroke. 2001;32(4):891-897.</p>
      </div>
    </div>
  );
}
