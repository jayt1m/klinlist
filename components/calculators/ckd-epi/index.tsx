"use client";

import { useMemo, useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";

import {
  calculateCKDEPI2009,
  calculateCockcroftGault,
  calculateMDRD,
} from "./formulas";

import type {
  CreatinineUnit,
  EGFRData,
  Sex,
} from "./types";

import Result from "./Result";
import InputWithUnit from "@/components/ui/InputWithUnit";
import InputWithSelect from "@/components/ui/InputWithSelect";

export default function CKDEPICalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [unit, setUnit] =
    useState<CreatinineUnit>("umol");

  const data = useMemo<EGFRData | null>(() => {
    if (!age || !weight || !creatinine) {
      return null;
    }

    return {
      sex,
      age: Number(age),
      weight: Number(weight),
      creatinine: Number(creatinine),
      creatinineUnit: unit,
    };
  }, [
    sex,
    age,
    weight,
    creatinine,
    unit,
  ]);

  const result = useMemo(() => {
    if (!data) return null;

    return {
      ckdEpi2009: calculateCKDEPI2009(data),
      mdrd: calculateMDRD(data),
      cockcroftGault:
        calculateCockcroftGault(data),
    };
  }, [data]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="ckd-epi" highlight="Норма: ≥90 мл/мин/1,73м²" />

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
      <div className="flex items-center justify-between">

        <span className="font-semibold text-zinc-800">
          Мужчина
        </span>

        <div
          className={`h-5 w-5 rounded-full border-2 transition-all ${
            sex === "male"
              ? "border-blue-600 bg-blue-600"
              : "border-zinc-300"
          }`}
        />

      </div>
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
      <div className="flex items-center justify-between">

        <span className="font-semibold text-zinc-800">
          Женщина
        </span>

        <div
          className={`h-5 w-5 rounded-full border-2 transition-all ${
            sex === "female"
              ? "border-blue-600 bg-blue-600"
              : "border-zinc-300"
          }`}
        />

      </div>
    </button>

  </div>
</div>

<InputWithUnit
  label="Возраст"
  value={age}
  unit="лет"
  onChange={setAge}
/>

<InputWithUnit
  label="Масса тела"
  value={weight}
  unit="кг"
  onChange={setWeight}
/>

<InputWithSelect
  label="Креатинин"
  value={creatinine}
  selected={unit}
  onChange={setCreatinine}
  onSelectChange={(value) =>
    setUnit(value as CreatinineUnit)
  }
  options={[
    {
      value: "umol",
      label: "мкмоль/л",
    },
    {
      value: "mgdl",
      label: "мг/дл",
    },
    {
      value: "mmol",
      label: "ммоль/л",
    },
  ]}
/>

          </div>

        </div>

        {/* Правая карточка */}

        <div>

          {result ? (
            <Result
              ckdEpi2009={result.ckdEpi2009}
              mdrd={result.mdrd}
              cockcroftGault={
                result.cockcroftGault
              }
            />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">

              <div className="text-center">

                <div className="mb-4 text-6xl">
                  🩺
                </div>

                <h3 className="text-xl font-semibold">
                  Заполните параметры
                </h3>

                <p className="mt-2 text-zinc-500">
                  После ввода данных автоматически
                  появится результат расчёта СКФ.
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}