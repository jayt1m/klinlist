"use client";

import { useState } from "react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

export default function ChildPughCalculator() {
  const [bilirubin, setBilirubin] = useState(""); // µmol/L
  const [albumin, setAlbumin] = useState(""); // g/L
  const [inr, setInr] = useState("");
  const [ascites, setAscites] = useState("1");
  const [encephalopathy, setEncephalopathy] = useState("1");

  const isValid = bilirubin !== "" && albumin !== "" && inr !== "";

  function bilirubinPoints(v: number) {
    if (v < 34) return 1;
    if (v <= 51) return 2;
    return 3;
  }

  function albuminPoints(v: number) {
    if (v > 35) return 1;
    if (v >= 28) return 2;
    return 3;
  }

  function inrPoints(v: number) {
    if (v < 1.7) return 1;
    if (v <= 2.3) return 2;
    return 3;
  }

  const score = isValid
    ? bilirubinPoints(Number(bilirubin)) +
      albuminPoints(Number(albumin)) +
      inrPoints(Number(inr)) +
      Number(ascites) +
      Number(encephalopathy)
    : null;

  const cls = score === null ? null : score <= 6 ? "A" : score <= 9 ? "B" : "C";
  const color = cls === "A" ? "green" : cls === "B" ? "yellow" : "red";
  const label =
    cls === "A"
      ? "Класс A — компенсированное заболевание печени"
      : cls === "B"
        ? "Класс B — значимое нарушение функции"
        : cls === "C"
          ? "Класс C — декомпенсированное заболевание"
          : "";

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="child-pugh" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>

          <div className="space-y-6">

            <InputWithUnit label="Общий билирубин" value={bilirubin} unit="мкмоль/л" onChange={setBilirubin} />
            <InputWithUnit label="Альбумин" value={albumin} unit="г/л" onChange={setAlbumin} />
            <InputWithUnit label="МНО" value={inr} unit="" onChange={setInr} />

            <RadioCard
              label="Асцит"
              value={ascites}
              onChange={setAscites}
              options={[
                { value: "1", label: "Нет" },
                { value: "2", label: "Лёгкий / контролируется" },
                { value: "3", label: "Умеренный / резистентный" },
              ]}
            />

            <RadioCard
              label="Печёночная энцефалопатия"
              value={encephalopathy}
              onChange={setEncephalopathy}
              options={[
                { value: "1", label: "Нет" },
                { value: "2", label: "Степень I–II" },
                { value: "3", label: "Степень III–IV" },
              ]}
            />

          </div>

        </div>

        <div>

          {score !== null ? (

            <ResultCard
              score={score}
              unit="из 15"
              title="Шкала Child-Pugh"
              recommendation={label}
              color={color}
            />

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите билирубин, альбумин и МНО.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>
          Класс Child-Pugh используется не только для прогноза, но и
          для коррекции доз препаратов с печёночным метаболизмом
          (многие антикоагулянты, часть статинов и антиаритмиков
          противопоказаны или требуют снижения дозы уже при классе
          B). Асцит и энцефалопатия оцениваются клинически и по
          определению субъективны — учитывайте это при пограничных
          баллах. Источник: Pugh RN, et al. Br J Surg.
          1973;60(8):646-649. Для точной оценки прогноза и очерёдности
          трансплантации печени используется шкала MELD.
        </p>
      </div>

    </div>
  );
}
