"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function BishopScoreCalculator() {
  const [dilation, setDilation] = useState("0");
  const [effacement, setEffacement] = useState("0");
  const [station, setStation] = useState("0");
  const [consistency, setConsistency] = useState("0");
  const [position, setPosition] = useState("0");

  const score =
    Number(dilation) +
    Number(effacement) +
    Number(station) +
    Number(consistency) +
    Number(position);

  const favorable = score >= 8;
  const color = favorable ? "green" : score <= 6 ? "red" : "yellow";
  const label = favorable
    ? "Благоприятная («зрелая») шейка матки"
    : score <= 6
      ? "Неблагоприятная («незрелая») шейка матки"
      : "Промежуточный результат";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="bishop-score" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard
            label="Раскрытие шейки матки"
            value={dilation}
            onChange={setDilation}
            options={[
              { value: "0", label: "Закрыта" },
              { value: "1", label: "1–2 см" },
              { value: "2", label: "3–4 см" },
              { value: "3", label: "≥5 см" },
            ]}
          />

          <RadioCard
            label="Сглаживание шейки матки"
            value={effacement}
            onChange={setEffacement}
            options={[
              { value: "0", label: "0–30%" },
              { value: "1", label: "40–50%" },
              { value: "2", label: "60–70%" },
              { value: "3", label: "≥80%" },
            ]}
          />

          <RadioCard
            label="Положение предлежащей части (станция)"
            value={station}
            onChange={setStation}
            options={[
              { value: "0", label: "-3" },
              { value: "1", label: "-2" },
              { value: "2", label: "-1 / 0" },
              { value: "3", label: "+1 / +2" },
            ]}
          />

          <RadioCard
            label="Консистенция шейки матки"
            value={consistency}
            onChange={setConsistency}
            columns={3}
            options={[
              { value: "0", label: "Плотная" },
              { value: "1", label: "Средняя" },
              { value: "2", label: "Мягкая" },
            ]}
          />

          <RadioCard
            label="Положение шейки матки"
            value={position}
            onChange={setPosition}
            columns={3}
            options={[
              { value: "0", label: "Кзади" },
              { value: "1", label: "Срединное" },
              { value: "2", label: "Кпереди" },
            ]}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 13"
          title="Шкала Бишопа"
          recommendation={label}
          color={color}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
<p>
        Оценка готовности шейки матки к индукции родов. Балл ≥8
        ассоциирован с высокой вероятностью успешной индукции и
        вагинальных родов, ≤6 — с низкой (обычно требует применения
        средств для созревания шейки матки перед индукцией). Метод
        субъективен и зависит от исследователя.
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Источник: Bishop EH.
        Obstet Gynecol. 1964;24:266-268.
        </p>
      </div>

    </div>
  );
}
