"use client";

import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import RadioCard from "@/components/ui/RadioCard";

type DrugId = "norepinephrine" | "dopamine" | "dobutamine" | "epinephrine" | "custom";

type DrugPreset = {
  label: string;
  amountMg: string;
  volumeMl: string;
  doseRangeNote: string;
  quickDoses: number[];
  bands?: { max: number; label: string }[];
};

const presets: Record<DrugId, DrugPreset> = {
  norepinephrine: {
    label: "Норадреналин (норэпинефрин)",
    amountMg: "4",
    volumeMl: "50",
    doseRangeNote:
      "Начальная доза 0.1–0.3 мкг/кг/мин, титрование шагом 0.05–0.1 мкг/кг/мин по эффекту (по инструкции РЛС).",
    quickDoses: [0.05, 0.1, 0.2, 0.3, 0.5, 1],
  },
  dopamine: {
    label: "Дофамин (допамин)",
    amountMg: "200",
    volumeMl: "250",
    doseRangeNote: "Эффект дозозависим — см. интерпретацию ниже.",
    quickDoses: [1, 3, 5, 10, 15, 20],
    bands: [
      { max: 3, label: "«Дофаминергическая» доза — клинически значимый эффект на почечный кровоток не подтверждён" },
      { max: 10, label: "β1-инотропный эффект" },
      { max: Infinity, label: "α1-вазопрессорный эффект" },
    ],
  },
  dobutamine: {
    label: "Добутамин",
    amountMg: "250",
    volumeMl: "1000",
    doseRangeNote:
      "Обычно 2.5–10 мкг/кг/мин, при ЧСС-мониторинге — до 20 мкг/кг/мин (выше 10 мкг/кг/мин чаще выраженная тахикардия).",
    quickDoses: [2.5, 5, 7.5, 10, 15, 20],
  },
  epinephrine: {
    label: "Адреналин (эпинефрин)",
    amountMg: "1",
    volumeMl: "50",
    doseRangeNote:
      "При септическом шоке (по актуальной инструкции РЛС): 0.05–2 мкг/кг/мин, титровать по среднему АД.",
    quickDoses: [0.05, 0.1, 0.2, 0.5, 1, 2],
  },
  custom: {
    label: "Другой препарат",
    amountMg: "",
    volumeMl: "",
    doseRangeNote: "",
    quickDoses: [],
  },
};

