"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

import { calculateCockcroftGault } from "@/components/calculators/ckd-epi/formulas";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export default function PreciseDaptCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [creatinine, setCreatinine] = useState("");
  const [hemoglobin, setHemoglobin] = useState(""); // г/л
  const [wbc, setWbc] = useState(""); // ×10^9/л
  const [priorBleeding, setPriorBleeding] = useState(false);

  const isValid =
    age !== "" && weight !== "" && creatinine !== "" &&
    hemoglobin !== "" && wbc !== "";

  const result = useMemo(() => {
    if (!isValid) return null;

    const crCl = calculateCockcroftGault({
      sex,
      age: Number(age),
      weight: Number(weight),
      creatinine: Number(creatinine),
      creatinineUnit: "umol",
    });

    const hgbGdl = Number(hemoglobin) / 10;

    const agePoints = 19 * clamp((Number(age) - 50) / 40, 0, 1);
    const crClPoints = 25 * clamp((100 - crCl) / 100, 0, 1);
    const hgbPoints = 15 * clamp((12 - hgbGdl) / 2, 0, 1);
    const wbcPoints = 15 * clamp((Number(wbc) - 5) / 15, 0, 1);
    const bleedingPoints = priorBleeding ? 26 : 0;

    const score = Math.round(
      agePoints + crClPoints + hgbPoints + wbcPoints + bleedingPoints
    );

    return { score, crCl };
  }, [isValid, age, weight, sex, creatinine, hemoglobin, wbc, priorBleeding]);

  const highRisk = result !== null && result.score >= 25;

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="precise-dapt" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <RadioCard
              label="Пол"
              value={sex}
              onChange={(v) => setSex(v as "male" | "female")}
              columns={2}
              options={[
                { value: "male", label: "Мужской" },
                { value: "female", label: "Женский" },
              ]}
            />

            <InputWithUnit label="Возраст" value={age} unit="лет" onChange={setAge} />
            <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            <InputWithUnit label="Креатинин" value={creatinine} unit="мкмоль/л" onChange={setCreatinine} />
            <InputWithUnit label="Гемоглобин" value={hemoglobin} unit="г/л" onChange={setHemoglobin} />
            <InputWithUnit label="Лейкоциты" value={wbc} unit="×10⁹/л" onChange={setWbc} />

            <CheckboxCard
              title="Спонтанное кровотечение в анамнезе"
              points={26}
              checked={priorBleeding}
              onChange={() => setPriorBleeding(!priorBleeding)}
            />

          </div>

        </div>

        <div>

          {result !== null ? (

            <ResultCard
              score={result.score}
              unit="из 100"
              title="PRECISE-DAPT"
              recommendation={
                highRisk
                  ? "Высокий риск кровотечения — рассмотреть сокращённую ДАТТ (3–6 мес.)"
                  : "Высокий риск не выявлен — можно рассматривать стандартную/продлённую ДАТТ (≥12 мес.)"
              }
              color={highRisk ? "red" : "green"}
            >
              <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
                <div className="text-sm text-zinc-500">Клиренс креатинина (Cockcroft-Gault)</div>
                <div className="mt-1 text-lg font-semibold">{result.crCl.toFixed(0)} мл/мин</div>
              </div>
            </ResultCard>

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Клиренс креатинина рассчитывается автоматически.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Помогает определить оптимальную длительность двойной
        антиагрегантной терапии (ДАТТ) после стентирования: балл ≥25
        указывает на высокий риск внегоспитального кровотечения и
        довод в пользу более короткого курса ДАТТ. Оригинальная шкала
        использует номограмму — здесь применена линейная аппроксимация
        по опубликованным контрольным точкам, поэтому при значениях
        около порога 25 баллов возможны небольшие расхождения с
        графическим инструментом. Источник: Costa F, et al. Lancet.
        2017;389(10073):1025-1034.
      </div>

    </div>
  );
}
