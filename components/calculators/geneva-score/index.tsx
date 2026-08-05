"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function GenevaScoreCalculator() {
  const [age65, setAge65] = useState(false);
  const [previousVte, setPreviousVte] = useState(false);
  const [surgery, setSurgery] = useState(false);
  const [malignancy, setMalignancy] = useState(false);
  const [legPain, setLegPain] = useState(false);
  const [hemoptysis, setHemoptysis] = useState(false);
  const [heartRate, setHeartRate] = useState("0");
  const [palpationEdema, setPalpationEdema] = useState(false);

  const score =
    Number(age65) +
    Number(previousVte) * 3 +
    Number(surgery) * 2 +
    Number(malignancy) * 2 +
    Number(legPain) * 3 +
    Number(hemoptysis) * 2 +
    Number(heartRate) +
    Number(palpationEdema) * 4;

  const category = score <= 3 ? "low" : score <= 10 ? "moderate" : "high";
  const color = category === "low" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "low" ? "Низкая вероятность" : category === "moderate" ? "Умеренная вероятность" : "Высокая вероятность";
  const rate = category === "low" ? "8" : category === "moderate" ? "20–30" : "60";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="geneva-score" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">

          <CheckboxCard title="Возраст >65 лет" points={1} checked={age65} onChange={() => setAge65(!age65)} />
          <CheckboxCard title="ТГВ или ТЭЛА в анамнезе" points={3} checked={previousVte} onChange={() => setPreviousVte(!previousVte)} />
          <CheckboxCard title="Операция под наркозом или перелом ноги за последний месяц" points={2} checked={surgery} onChange={() => setSurgery(!surgery)} />
          <CheckboxCard title="Активное онкозаболевание" points={2} checked={malignancy} onChange={() => setMalignancy(!malignancy)} />
          <CheckboxCard title="Односторонняя боль в ноге" points={3} checked={legPain} onChange={() => setLegPain(!legPain)} />
          <CheckboxCard title="Кровохарканье" points={2} checked={hemoptysis} onChange={() => setHemoptysis(!hemoptysis)} />

          <RadioCard
            label="Частота сердечных сокращений"
            value={heartRate}
            onChange={setHeartRate}
            options={[
              { value: "0", label: "<75 в минуту" },
              { value: "3", label: "75–94 в минуту" },
              { value: "5", label: "≥95 в минуту" },
            ]}
          />

          <CheckboxCard
            title="Боль при пальпации глубоких вен ноги и односторонний отёк"
            points={4}
            checked={palpationEdema}
            onChange={() => setPalpationEdema(!palpationEdema)}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 22"
          title="Пересмотренная Женевская шкала"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">Распространённость ТЭЛА в этой группе</div>
            <div className="mt-1 text-2xl font-bold">{rate}%</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Альтернатива шкале Wells для оценки вероятности ТЭЛА, не
        требующая клинического «гештальта» врача — построена только на
        объективных критериях. Источник: Le Gal G, et al. Ann Intern
        Med. 2006;144(3):165-171.
      </div>

    </div>
  );
}
