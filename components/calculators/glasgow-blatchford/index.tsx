"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import CheckboxCard from "@/components/ui/CheckboxCard";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function GlasgowBlatchfordCalculator() {
  const [urea, setUrea] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [sex, setSex] = useState<"male" | "female" | "">("");
  const [sbp, setSbp] = useState("");

  const [pulse, setPulse] = useState(false);
  const [melena, setMelena] = useState(false);
  const [syncope, setSyncope] = useState(false);
  const [hepatic, setHepatic] = useState(false);
  const [cardiac, setCardiac] = useState(false);

  const isValid = sex !== "" && urea !== "" && hemoglobin !== "" && sbp !== "";

  function ureaPoints(v: number) {
    if (v < 6.5) return 0;
    if (v < 8) return 2;
    if (v < 10) return 3;
    if (v < 25) return 4;
    return 6;
  }

  function hbPoints(v: number, isMale: boolean) {
    if (isMale) {
      if (v >= 130) return 0;
      if (v >= 120) return 1;
      if (v >= 100) return 3;
      return 6;
    }
    if (v >= 120) return 0;
    if (v >= 100) return 1;
    return 6;
  }

  function sbpPoints(v: number) {
    if (v >= 110) return 0;
    if (v >= 100) return 1;
    if (v >= 90) return 2;
    return 3;
  }

  const score = isValid
    ? ureaPoints(Number(urea)) +
      hbPoints(Number(hemoglobin), sex === "male") +
      sbpPoints(Number(sbp)) +
      Number(pulse) +
      Number(melena) +
      Number(syncope) * 2 +
      Number(hepatic) * 2 +
      Number(cardiac) * 2
    : null;

  const lowRisk = score === 0;


  const resultRef = useScrollToResult(score !== null);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="glasgow-blatchford" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <InputWithUnit label="Мочевина" value={urea} unit="ммоль/л" onChange={setUrea} />

            <RadioCard
              label="Пол"
              value={sex}
              onChange={(v) => setSex(v as "male" | "female")}
              columns={2}
              options={[
                { value: "male", label: "Мужчина" },
                { value: "female", label: "Женщина" },
              ]}
            />

            <InputWithUnit label="Гемоглобин" value={hemoglobin} unit="г/л" onChange={setHemoglobin} />
            <InputWithUnit label="Систолическое АД" value={sbp} unit="мм рт.ст." onChange={setSbp} />

            <div className="space-y-3">
              <CheckboxCard title="ЧСС ≥100 в минуту" points={1} checked={pulse} onChange={() => setPulse(!pulse)} />
              <CheckboxCard title="Мелена" points={1} checked={melena} onChange={() => setMelena(!melena)} />
              <CheckboxCard title="Синкопе" points={2} checked={syncope} onChange={() => setSyncope(!syncope)} />
              <CheckboxCard title="Заболевание печени в анамнезе" points={2} checked={hepatic} onChange={() => setHepatic(!hepatic)} />
              <CheckboxCard title="Сердечная недостаточность" points={2} checked={cardiac} onChange={() => setCardiac(!cardiac)} />
            </div>

          </div>

        </div>

        <div ref={resultRef}>

          {score !== null ? (

            <ResultCard
              score={score}
              unit="из 23"
              title="Glasgow-Blatchford"
              recommendation={
                lowRisk
                  ? "0 баллов — риск минимален, возможно амбулаторное ведение"
                  : "Балл >0 — рекомендована госпитализация/эндоскопия"
              }
              color={lowRisk ? "green" : "red"}
            />

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите мочевину, гемоглобин и АД.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Оценка риска у пациентов с острым кровотечением из верхних
          отделов ЖКТ до эндоскопии. Балл 0 разработан именно как
          критерий безопасной выписки без эндоскопии в стационаре —
          при любом ненулевом балле рекомендуется госпитализация и
          эндоскопия в ближайшие 24 часа. Шкала оценивает риск
          вмешательства/трансфузии, а не летальность напрямую — для
          прогноза летальности после установления источника
          кровотечения чаще используется шкала Rockall.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Blatchford O, et al. Lancet.
          2000;356(9238):1318-1321.
        </p>
      </div>

    </div>
  );
}