export default function PerfusorCalculator() {
  const [drug, setDrug] = useState<DrugId>("norepinephrine");
  const [amountMg, setAmountMg] = useState(presets.norepinephrine.amountMg);
  const [volumeMl, setVolumeMl] = useState(presets.norepinephrine.volumeMl);
  const [weight, setWeight] = useState("");

  const [mode, setMode] = useState<"doseToRate" | "rateToDose">("doseToRate");
  const [dose, setDose] = useState("");
  const [rate, setRate] = useState("");

  function selectDrug(id: DrugId) {
    setDrug(id);
    setAmountMg(presets[id].amountMg);
    setVolumeMl(presets[id].volumeMl);
  }

  const concentration = useMemo(() => {
    if (!amountMg || !volumeMl) return null;
    return (Number(amountMg) * 1000) / Number(volumeMl); // мкг/мл
  }, [amountMg, volumeMl]);

  const result = useMemo(() => {
    if (!concentration || !weight) return null;

    const w = Number(weight);

    if (mode === "doseToRate") {
      if (!dose) return null;
      const rateMlHr = (Number(dose) * w * 60) / concentration;
      return { rateMlHr, doseValue: Number(dose) };
    }

    if (!rate) return null;
    const doseValue = (Number(rate) * concentration) / (w * 60);
    return { rateMlHr: Number(rate), doseValue };
  }, [concentration, weight, mode, dose, rate]);

  const preset = presets[drug];

  const activeBand = useMemo(() => {
    if (!preset.bands || !result) return null;
    return preset.bands.find((b) => result.doseValue <= b.max) ?? null;
  }, [preset, result]);

  const quickTable = useMemo(() => {
    if (!concentration || !weight || preset.quickDoses.length === 0) return null;

    const w = Number(weight);

    return preset.quickDoses.map((d) => ({
      dose: d,
      rateMlHr: (d * w * 60) / concentration,
    }));
  }, [concentration, weight, preset]);

  const syringeHoursLeft = useMemo(() => {
    if (!result || !volumeMl || result.rateMlHr <= 0) return null;
    return Number(volumeMl) / result.rateMlHr;
  }, [result, volumeMl]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="perfusor" />

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        Калькулятор переводит дозу в скорость инфузии (и обратно) для
        указанного вами разведения — он не рекомендует конкретную
        дозу. Разведения по умолчанию основаны на официальных
        инструкциях, где это указано, но всегда сверяйте с протоколом
        вашего отделения. Титрование вазопрессоров/инотропов проводится
        по клиническому эффекту под контролем гемодинамики.
      </div>

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Препарат и разведение</h2>

          <div className="space-y-6">

            <RadioCard
              label="Препарат"
              value={drug}
              onChange={(v) => selectDrug(v as DrugId)}
              columns={1}
              options={Object.entries(presets).map(([id, p]) => ({
                value: id,
                label: p.label,
              }))}
            />

            <div>
              <p className="mb-2 text-sm text-zinc-600">
                Сколько препарата растворено и в каком объёме —
                например: «4 мг в 50 мл»
              </p>

              <div className="grid grid-cols-2 gap-3">
                <InputWithUnit label="Количество препарата" value={amountMg} unit="мг" onChange={setAmountMg} />
                <InputWithUnit label="Растворено в объёме" value={volumeMl} unit="мл" onChange={setVolumeMl} />
              </div>
            </div>

            {concentration !== null && (
              <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
                Концентрация раствора: <strong>{concentration.toFixed(1)} мкг/мл</strong>
              </div>
            )}

            {preset.doseRangeNote && (
              <p className="text-xs text-zinc-500">{preset.doseRangeNote}</p>
            )}

            <div className="border-t border-zinc-200 pt-4">
              <InputWithUnit label="Масса тела пациента" value={weight} unit="кг" onChange={setWeight} />
            </div>

            <RadioCard
              label="Что считаем"
              value={mode}
              onChange={(v) => setMode(v as "doseToRate" | "rateToDose")}
              columns={1}
              options={[
                { value: "doseToRate", label: "Знаю дозу → нужна скорость (мл/ч)" },
                { value: "rateToDose", label: "Знаю скорость → нужна доза (мкг/кг/мин)" },
              ]}
            />

            {mode === "doseToRate" ? (
              <InputWithUnit label="Целевая доза" value={dose} unit="мкг/кг/мин" onChange={setDose} />
            ) : (
              <InputWithUnit label="Скорость инфузии" value={rate} unit="мл/ч" onChange={setRate} />
            )}

          </div>

        </div>

        <div className="space-y-6">

          {result !== null ? (

            <>

              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">

                <div className="grid grid-cols-2 gap-6">

                  <div>
                    <div className="text-sm text-blue-700">Доза</div>
                    <div className="mt-1 text-3xl font-bold text-blue-900">
                      {result.doseValue.toFixed(3)}
                      <span className="ml-1 text-base font-normal">мкг/кг/мин</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-blue-700">Скорость инфузии</div>
                    <div className="mt-1 text-3xl font-bold text-blue-900">
                      {result.rateMlHr.toFixed(1)}
                      <span className="ml-1 text-base font-normal">мл/ч</span>
                    </div>
                  </div>

                </div>

                {syringeHoursLeft !== null && (
                  <div className="mt-5 rounded-xl bg-white/70 px-4 py-3 text-sm text-blue-900">
                    При этой скорости шприц/пакет ({volumeMl} мл)
                    закончится примерно через{" "}
                    <strong>
                      {syringeHoursLeft >= 1
                        ? `${syringeHoursLeft.toFixed(1)} ч`
                        : `${Math.round(syringeHoursLeft * 60)} мин`}
                    </strong>
                  </div>
                )}

              </div>

              {activeBand && (

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Дозозависимый эффект (справочно)</div>
                  <div className="mt-1 text-lg font-semibold">{activeBand.label}</div>
                </div>

              )}

            </>

          ) : (

            <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Укажите разведение, вес пациента и дозу или скорость.
                </p>
              </div>
            </div>

          )}

          {quickTable && (

            <div className="rounded-3xl border border-gray-200 bg-white p-6">

              <h3 className="mb-4 text-sm font-semibold text-gray-700">
                Быстрый ориентир при текущем разведении и весе
              </h3>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">

                {quickTable.map((row) => (

                  <div key={row.dose} className="rounded-xl bg-gray-50 p-3 text-center">
                    <div className="text-xs text-gray-500">{row.dose} мкг/кг/мин</div>
                    <div className="mt-1 font-bold text-gray-900">{row.rateMlHr.toFixed(1)}</div>
                    <div className="text-[10px] text-gray-400">мл/ч</div>
                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <div className="mb-2 flex items-center gap-2 font-semibold text-gray-800">
          <CircleAlert className="h-4 w-4" />
          Формула
        </div>
        Скорость (мл/ч) = доза (мкг/кг/мин) × масса тела (кг) × 60 /
        концентрация раствора (мкг/мл). Концентрация = масса
        препарата (мг) × 1000 / объём раствора (мл). Дофамин и
        допамин — разные транслитерации одного и того же МНН
        (dopamine), это один препарат. Разведения по умолчанию для
        норадреналина и добутамина взяты из действующих инструкций
        РЛС; для адреналина и дофамина — распространённые в практике
        варианты, могут отличаться в вашем отделении.
      </div>

    </div>
  );
}
