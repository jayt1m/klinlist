"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  highRiskSurgery: boolean;
  ihd: boolean;
  chf: boolean;
  cvd: boolean;
  insulin: boolean;
  creatinine: boolean;
};

const initial: Data = {
  highRiskSurgery: false,
  ihd: false,
  chf: false,
  cvd: false,
  insulin: false,
  creatinine: false,
};

// Lee TH, et al. Circulation. 1999;100(10):1043-1049.
const classes: Record<number, { name: string; rate: string }> = {
  0: { name: "Класс I — очень низкий риск", rate: "0.4" },
  1: { name: "Класс II — низкий риск", rate: "0.9" },
  2: { name: "Класс III — умеренный риск", rate: "6.6" },
};

export default function RCRICalculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const score =
    Number(data.highRiskSurgery) +
    Number(data.ihd) +
    Number(data.chf) +
    Number(data.cvd) +
    Number(data.insulin) +
    Number(data.creatinine);

  const info =
    score >= 3
      ? { name: "Класс IV — высокий риск", rate: ">11" }
      : classes[score];

  const color = score === 0 ? "green" : score <= 1 ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="rcri" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Факторы риска</h2>

          <div className="space-y-4">

            <CheckboxCard
              title="Операция высокого риска"
              description="Внутригрудная, внутрибрюшная или супраингвинальная сосудистая"
              points={1}
              checked={data.highRiskSurgery}
              onChange={() => toggle("highRiskSurgery")}
            />

            <CheckboxCard
              title="ИБС в анамнезе"
              points={1}
              checked={data.ihd}
              onChange={() => toggle("ihd")}
            />

            <CheckboxCard
              title="Хроническая сердечная недостаточность"
              points={1}
              checked={data.chf}
              onChange={() => toggle("chf")}
            />

            <CheckboxCard
              title="Цереброваскулярная болезнь"
              description="Инсульт или ТИА в анамнезе"
              points={1}
              checked={data.cvd}
              onChange={() => toggle("cvd")}
            />

            <CheckboxCard
              title="Сахарный диабет на инсулинотерапии"
              points={1}
              checked={data.insulin}
              onChange={() => toggle("insulin")}
            />

            <CheckboxCard
              title="Креатинин >177 мкмоль/л"
              points={1}
              checked={data.creatinine}
              onChange={() => toggle("creatinine")}
            />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="из 6"
          title="RCRI (Lee)"
          recommendation={info.name}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">
              Риск крупных кардиальных осложнений
            </div>
            <div className="mt-1 text-2xl font-bold">{info.rate}%</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Индекс применяется для предоперационной оценки риска перед
          плановыми внесердечными операциями. При ≥1 балла и
          планируемой операции высокого риска целесообразно
          рассмотреть дообследование (натрийуретические пептиды,
          ЭКГ, при показаниях — ЭхоКГ) до вмешательства. RCRI не
          учитывает экстренность операции и функциональный статус
          пациента — эти факторы разбираются отдельно в актуальных
          периоперационных алгоритмах (например, по функциональной
          способности в METs).
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Lee TH, et al. Circulation.
          1999;100(10):1043-1049.
        </p>
      </div>

    </div>
  );
}
