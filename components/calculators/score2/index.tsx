"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import RadioCard from "@/components/ui/RadioCard";
import InputWithUnit from "@/components/ui/InputWithUnit";
import InputWithSelect from "@/components/ui/InputWithSelect";
import ExpandableCard from "@/components/ui/ExpandableCard";

import { CholesterolUnit, RiskRegion, Sex } from "./types";
import { getRecommendation } from "./recommendations";
import Result from "./Result";


const cholesterolUnitOptions = [
  { value: "mmol", label: "ммоль/л" },
  { value: "mgdl", label: "мг/дл" },
];


const regionOptions: {
  value: RiskRegion;
  label: string;
  description: string;
}[] = [
  {
    value: "low",
    label: "Низкий риск",
    description: "Например: Франция, Испания, Нидерланды, Норвегия",
  },
  {
    value: "moderate",
    label: "Умеренный риск",
    description: "Например: Германия, Италия, Австрия",
  },
  {
    value: "high",
    label: "Высокий риск",
    description: "Например: Польша, Турция",
  },
  {
    value: "veryhigh",
    label: "Очень высокий риск",
    description: "Например: Россия и большинство стран Восточной Европы",
  },
];


export default function SCORE2Calculator() {

  const [sex, setSex] = useState<Sex | "">("");
  const [age, setAge] = useState("");
  const [smoking, setSmoking] = useState<"yes" | "no" | "">("");
  const [sbp, setSbp] = useState("");

  const [totalChol, setTotalChol] = useState("");
  const [totalCholUnit, setTotalCholUnit] =
    useState<CholesterolUnit>("mmol");

  const [hdl, setHdl] = useState("");
  const [hdlUnit, setHdlUnit] =
    useState<CholesterolUnit>("mmol");

  const [region, setRegion] = useState<RiskRegion | "">("");


  const ageNumber = Number(age);

  const isValid =
    sex !== "" &&
    smoking !== "" &&
    region !== "" &&
    age !== "" &&
    sbp !== "" &&
    totalChol !== "" &&
    hdl !== "" &&
    ageNumber >= 40 &&
    ageNumber <= 69;


  const recommendation = useMemo(() => {

    if (!isValid) {
      return null;
    }

    return getRecommendation({
      sex: sex as Sex,
      age: ageNumber,
      smoking: smoking === "yes",
      sbp: Number(sbp),
      totalChol: Number(totalChol),
      totalCholUnit,
      hdl: Number(hdl),
      hdlUnit,
      region: region as RiskRegion,
    });

  }, [
    isValid,
    sex,
    ageNumber,
    smoking,
    sbp,
    totalChol,
    totalCholUnit,
    hdl,
    hdlUnit,
    region,
  ]);



  const resultRef = useScrollToResult(recommendation !== null);
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="score2" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        {/* Левая карточка */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Исходные данные
          </h2>

          <div className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Пол
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setSex("male")}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                    sex === "male"
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-zinc-300 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold text-zinc-800">
                    Мужчина
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSex("female")}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                    sex === "female"
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-zinc-300 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="font-semibold text-zinc-800">
                    Женщина
                  </span>
                </button>

              </div>
            </div>

            <div>
              <InputWithUnit
                label="Возраст"
                value={age}
                unit="лет"
                onChange={setAge}
              />

              {age !== "" &&
                (ageNumber < 40 || ageNumber > 69) && (
                  <p className="mt-2 text-sm text-amber-600">
                    SCORE2 предназначена для лиц 40–69 лет.
                    Для пациентов 70 лет и старше используется
                    SCORE2-OP.
                  </p>
                )}
            </div>

            <RadioCard
              label="Курение"
              value={smoking}
              onChange={(value) =>
                setSmoking(value as "yes" | "no")
              }
              options={[
                { value: "no", label: "Не курит" },
                { value: "yes", label: "Курит" },
              ]}
            />

            <InputWithUnit
              label="Систолическое АД"
              value={sbp}
              unit="мм рт.ст."
              onChange={setSbp}
            />

            <InputWithSelect
              label="Общий холестерин"
              value={totalChol}
              selected={totalCholUnit}
              onChange={setTotalChol}
              onSelectChange={(value) =>
                setTotalCholUnit(value as CholesterolUnit)
              }
              options={cholesterolUnitOptions}
            />

            <InputWithSelect
              label="ЛПВП"
              value={hdl}
              selected={hdlUnit}
              onChange={setHdl}
              onSelectChange={(value) =>
                setHdlUnit(value as CholesterolUnit)
              }
              options={cholesterolUnitOptions}
            />

            <RadioCard
              label="Регион риска (страна)"
              value={region}
              onChange={(value) =>
                setRegion(value as RiskRegion)
              }
              options={regionOptions}
              columns={2}
            />

          </div>

        </div>

        {/* Правая карточка */}

        <div ref={resultRef}>

          {recommendation ? (

            <Result recommendation={recommendation} />

          ) : (

            <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">

              <div className="text-center">

                <div className="mb-4 text-6xl">
                  ❤️
                </div>

                <h3 className="text-xl font-semibold">
                  Заполните параметры
                </h3>

                <p className="mt-2 text-zinc-500">
                  После ввода данных для пациента 40–69 лет
                  автоматически появится расчёт 10-летнего
                  риска.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

      <ExpandableCard title="О калькуляторе SCORE2">

        <div className="space-y-4 text-gray-700">

          <p>
            SCORE2 оценивает 10-летний риск фатальных и
            нефатальных сердечно-сосудистых событий у
            практически здоровых людей 40–69 лет без
            установленного сердечно-сосудистого заболевания,
            сахарного диабета, хронической болезни почек или
            семейной гиперхолестеринемии.
          </p>

          <p>
            Регион риска определяется страной по классификации
            ESC на основе сердечно-сосудистой смертности.
            Выбор региона существенно влияет на результат —
            один и тот же профиль пациента даёт разный риск в
            разных регионах.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Источник: SCORE2 Working Group and ESC
            Cardiovascular Risk Collaboration. Eur Heart J.
            2021.
          </p>

        </div>

      </ExpandableCard>

    </div>
  );
}
