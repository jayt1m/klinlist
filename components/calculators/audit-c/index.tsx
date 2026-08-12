"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function AuditCCalculator() {
  const [sex, setSex] = useState("male");
  const [frequency, setFrequency] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [bingeFrequency, setBingeFrequency] = useState("0");

  const score = Number(frequency) + Number(quantity) + Number(bingeFrequency);

  const threshold = sex === "male" ? 4 : 3;
  const positive = score >= threshold;

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="audit-c" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">

          <RadioCard
            label="Пол"
            value={sex}
            onChange={setSex}
            columns={2}
            options={[
              { value: "male", label: "Мужской" },
              { value: "female", label: "Женский" },
            ]}
          />

          <RadioCard
            label="Как часто вы употребляете напитки, содержащие алкоголь?"
            value={frequency}
            onChange={setFrequency}
            options={[
              { value: "0", label: "Никогда" },
              { value: "1", label: "1 раз в месяц или реже" },
              { value: "2", label: "2–4 раза в месяц" },
              { value: "3", label: "2–3 раза в неделю" },
              { value: "4", label: "4 и более раз в неделю" },
            ]}
          />

          <RadioCard
            label="Сколько порций алкоголя вы обычно выпиваете в течение дня, когда пьёте?"
            value={quantity}
            onChange={setQuantity}
            options={[
              { value: "0", label: "1–2" },
              { value: "1", label: "3–4" },
              { value: "2", label: "5–6" },
              { value: "3", label: "7–9" },
              { value: "4", label: "10 и более" },
            ]}
          />

          <RadioCard
            label="Как часто вы выпиваете 6 и более порций за один раз?"
            value={bingeFrequency}
            onChange={setBingeFrequency}
            options={[
              { value: "0", label: "Никогда" },
              { value: "1", label: "Реже чем раз в месяц" },
              { value: "2", label: "Ежемесячно" },
              { value: "3", label: "Еженедельно" },
              { value: "4", label: "Ежедневно или почти ежедневно" },
            ]}
          />

        </div>

        <ResultCard
          score={score}
          unit="из 12"
          title="AUDIT-C"
          recommendation={
            positive
              ? "Положительный скрининг — вероятно рискованное употребление алкоголя"
              : "Отрицательный скрининг"
          }
          color={positive ? "red" : "green"}
        />

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
<p>
        Краткий скрининговый инструмент (сокращённая версия AUDIT) для
        выявления рискованного и вредного употребления алкоголя.
        Порог положительного результата: ≥4 балла для мужчин, ≥3 балла
        для женщин. Положительный результат — повод для более
        развёрнутой оценки, а не диагноз.
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Источник: Bush K, et al.
        Arch Intern Med. 1998;158(16):1789-1795.
        </p>
      </div>

    </div>
  );
}
