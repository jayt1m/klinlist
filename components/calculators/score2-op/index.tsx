"use client";

import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import RadioCard from "@/components/ui/RadioCard";
import InputWithUnit from "@/components/ui/InputWithUnit";
import InputWithSelect from "@/components/ui/InputWithSelect";
import ExpandableCard from "@/components/ui/ExpandableCard";

type Sex = "male" | "female";
type RiskRegion = "low" | "moderate" | "high" | "veryhigh";
type CholUnit = "mmol" | "mgdl";

function toMmol(value: number, unit: CholUnit): number {
  return unit === "mgdl" ? value / 38.67 : value;
}

// Линейный предиктор — коэффициенты из официальной Table 2
// (SCORE2-OP Working Group. Eur Heart J. 2021;42(25):2455-2467.)
const BETAS = {
  male: {
    age: 0.0634, diabetes: 0.4245, diabetesAge: -0.0174,
    smoking: 0.3524, smokingAge: -0.0247,
    sbp: 0.094, sbpAge: -0.005,
    chol: 0.085, cholAge: 0.007,
    hdl: -0.356, hdlAge: 0.009,
  },
  female: {
    age: 0.0787, diabetes: 0.6008, diabetesAge: -0.0107,
    smoking: 0.4921, smokingAge: -0.0255,
    sbp: 0.102, sbpAge: -0.004,
    chol: 0.060, cholAge: -0.001,
    hdl: -0.304, hdlAge: 0.015,
  },
};

const BASELINE_SURVIVAL: Record<Sex, number> = {
  male: 0.7576,
  female: 0.8082,
};

const REGION_SCALES: Record<Sex, Record<RiskRegion, [number, number]>> = {
  male: {
    low: [-0.34, 1.19],
    moderate: [0.02, 1.25],
    high: [0.25, 1.35],
    veryhigh: [0.43, 1.36],
  },
  female: {
    low: [-0.52, 1.01],
    moderate: [-0.20, 1.13],
    high: [0.05, 1.21],
    veryhigh: [0.20, 1.19],
  },
};

function calculateSCORE2OP(
  sex: Sex,
  age: number,
  smoking: boolean,
  diabetes: boolean,
  sbp: number,
  tchol: number,
  hdl: number,
  region: RiskRegion
): number {
  const b = BETAS[sex];

  const cage = age - 73;
  const csbp = (sbp - 150) / 10;
  const cchol = tchol - 6;
  const chdl = hdl - 1.4;
  const sm = smoking ? 1 : 0;
  const dm = diabetes ? 1 : 0;

  const x =
    b.age * cage +
    b.diabetes * dm + b.diabetesAge * dm * cage +
    b.smoking * sm + b.smokingAge * sm * cage +
    b.sbp * csbp + b.sbpAge * csbp * cage +
    b.chol * cchol + b.cholAge * cchol * cage +
    b.hdl * chdl + b.hdlAge * chdl * cage;

  const s0 = BASELINE_SURVIVAL[sex];
  const rawRisk = 1 - Math.pow(s0, Math.exp(x));

  const [scale1, scale2] = REGION_SCALES[sex][region];

  const calibrated =
    1 - Math.exp(-Math.exp(scale1 + scale2 * Math.log(-Math.log(1 - rawRisk))));

  return Number((calibrated * 100).toFixed(1));
}

const regionOptions: { value: RiskRegion; label: string; description: string }[] = [
  { value: "low", label: "Низкий риск", description: "Франция, Испания, Нидерланды и др." },
  { value: "moderate", label: "Умеренный риск", description: "Германия, Италия, Австрия и др." },
  { value: "high", label: "Высокий риск", description: "Польша, Турция и др." },
  { value: "veryhigh", label: "Очень высокий риск", description: "Россия и большинство стран Восточной Европы" },
];

const cholOptions = [
  { value: "mmol", label: "ммоль/л" },
  { value: "mgdl", label: "мг/дл" },
];

