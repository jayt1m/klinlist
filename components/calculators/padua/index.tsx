"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  cancer: boolean;
  previousVte: boolean;
  reducedMobility: boolean;
  thrombophilia: boolean;
  traumaSurgery: boolean;
  age70: boolean;
  heartRespFailure: boolean;
  miStroke: boolean;
  infection: boolean;
  obesity: boolean;
  hormonal: boolean;
};

const initial: Data = {
  cancer: false,
  previousVte: false,
  reducedMobility: false,
  thrombophilia: false,
  traumaSurgery: false,
  age70: false,
  heartRespFailure: false,
  miStroke: false,
  infection: false,
  obesity: false,
  hormonal: false,
};

export default function PaduaCalculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const score =
    Number(data.cancer) * 3 +
    Number(data.previousVte) * 3 +
    Number(data.reducedMobility) * 3 +
    Number(data.thrombophilia) * 3 +
    Number(data.traumaSurgery) * 2 +
    Number(data.age70) +
    Number(data.heartRespFailure) +
    Number(data.miStroke) +
    Number(data.infection) +
    Number(data.obesity) +
    Number(data.hormonal);

  const highRisk = score >= 4;
  const color = highRisk ? "red" : "green";
  const label = highRisk ? "Высокий риск ВТЭО" : "Низкий риск ВТЭО";
  const rate = highRisk ? "11.0" : "0.3";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="padua" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Факторы риска</h2>

          <div className="space-y-4">

            <CheckboxCard title="Активное онкозаболевание" points={3} checked={data.cancer} onChange={() => toggle("cancer")} />
            <CheckboxCard title="ВТЭО в анамнезе" points={3} checked={data.previousVte} onChange={() => toggle("previousVte")} />
            <CheckboxCard title="Сниженная мобильность" description="Постельный режим ≥3 дней" points={3} checked={data.reducedMobility} onChange={() => toggle("reducedMobility")} />
            <CheckboxCard title="Известная тромбофилия" points={3} checked={data.thrombophilia} onChange={() => toggle("thrombophilia")} />
            <CheckboxCard title="Травма или операция" description="В последний месяц" points={2} checked={data.traumaSurgery} onChange={() => toggle("traumaSurgery")} />
            <CheckboxCard title="Возраст ≥70 лет" points={1} checked={data.age70} onChange={() => toggle("age70")} />
            <CheckboxCard title="Сердечная или дыхательная недостаточность" points={1} checked={data.heartRespFailure} onChange={() => toggle("heartRespFailure")} />
            <CheckboxCard title="Острый ИМ или ишемический инсульт" points={1} checked={data.miStroke} onChange={() => toggle("miStroke")} />
            <CheckboxCard title="Острая инфекция или ревматологическое заболевание" points={1} checked={data.infection} onChange={() => toggle("infection")} />
            <CheckboxCard title="Ожирение (ИМТ ≥30)" points={1} checked={data.obesity} onChange={() => toggle("obesity")} />
            <CheckboxCard title="Гормональная терапия" points={1} checked={data.hormonal} onChange={() => toggle("hormonal")} />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="из 20"
          title="Padua Prediction Score"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">Риск ВТЭО за 90 дней</div>
            <div className="mt-1 text-2xl font-bold">{rate}%</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Оценка риска ВТЭО у госпитализированных нехирургических
          пациентов для решения вопроса о медикаментозной профилактике.
          При высоком риске (≥4 баллов) и отсутствии противопоказаний
          (активное кровотечение, тяжёлая тромбоцитопения) показана
          фармакопрофилактика на весь период сниженной мобильности;
          при противопоказаниях к антикоагулянтам рассматриваются
          механические методы (компрессионный трикотаж,
          перемежающаяся пневмокомпрессия).
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Barbar S, et al. J Thromb Haemost.
          2010;8(11):2450-2457.
        </p>
      </div>

    </div>
  );
}
