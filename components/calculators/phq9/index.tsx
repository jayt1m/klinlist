"use client";

import { useState } from "react";
import { CircleAlert } from "lucide-react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const freqOptions = [
  { value: "0", label: "Совсем нет" },
  { value: "1", label: "Несколько дней" },
  { value: "2", label: "Более половины дней" },
  { value: "3", label: "Почти каждый день" },
];

export default function PHQ9Calculator() {
  const [interest, setInterest] = useState("0");
  const [mood, setMood] = useState("0");
  const [sleep, setSleep] = useState("0");
  const [energy, setEnergy] = useState("0");
  const [appetite, setAppetite] = useState("0");
  const [selfWorth, setSelfWorth] = useState("0");
  const [concentration, setConcentration] = useState("0");
  const [psychomotor, setPsychomotor] = useState("0");
  const [selfHarm, setSelfHarm] = useState("0");

  const score =
    Number(interest) +
    Number(mood) +
    Number(sleep) +
    Number(energy) +
    Number(appetite) +
    Number(selfWorth) +
    Number(concentration) +
    Number(psychomotor) +
    Number(selfHarm);

  const category =
    score <= 4 ? "minimal" : score <= 9 ? "mild" : score <= 14 ? "moderate" : score <= 19 ? "modsevere" : "severe";

  const color =
    category === "minimal" ? "green" : category === "mild" ? "green" : category === "moderate" ? "yellow" : "red";

  const label =
    category === "minimal"
      ? "Минимальная выраженность симптомов"
      : category === "mild"
        ? "Лёгкая депрессия"
        : category === "moderate"
          ? "Умеренная депрессия"
          : category === "modsevere"
            ? "Умеренно тяжёлая депрессия"
            : "Тяжёлая депрессия";

  const selfHarmPositive = Number(selfHarm) > 0;

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="phq9" />

      <p className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
        За последние 2 недели, как часто вас беспокоило что-либо из
        перечисленного ниже?
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard label="Мало интереса или удовольствия от дел" value={interest} onChange={setInterest} options={freqOptions} columns={2} />
          <RadioCard label="Подавленность, депрессия или чувство безнадёжности" value={mood} onChange={setMood} options={freqOptions} columns={2} />
          <RadioCard label="Проблемы с засыпанием, прерывистый сон или, наоборот, сонливость" value={sleep} onChange={setSleep} options={freqOptions} columns={2} />
          <RadioCard label="Усталость или упадок сил" value={energy} onChange={setEnergy} options={freqOptions} columns={2} />
          <RadioCard label="Плохой аппетит или переедание" value={appetite} onChange={setAppetite} options={freqOptions} columns={2} />
          <RadioCard label="Недовольство собой, ощущение неудачника, чувство вины перед семьёй" value={selfWorth} onChange={setSelfWorth} options={freqOptions} columns={2} />
          <RadioCard label="Трудности с концентрацией внимания (чтение, просмотр телевизора)" value={concentration} onChange={setConcentration} options={freqOptions} columns={2} />
          <RadioCard label="Замедленность движений/речи либо, наоборот, двигательное беспокойство, которые заметны окружающим" value={psychomotor} onChange={setPsychomotor} options={freqOptions} columns={2} />
          <RadioCard label="Мысли о том, что было бы лучше умереть, или мысли причинить себе вред" value={selfHarm} onChange={setSelfHarm} options={freqOptions} columns={2} />

        </div>

        <div className="space-y-6">

          <ResultCard
            score={score}
            unit="из 27"
            title="PHQ-9"
            recommendation={label}
            color={color}
          />

          {selfHarmPositive && (

            <div className="rounded-2xl border border-red-300 bg-red-50 p-6">

              <div className="mb-2 flex items-center gap-2">
                <CircleAlert className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Требуется внимание</h3>
              </div>

              <p className="text-sm leading-6 text-red-900">
                Положительный ответ на 9-й пункт требует прямой очной
                оценки суицидального риска независимо от общего балла
                — этот пункт не следует интерпретировать только через
                сумму баллов.
              </p>

            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Инструмент скрининга выраженности депрессивной симптоматики, не
        заменяет клиническую диагностику. Источник: Kroenke K, Spitzer
        RL, Williams JB. J Gen Intern Med. 2001;16(9):606-613.
      </div>

    </div>
  );
}