export default function Score2OpCalculator() {
  const [sex, setSex] = useState<Sex | "">("");
  const [age, setAge] = useState("");
  const [smoking, setSmoking] = useState<"yes" | "no" | "">("");
  const [diabetes, setDiabetes] = useState<"yes" | "no" | "">("");
  const [sbp, setSbp] = useState("");
  const [totalChol, setTotalChol] = useState("");
  const [totalCholUnit, setTotalCholUnit] = useState<CholUnit>("mmol");
  const [hdl, setHdl] = useState("");
  const [hdlUnit, setHdlUnit] = useState<CholUnit>("mmol");
  const [region, setRegion] = useState<RiskRegion | "">("");

  const ageNumber = Number(age);

  const isValid =
    sex !== "" && smoking !== "" && diabetes !== "" && region !== "" &&
    age !== "" && sbp !== "" && totalChol !== "" && hdl !== "" &&
    ageNumber >= 70 && ageNumber <= 89;

  const risk = useMemo(() => {
    if (!isValid) return null;

    return calculateSCORE2OP(
      sex as Sex,
      ageNumber,
      smoking === "yes",
      diabetes === "yes",
      Number(sbp),
      toMmol(Number(totalChol), totalCholUnit),
      toMmol(Number(hdl), hdlUnit),
      region as RiskRegion
    );
  }, [isValid, sex, ageNumber, smoking, diabetes, sbp, totalChol, totalCholUnit, hdl, hdlUnit, region]);

  const resultRef = useScrollToResult(risk !== null);

  const category =
    risk === null ? null : risk < 7.5 ? "low" : risk < 15 ? "high" : "veryhigh";

  const categoryLabel =
    category === "low" ? "Низкий/умеренный риск" : category === "high" ? "Высокий риск" : "Очень высокий риск";

  const color = category === "low" ? "green" : category === "high" ? "yellow" : "red";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="score2-op" highlight="Возраст 70–89 лет" />

      <div className="rounded-2xl border border-red-300 bg-red-50 p-5 text-sm text-red-900">
        <strong>Важная оговорка по точности.</strong> Формула линейного
        предиктора взята из официальной публикации (Table 2) и
        достоверна. Однако коэффициенты калибровки под конкретный
        регион риска для SCORE2-OP не удалось независимо перепроверить
        по первоисточнику с той же строгостью, что и для остальных
        калькуляторов сайта — использованы наиболее вероятные значения
        на основе доступных данных. Перед клиническим применением
        сверьте результат с официальным инструментом на u-prevent.com.
      </div>

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <RadioCard
              label="Пол"
              value={sex}
              onChange={(v) => setSex(v as Sex)}
              columns={2}
              options={[
                { value: "male", label: "Мужской" },
                { value: "female", label: "Женский" },
              ]}
            />

            <div>
              <InputWithUnit label="Возраст" value={age} unit="лет" onChange={setAge} />
              {age !== "" && (ageNumber < 70 || ageNumber > 89) && (
                <p className="mt-2 text-sm text-amber-600">
                  SCORE2-OP предназначена для лиц 70–89 лет. Для 40–69
                  лет используйте обычный SCORE2.
                </p>
              )}
            </div>

            <RadioCard
              label="Курение"
              value={smoking}
              onChange={(v) => setSmoking(v as "yes" | "no")}
              columns={2}
              options={[
                { value: "no", label: "Не курит" },
                { value: "yes", label: "Курит" },
              ]}
            />

            <RadioCard
              label="Сахарный диабет"
              value={diabetes}
              onChange={(v) => setDiabetes(v as "yes" | "no")}
              columns={2}
              options={[
                { value: "no", label: "Нет" },
                { value: "yes", label: "Есть" },
              ]}
            />

            <InputWithUnit label="Систолическое АД" value={sbp} unit="мм рт.ст." onChange={setSbp} />

            <InputWithSelect
              label="Общий холестерин"
              value={totalChol}
              selected={totalCholUnit}
              onChange={setTotalChol}
              onSelectChange={(v) => setTotalCholUnit(v as CholUnit)}
              options={cholOptions}
            />

            <InputWithSelect
              label="ЛПВП"
              value={hdl}
              selected={hdlUnit}
              onChange={setHdl}
              onSelectChange={(v) => setHdlUnit(v as CholUnit)}
              options={cholOptions}
            />

            <RadioCard
              label="Регион риска (страна)"
              value={region}
              onChange={(v) => setRegion(v as RiskRegion)}
              options={regionOptions}
              columns={2}
            />

          </div>

        </div>

        <div ref={resultRef}>

          {risk !== null ? (

            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">

              <div className={`px-8 py-7 text-white ${
                color === "green" ? "bg-emerald-600" : color === "yellow" ? "bg-amber-500" : "bg-red-600"
              }`}>
                <p className="text-sm font-medium opacity-90">10-летний риск ССЗ (SCORE2-OP)</p>
                <div className="mt-4 text-6xl font-bold">{risk}<span className="ml-2 text-lg font-normal opacity-90">%</span></div>
              </div>

              <div className="p-8">
                <div className="inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
                  {categoryLabel}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    У пожилых пациентов на решение о профилактическом
                    лечении сильно влияют хрупкость, ожидаемая
                    продолжительность жизни, конкурирующие
                    некардиоваскулярные риски и переносимость терапии
                    — не только процент риска.
                  </p>
                </div>
              </div>

            </div>

          ) : (

            <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">Для пациента 70–89 лет.</p>
              </div>
            </div>

          )}

        </div>

      </div>

      <ExpandableCard title="О калькуляторе SCORE2-OP">
        <div className="space-y-4 text-gray-700">
          <p>
            SCORE2-OP («Older Persons») — версия SCORE2 для практически
            здоровых людей 70–89 лет без установленного
            сердечно-сосудистого заболевания, оценивающая риск с
            поправкой на конкурирующий риск смерти от других причин,
            характерный для пожилого возраста.
          </p>
          <p className="text-sm text-gray-500">
            Источник: SCORE2-OP working group and ESC Cardiovascular
            risk collaboration. Eur Heart J. 2021;42(25):2455-2467.
          </p>
        </div>
      </ExpandableCard>

    </div>
  );
}
