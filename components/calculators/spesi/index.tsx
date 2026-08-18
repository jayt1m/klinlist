"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

export default function SpesiCalculator() {
  const [age80, setAge80] = useState(false);
  const [cancer, setCancer] = useState(false);
  const [cardiopulm, setCardiopulm] = useState(false);
  const [hr110, setHr110] = useState(false);
  const [sbp100, setSbp100] = useState(false);
  const [spo290, setSpo290] = useState(false);

  const score = [age80, cancer, cardiopulm, hr110, sbp100, spo290].filter(Boolean).length;
  const lowRisk = score === 0;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="spesi" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4">
          <CheckboxCard title="Возраст >80 лет" points={1} checked={age80} onChange={() => setAge80(!age80)} />
          <CheckboxCard title="Онкологическое заболевание" points={1} checked={cancer} onChange={() => setCancer(!cancer)} />
          <CheckboxCard title="Хроническое сердечно-лёгочное заболевание" points={1} checked={cardiopulm} onChange={() => setCardiopulm(!cardiopulm)} />
          <CheckboxCard title="ЧСС ≥110 в мин" points={1} checked={hr110} onChange={() => setHr110(!hr110)} />
          <CheckboxCard title="Систолическое АД <100 мм рт.ст." points={1} checked={sbp100} onChange={() => setSbp100(!sbp100)} />
          <CheckboxCard title="SpO₂ <90%" points={1} checked={spo290} onChange={() => setSpo290(!spo290)} />
        </div>
        <ResultCard score={score} unit="из 6" title="sPESI" color={lowRisk ? "green" : "red"}
          recommendation={lowRisk ? "Низкий риск (30-дневная летальность ~1%) — можно рассматривать амбулаторное ведение" : "Высокий риск (30-дневная летальность ~10.9%) — показана госпитализация"} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Упрощённый индекс тяжести ТЭЛА для прогноза 30-дневной летальности у пациентов с подтверждённой ТЭЛА. Балл 0 в сочетании с отсутствием дисфункции правого желудочка и нормальным уровнем тропонина позволяет рассматривать амбулаторное лечение.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Jiménez D, et al. Arch Intern Med. 2010;170(15):1383-1389.</p>
      </div>
    </div>
  );
}
