"use client";

import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

function respPoints(v: number) {
  if (v <= 8) return 3;
  if (v <= 11) return 1;
  if (v <= 20) return 0;
  if (v <= 24) return 2;
  return 3;
}
function spo2Scale1Points(v: number) {
  if (v <= 91) return 3;
  if (v <= 93) return 2;
  if (v <= 95) return 1;
  return 0;
}
function tempPoints(v: number) {
  if (v <= 35.0) return 3;
  if (v <= 36.0) return 1;
  if (v <= 38.0) return 0;
  if (v <= 39.0) return 1;
  return 2;
}
function sbpPoints(v: number) {
  if (v <= 90) return 3;
  if (v <= 100) return 2;
  if (v <= 110) return 1;
  if (v <= 219) return 0;
  return 3;
}
function hrPoints(v: number) {
  if (v <= 40) return 3;
  if (v <= 50) return 1;
  if (v <= 90) return 0;
  if (v <= 110) return 1;
  if (v <= 130) return 2;
  return 3;
}

export default function News2Calculator() {
  const [resp, setResp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [oxygen, setOxygen] = useState<"" | "air" | "oxygen">("");
  const [temp, setTemp] = useState("");
  const [sbp, setSbp] = useState("");
  const [hr, setHr] = useState("");
  const [consciousness, setConsciousness] = useState<"" | "alert" | "cvpu">("");

  const isValid = resp !== "" && spo2 !== "" && oxygen !== "" && temp !== "" && sbp !== "" && hr !== "" && consciousness !== "";

  const score = isValid
    ? respPoints(Number(resp)) +
      spo2Scale1Points(Number(spo2)) +
      (oxygen === "oxygen" ? 2 : 0) +
      tempPoints(Number(temp)) +
      sbpPoints(Number(sbp)) +
      hrPoints(Number(hr)) +
      (consciousness === "cvpu" ? 3 : 0)
    : null;

  const anyRed =
    isValid &&
    (respPoints(Number(resp)) === 3 || spo2Scale1Points(Number(spo2)) === 3 ||
      tempPoints(Number(temp)) === 3 || sbpPoints(Number(sbp)) === 3 || hrPoints(Number(hr)) === 3);

  const category = score === null ? null : anyRed ? "medred" : score === 0 ? "low" : score <= 4 ? "low" : score <= 6 ? "mid" : "high";
  const color = category === "low" ? "green" : category === "mid" || category === "medred" ? "yellow" : "red";
  const label =
    category === "low" ? "Низкий риск" :
    category === "medred" ? "Средний риск (3 балла по одному параметру) — требует оценки" :
    category === "mid" ? "Средний риск" : "Высокий риск — требует срочной оценки";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="news2" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">ЧДД, в мин</label>
              <input type="number" value={resp} onChange={(e) => setResp(e.target.value)} className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">SpO₂, %</label>
              <input type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)} className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
          </div>

          <RadioCard label="Дыхание" value={oxygen} onChange={(v) => setOxygen(v as typeof oxygen)} columns={2}
            options={[{ value: "air", label: "Комнатный воздух" }, { value: "oxygen", label: "Кислородная поддержка" }]} />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Темп., °C</label>
              <input type="number" step="0.1" value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">САД, мм рт.ст.</label>
              <input type="number" value={sbp} onChange={(e) => setSbp(e.target.value)} className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">ЧСС, в мин</label>
              <input type="number" value={hr} onChange={(e) => setHr(e.target.value)} className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-blue-600" />
            </div>
          </div>

          <RadioCard label="Сознание" value={consciousness} onChange={(v) => setConsciousness(v as typeof consciousness)} columns={2}
            options={[{ value: "alert", label: "Ясное" }, { value: "cvpu", label: "Спутанность/реакция на голос/боль/нет реакции" }]} />
        </div>

        {score !== null ? (
          <ResultCard score={score} unit="из 20" title="NEWS2" recommendation={label} color={color} />
        ) : (
          <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
            <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Шкала раннего предупреждения для выявления острого ухудшения состояния у взрослых в стационаре. Используется здесь шкала SpO₂ 1 (для пациентов без хронической гиперкапнической дыхательной недостаточности) — для пациентов с ХОБЛ и целевой сатурацией 88–92% применяется отдельная шкала SpO₂ 2 с иными порогами. Балл 3 по любому отдельному параметру — повод для срочной оценки независимо от суммы.
        <p className="mt-3 text-xs text-gray-500">Источник: Royal College of Physicians. National Early Warning Score (NEWS) 2. London: RCP, 2017.</p>
      </div>
    </div>
  );
}
