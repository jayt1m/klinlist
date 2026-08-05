"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ResultCard from "@/components/ui/ResultCard";

export default function FIB4Calculator() {
  const [age, setAge] = useState("");
  const [ast, setAst] = useState("");
  const [alt, setAlt] = useState("");
  const [platelets, setPlatelets] = useState("");

  const result = useMemo(() => {
    if (!age || !ast || !alt || !platelets) return null;

    const value =
      (Number(age) * Number(ast)) /
      (Number(platelets) * Math.sqrt(Number(alt)));

    return Number(value.toFixed(2));
  }, [age, ast, alt, platelets]);

  const category =
    result === null ? null : result < 1.45 ? "low" : result <= 3.25 ? "mid" : "high";

  const color = category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label =
    category === "low"
      ? "Низкая вероятность выраженного фиброза"
      : category === "mid"
        ? "Неопределённый результат — нужна доп. диагностика"
        : "Высокая вероятность выраженного фиброза";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="fib4" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <InputWithUnit label="Возраст" value={age} unit="лет" onChange={setAge} />
            <InputWithUnit label="АСТ" value={ast} unit="Ед/л" onChange={setAst} />
            <InputWithUnit label="АЛТ" value={alt} unit="Ед/л" onChange={setAlt} />
            <InputWithUnit label="Тромбоциты" value={platelets} unit="×10⁹/л" onChange={setPlatelets} />

          </div>

        </div>

        <div>

          {result !== null ? (

            <ResultCard
              score={result}
              unit=""
              title="Индекс FIB-4"
              recommendation={label}
              color={color}
            />

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите возраст, АСТ, АЛТ и тромбоциты.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          FIB-4 = (возраст × АСТ) / (тромбоциты × √АЛТ). Пороги:
          &lt;1.45 — фиброз маловероятен; 1.45–3.25 — неопределённо,
          показана эластография печени (FibroScan) или ELF-тест;
          &gt;3.25 — высока вероятность выраженного фиброза, показана
          консультация гепатолога. У пациентов ≥65 лет специфичность
          снижается за счёт возраста в числителе — часть источников
          предлагает повышать порог низкого риска до &lt;2.0 в этой
          группе. Индекс не заменяет биопсию при явных клинических
          показаниях к ней.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Sterling RK, et al. Hepatology.
          2006;43(6):1317-1325.
        </p>
      </div>

    </div>
  );
}
