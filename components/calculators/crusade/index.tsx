"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import CheckboxCard from "@/components/ui/CheckboxCard";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

import { calculateCockcroftGault } from "@/components/calculators/ckd-epi/formulas";

function heartRatePoints(hr: number): number {
  if (hr <= 70) return 0;
  if (hr <= 80) return 1;
  if (hr <= 90) return 3;
  if (hr <= 100) return 6;
  if (hr <= 110) return 8;
  if (hr <= 120) return 10;
  return 11;
}

function sbpPoints(sbp: number): number {
  if (sbp <= 90) return 10;
  if (sbp <= 100) return 8;
  if (sbp <= 120) return 5;
  if (sbp <= 180) return 1;
  if (sbp <= 200) return 3;
  return 5;
}

function hematocritPoints(hct: number): number {
  if (hct < 31) return 9;
  if (hct < 34) return 7;
  if (hct < 37) return 3;
  if (hct < 40) return 2;
  return 0;
}

function crClPoints(crcl: number): number {
  if (crcl <= 15) return 39;
  if (crcl <= 30) return 35;
  if (crcl <= 60) return 28;
  if (crcl <= 90) return 17;
  if (crcl <= 120) return 7;
  return 0;
}

export default function CrusadeCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState<"male" | "female" | "">("");
  const [creatinine, setCreatinine] = useState("");

  const [heartRate, setHeartRate] = useState("");
  const [sbp, setSbp] = useState("");
  const [hematocrit, setHematocrit] = useState("");

  const [chf, setChf] = useState(false);
  const [vascular, setVascular] = useState(false);
  const [diabetes, setDiabetes] = useState(false);

  const isValid =
    sex !== "" &&
    age !== "" && weight !== "" && creatinine !== "" &&
    heartRate !== "" && sbp !== "" && hematocrit !== "";

  const result = useMemo(() => {
    if (!isValid) return null;

    const crCl = calculateCockcroftGault({
      sex: sex as "male" | "female",
      age: Number(age),
      weight: Number(weight),
      creatinine: Number(creatinine),
      creatinineUnit: "umol",
    });

    const score =
      heartRatePoints(Number(heartRate)) +
      sbpPoints(Number(sbp)) +
      hematocritPoints(Number(hematocrit)) +
      crClPoints(crCl) +
      (sex === "female" ? 8 : 0) +
      Number(chf) * 7 +
      Number(vascular) * 6 +
      Number(diabetes) * 6;

    return { score, crCl };
  }, [isValid, age, weight, sex, creatinine, heartRate, sbp, hematocrit, chf, vascular, diabetes]);

  const category =
    result === null
      ? null
      : result.score <= 20
        ? "verylow"
        : result.score <= 30
          ? "low"
          : result.score <= 40
            ? "moderate"
            : result.score <= 50
              ? "high"
              : "veryhigh";

  const color =
    category === "verylow" || category === "low"
      ? "green"
      : category === "moderate"
        ? "yellow"
        : "red";

  const label: Record<string, string> = {
    verylow: "Очень низкий риск",
    low: "Низкий риск",
    moderate: "Умеренный риск",
    high: "Высокий риск",
    veryhigh: "Очень высокий риск",
  };

  const rate: Record<string, string> = {
    verylow: "3.1",
    low: "5.5",
    moderate: "8.6",
    high: "11.9",
    veryhigh: "19.5",
  };


  const resultRef = useScrollToResult(result !== null);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="crusade" />

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
            <InputWithUnit label="ЧСС" value={heartRate} unit="уд/мин" onChange={setHeartRate} />
            <InputWithUnit label="Систолическое АД" value={sbp} unit="мм рт.ст." onChange={setSbp} />
            <InputWithUnit label="Гематокрит" value={hematocrit} unit="%" onChange={setHematocrit} />

            <div className="space-y-3">
              <CheckboxCard title="Признаки СН при поступлении" points={7} checked={chf} onChange={() => setChf(!chf)} />
              <CheckboxCard title="Заболевание периферических артерий или инсульт в анамнезе" points={6} checked={vascular} onChange={() => setVascular(!vascular)} />
              <CheckboxCard title="Сахарный диабет" points={6} checked={diabetes} onChange={() => setDiabetes(!diabetes)} />
            </div>

          </div>

        </div>

        <div ref={resultRef}>

          {result !== null && category !== null ? (

            <ResultCard
              score={result.score}
              unit="из 100"
              title="CRUSADE"
              recommendation={label[category]}
              color={color}
            >
              <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
                <div className="text-sm text-zinc-500">Частота крупных кровотечений в стационаре</div>
                <div className="mt-1 text-2xl font-bold">{rate[category]}%</div>
              </div>

              <div className="mt-3 rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
                <div className="text-sm text-zinc-500">Клиренс креатинина (Cockcroft-Gault)</div>
                <div className="mt-1 text-lg font-semibold">{result.crCl.toFixed(0)} мл/мин</div>
              </div>
            </ResultCard>

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Клиренс креатинина рассчитывается автоматически по
                  формуле Cockcroft-Gault.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
<p>
        Оценка риска крупного кровотечения в стационаре у пациентов с
        ОКС без подъёма ST перед началом антитромботической терапии.
        Используется наряду с ишемическими шкалами (GRACE, TIMI) для
        поиска баланса между пользой и риском.
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Источник: Subherwal S,
        et al. Circulation. 2009;119(14):1873-1882.
        </p>
      </div>

    </div>
  );
}
