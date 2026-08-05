"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";

function CriterionRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
        checked
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300"
      }`}
    >
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
          checked ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"
        }`}
      >
        {checked ? "✓" : ""}
      </div>
      <span className="font-medium text-gray-800">{label}</span>
    </button>
  );
}

export default function OttawaAnkleCalculator() {
  const [malleolarPain, setMalleolarPain] = useState(false);
  const [lateralTenderness, setLateralTenderness] = useState(false);
  const [medialTenderness, setMedialTenderness] = useState(false);
  const [ankleWeightBearing, setAnkleWeightBearing] = useState(false);

  const [midfootPain, setMidfootPain] = useState(false);
  const [navicularTenderness, setNavicularTenderness] = useState(false);
  const [fifthMetatarsalTenderness, setFifthMetatarsalTenderness] = useState(false);
  const [footWeightBearing, setFootWeightBearing] = useState(false);

  const ankleXray =
    malleolarPain && (lateralTenderness || medialTenderness || ankleWeightBearing);

  const footXray =
    midfootPain && (navicularTenderness || fifthMetatarsalTenderness || footWeightBearing);

  const anyAssessed =
    malleolarPain || midfootPain;

  return (
    <div className="mx-auto max-w-5xl space-y-10">

      <CalculatorHeader calculatorId="ottawa-ankle" />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">Область голеностопного сустава</h2>

        <div className="space-y-4">
          <CriterionRow label="Боль в зоне лодыжек" checked={malleolarPain} onChange={() => setMalleolarPain(!malleolarPain)} />
          <CriterionRow label="Болезненность заднего края/верхушки латеральной лодыжки (дистальные 6 см)" checked={lateralTenderness} onChange={() => setLateralTenderness(!lateralTenderness)} />
          <CriterionRow label="Болезненность заднего края/верхушки медиальной лодыжки (дистальные 6 см)" checked={medialTenderness} onChange={() => setMedialTenderness(!medialTenderness)} />
          <CriterionRow label="Неспособность сделать 4 шага сразу после травмы и на осмотре" checked={ankleWeightBearing} onChange={() => setAnkleWeightBearing(!ankleWeightBearing)} />
        </div>

      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">Область среднего отдела стопы</h2>

        <div className="space-y-4">
          <CriterionRow label="Боль в зоне среднего отдела стопы" checked={midfootPain} onChange={() => setMidfootPain(!midfootPain)} />
          <CriterionRow label="Болезненность ладьевидной кости" checked={navicularTenderness} onChange={() => setNavicularTenderness(!navicularTenderness)} />
          <CriterionRow label="Болезненность основания V плюсневой кости" checked={fifthMetatarsalTenderness} onChange={() => setFifthMetatarsalTenderness(!fifthMetatarsalTenderness)} />
          <CriterionRow label="Неспособность сделать 4 шага сразу после травмы и на осмотре" checked={footWeightBearing} onChange={() => setFootWeightBearing(!footWeightBearing)} />
        </div>

      </div>

      <div
        className={`rounded-3xl border p-8 ${
          ankleXray || footXray
            ? "border-amber-300 bg-amber-50"
            : anyAssessed
              ? "border-emerald-300 bg-emerald-50"
              : "border-gray-200 bg-gray-50"
        }`}
      >

        <div className="mb-3 flex items-center gap-3">
          {ankleXray || footXray ? (
            <CircleAlert className="h-7 w-7 text-amber-600" />
          ) : (
            <CircleCheck className="h-7 w-7 text-emerald-600" />
          )}

          <h3 className="text-xl font-bold">
            {!anyAssessed
              ? "Отметьте зону боли"
              : ankleXray && footXray
                ? "Показана рентгенография голеностопного сустава и стопы"
                : ankleXray
                  ? "Показана рентгенография голеностопного сустава"
                  : footXray
                    ? "Показана рентгенография стопы"
                    : "Рентгенография не показана"}
          </h3>
        </div>

        {anyAssessed && !ankleXray && !footXray && (
          <p className="leading-7 text-gray-700">
            Ни один из критериев не выполнен — клинически значимый
            перелом маловероятен (чувствительность правила ~97–99%).
          </p>
        )}

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        Применяется у пациентов ≥2 лет с болью в области голеностопного
        сустава или среднего отдела стопы давностью &lt;7 дней. Не
        заменяет клиническое суждение при алкогольном/наркотическом
        опьянении, сниженной чувствительности конечности, множественных
        травмах или выраженном отёке, затрудняющем пальпацию. Источник:
        Stiell IG, et al. Ann Emerg Med. 1992;21(4):384-390.
      </div>

    </div>
  );
}
