"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import ResultCard from "@/components/ui/ResultCard";

type Data = {
  cancer: boolean;
  paralysis: boolean;
  bedridden: boolean;
  tenderness: boolean;
  entireLegSwollen: boolean;
  calfSwelling: boolean;
  pittingEdema: boolean;
  collateralVeins: boolean;
  previousDvt: boolean;
  alternativeDiagnosis: boolean;
};

const initial: Data = {
  cancer: false,
  paralysis: false,
  bedridden: false,
  tenderness: false,
  entireLegSwollen: false,
  calfSwelling: false,
  pittingEdema: false,
  collateralVeins: false,
  previousDvt: false,
  alternativeDiagnosis: false,
};

export default function WellsDVTCalculator() {
  const [data, setData] = useState<Data>(initial);

  function toggle(field: keyof Data) {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const score =
    Number(data.cancer) +
    Number(data.paralysis) +
    Number(data.bedridden) +
    Number(data.tenderness) +
    Number(data.entireLegSwollen) +
    Number(data.calfSwelling) +
    Number(data.pittingEdema) +
    Number(data.collateralVeins) +
    Number(data.previousDvt) -
    Number(data.alternativeDiagnosis) * 2;

  const category = score <= 0 ? "low" : score <= 2 ? "moderate" : "high";
  const color = category === "low" ? "green" : category === "moderate" ? "yellow" : "red";
  const label =
    category === "low" ? "Низкая вероятность" : category === "moderate" ? "Умеренная вероятность" : "Высокая вероятность";
  const rate = category === "low" ? "5" : category === "moderate" ? "17" : "53";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="wells-dvt" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">Клинические критерии</h2>

          <div className="space-y-4">

            <CheckboxCard title="Активное онкозаболевание" points={1} checked={data.cancer} onChange={() => toggle("cancer")} />
            <CheckboxCard title="Паралич, парез или иммобилизация конечности" points={1} checked={data.paralysis} onChange={() => toggle("paralysis")} />
            <CheckboxCard title="Постельный режим ≥3 дней или операция за 12 недель" points={1} checked={data.bedridden} onChange={() => toggle("bedridden")} />
            <CheckboxCard title="Локальная болезненность по ходу глубоких вен" points={1} checked={data.tenderness} onChange={() => toggle("tenderness")} />
            <CheckboxCard title="Отёк всей конечности" points={1} checked={data.entireLegSwollen} onChange={() => toggle("entireLegSwollen")} />
            <CheckboxCard title="Отёк голени >3 см по сравнению со здоровой" points={1} checked={data.calfSwelling} onChange={() => toggle("calfSwelling")} />
            <CheckboxCard title="Отёк с ямкой на поражённой конечности" points={1} checked={data.pittingEdema} onChange={() => toggle("pittingEdema")} />
            <CheckboxCard title="Коллатеральные (неварикозные) вены" points={1} checked={data.collateralVeins} onChange={() => toggle("collateralVeins")} />
            <CheckboxCard title="ТГВ в анамнезе" points={1} checked={data.previousDvt} onChange={() => toggle("previousDvt")} />
            <CheckboxCard title="Альтернативный диагноз столь же вероятен" points={-2} checked={data.alternativeDiagnosis} onChange={() => toggle("alternativeDiagnosis")} />

          </div>

        </div>

        <ResultCard
          score={score}
          unit="баллов"
          title="Критерии Wells (ТГВ)"
          recommendation={label}
          color={color}
        >
          <div className="rounded-xl border border-zinc-200 bg-white/60 px-4 py-3">
            <div className="text-sm text-zinc-500">Распространённость ТГВ в этой группе</div>
            <div className="mt-1 text-2xl font-bold">{rate}%</div>
          </div>
        </ResultCard>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          При низкой клинической вероятности (≤0 баллов) в сочетании
          с отрицательным D-димером ТГВ может быть исключён без
          инструментальной диагностики. При умеренной и высокой
          вероятности — показано компрессионное УЗИ вен независимо от
          уровня D-димера. Шкала валидирована для амбулаторных
          пациентов с симптомами одной конечности и неприменима при
          двустороннем отёке или подозрении на рецидив ТГВ в той же
          зоне без свежей визуализации для сравнения.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          Источник: Wells PS, et al. N Engl J Med.
          2003;349(13):1227-1235.
        </p>
      </div>

    </div>
  );
}
