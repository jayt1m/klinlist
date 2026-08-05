"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import RadioCard from "@/components/ui/RadioCard";
import CheckboxCard from "@/components/ui/CheckboxCard";
import InputWithUnit from "@/components/ui/InputWithUnit";
import InputWithSelect from "@/components/ui/InputWithSelect";
import ExpandableCard from "@/components/ui/ExpandableCard";

import { CreatinineUnit, KillipClass } from "./types";
import { getRecommendation } from "./recommendations";
import Result from "./Result";


const creatinineUnitOptions = [
  { value: "umol", label: "мкмоль/л" },
  { value: "mgdl", label: "мг/дл" },
];


const killipOptions: {
  value: KillipClass;
  label: string;
  description: string;
}[] = [
  {
    value: "I",
    label: "Killip I",
    description: "Без признаков СН",
  },
  {
    value: "II",
    label: "Killip II",
    description: "Влажные хрипы, набухание вен шеи",
  },
  {
    value: "III",
    label: "Killip III",
    description: "Отёк лёгких",
  },
  {
    value: "IV",
    label: "Killip IV",
    description: "Кардиогенный шок",
  },
];


export default function GRACECalculator() {

  const [age, setAge] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [sbp, setSbp] = useState("");

  const [creatinine, setCreatinine] = useState("");
  const [creatinineUnit, setCreatinineUnit] =
    useState<CreatinineUnit>("umol");

  const [killip, setKillip] = useState<KillipClass>("I");

  const [cardiacArrest, setCardiacArrest] = useState(false);
  const [stDeviation, setStDeviation] = useState(false);
  const [elevatedMarkers, setElevatedMarkers] = useState(false);


  const isValid =
    age !== "" &&
    heartRate !== "" &&
    sbp !== "" &&
    creatinine !== "";


  const recommendation = useMemo(() => {

    if (!isValid) {
      return null;
    }

    return getRecommendation({
      age: Number(age),
      heartRate: Number(heartRate),
      sbp: Number(sbp),
      creatinine: Number(creatinine),
      creatinineUnit,
      killip,
      cardiacArrest,
      stDeviation,
      elevatedMarkers,
    });

  }, [
    isValid,
    age,
    heartRate,
    sbp,
    creatinine,
    creatinineUnit,
    killip,
    cardiacArrest,
    stDeviation,
    elevatedMarkers,
  ]);


  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="grace" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        {/* Левая карточка */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Исходные данные
          </h2>

          <div className="space-y-6">

            <InputWithUnit
              label="Возраст"
              value={age}
              unit="лет"
              onChange={setAge}
            />

            <InputWithUnit
              label="Частота сердечных сокращений"
              value={heartRate}
              unit="уд/мин"
              onChange={setHeartRate}
            />

            <InputWithUnit
              label="Систолическое АД"
              value={sbp}
              unit="мм рт.ст."
              onChange={setSbp}
            />

            <InputWithSelect
              label="Креатинин"
              value={creatinine}
              selected={creatinineUnit}
              onChange={setCreatinine}
              onSelectChange={(value) =>
                setCreatinineUnit(value as CreatinineUnit)
              }
              options={creatinineUnitOptions}
            />

            <RadioCard
              label="Класс по Killip"
              value={killip}
              onChange={(value) =>
                setKillip(value as KillipClass)
              }
              options={killipOptions}
              columns={2}
            />

            <div className="space-y-3">

              <CheckboxCard
                title="Остановка сердца при поступлении"
                points={39}
                checked={cardiacArrest}
                onChange={() =>
                  setCardiacArrest(!cardiacArrest)
                }
              />

              <CheckboxCard
                title="Смещение сегмента ST"
                points={28}
                checked={stDeviation}
                onChange={() =>
                  setStDeviation(!stDeviation)
                }
              />

              <CheckboxCard
                title="Повышение кардиоспецифичных маркеров"
                description="Тропонин, МВ-КФК"
                points={14}
                checked={elevatedMarkers}
                onChange={() =>
                  setElevatedMarkers(!elevatedMarkers)
                }
              />

            </div>

          </div>

        </div>

        {/* Правая карточка */}

        <div>

          {recommendation ? (

            <Result recommendation={recommendation} />

          ) : (

            <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">

              <div className="text-center">

                <div className="mb-4 text-6xl">
                  🚑
                </div>

                <h3 className="text-xl font-semibold">
                  Заполните параметры
                </h3>

                <p className="mt-2 text-zinc-500">
                  После ввода данных автоматически появится
                  расчёт балла GRACE и категории риска.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

      <ExpandableCard title="О шкале GRACE">

        <div className="space-y-4 text-gray-700">

          <p>
            GRACE (Global Registry of Acute Coronary Events)
            оценивает риск госпитальной летальности у пациентов
            с острым коронарным синдромом (нестабильная
            стенокардия, ИМбпST, ИМпST) на основании 8
            показателей, доступных при поступлении.
          </p>

          <p>
            Категория риска определяет тактику: низкий риск —
            возможна консервативная стратегия, промежуточный —
            ранняя инвазивная стратегия (24–72 ч), высокий —
            неотложная инвазивная стратегия.
          </p>

          <p className="text-sm text-gray-500">
            Источники: Fox KA, et al. BMJ. 2006;333(7578):1091.
            Granger CB, et al. Arch Intern Med.
            2003;163(19):2345-53.
          </p>

        </div>

      </ExpandableCard>

    </div>
  );
}
