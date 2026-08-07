"use client";

import { useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";

import CalculatorHeader from "@/components/ui/CalculatorHeader";
import InputWithUnit from "@/components/ui/InputWithUnit";
import ExpandableCard from "@/components/ui/ExpandableCard";

type Disorder =
  | "normal"
  | "resp-acidosis"
  | "resp-alkalosis"
  | "metab-acidosis"
  | "metab-alkalosis"
  | "mixed-acidosis"
  | "mixed-alkalosis"
  | "compensated";

function classify(pH: number, pco2: number, hco3: number): Disorder {
  const phLow = pH < 7.31;
  const phHigh = pH > 7.41;
  const co2High = pco2 > 51;
  const co2Low = pco2 < 41;
  const hco3Low = hco3 < 22;
  const hco3High = hco3 > 26;

  if (!phLow && !phHigh) {
    if ((co2High && hco3High) || (co2Low && hco3Low)) {
      return "compensated";
    }
    return "normal";
  }

  if (phLow) {
    if (co2High && hco3Low) return "mixed-acidosis";
    if (co2High) return "resp-acidosis";
    if (hco3Low) return "metab-acidosis";
    return "metab-acidosis"; // pH снижен, но явных признаков нет — по умолчанию метаболический компонент
  }

  // phHigh
  if (co2Low && hco3High) return "mixed-alkalosis";
  if (co2Low) return "resp-alkalosis";
  if (hco3High) return "metab-alkalosis";
  return "metab-alkalosis";
}

const disorderLabels: Record<Disorder, string> = {
  normal: "Показатели в пределах нормы",
  compensated: "Компенсированное нарушение КЩС (pH в норме, но HCO₃⁻/pCO₂ изменены)",
  "resp-acidosis": "Дыхательный ацидоз",
  "resp-alkalosis": "Дыхательный алкалоз",
  "metab-acidosis": "Метаболический ацидоз",
  "metab-alkalosis": "Метаболический алкалоз",
  "mixed-acidosis": "Смешанный (дыхательный + метаболический) ацидоз",
  "mixed-alkalosis": "Смешанный (дыхательный + метаболический) алкалоз",
};

export default function VbgCalculator() {
  const [pH, setPH] = useState("");
  const [pco2, setPco2] = useState("");
  const [hco3, setHco3] = useState("");
  const [weight, setWeight] = useState("");
  const [targetHco3, setTargetHco3] = useState("18");
  const [baseExcess, setBaseExcess] = useState("");

  const isValid = pH !== "" && pco2 !== "" && hco3 !== "";

  const disorder = useMemo(() => {
    if (!isValid) return null;
    return classify(Number(pH), Number(pco2), Number(hco3));
  }, [isValid, pH, pco2, hco3]);

  const isMetabolicAcidosis =
    disorder === "metab-acidosis" || disorder === "mixed-acidosis";

  const winterExpectedPco2 = useMemo(() => {
    if (!isValid) return null;
    return 1.5 * Number(hco3) + 8;
  }, [isValid, hco3]);

  const bicarbDose = useMemo(() => {
    if (!weight || !isMetabolicAcidosis) return null;

    const w = Number(weight);

    const doseFromHco3 = hco3
      ? 0.5 * w * (Number(targetHco3) - Number(hco3))
      : null;

    const be = baseExcess !== "" ? Number(baseExcess) : Number(hco3) - 24;

    const doseFromBe = 0.3 * w * Math.abs(be);

    return {
      doseFromHco3: doseFromHco3 !== null ? Math.max(0, doseFromHco3) : null,
      doseFromBe: Math.max(0, doseFromBe),
      usedEstimatedBe: baseExcess === "",
    };
  }, [weight, isMetabolicAcidosis, hco3, targetHco3, baseExcess]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <CalculatorHeader calculatorId="vbg" />

      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">

        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">Показатели КЩС (венозная кровь)</h2>

          <div className="space-y-6">

            <InputWithUnit label="pH" value={pH} unit="" onChange={setPH} />
            <InputWithUnit label="pCO₂" value={pco2} unit="мм рт.ст." onChange={setPco2} />
            <InputWithUnit label="HCO₃⁻ (актуальный)" value={hco3} unit="ммоль/л" onChange={setHco3} />
            <InputWithUnit
              label="Дефицит оснований (BE)"
              value={baseExcess}
              unit="ммоль/л"
              onChange={setBaseExcess}
            />

            <p className="text-xs text-zinc-500">
              BE необязателен — если не указан, для расчёта дозы по
              методу дефицита оснований будет использована грубая
              оценка BE ≈ HCO₃⁻ − 24.
            </p>

            <div className="border-t border-zinc-200 pt-4">
              <InputWithUnit label="Масса тела" value={weight} unit="кг" onChange={setWeight} />
            </div>

            <InputWithUnit
              label="Целевой HCO₃⁻"
              value={targetHco3}
              unit="ммоль/л"
              onChange={setTargetHco3}
            />

          </div>

        </div>

        <div className="space-y-6">

          {disorder !== null ? (

            <>

              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                <div className="text-sm font-medium text-zinc-500">Заключение</div>

                <div className="mt-2 text-2xl font-bold">
                  {disorderLabels[disorder]}
                </div>

                {isMetabolicAcidosis && winterExpectedPco2 !== null && (

                  <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
                    Ожидаемая респираторная компенсация (формула
                    Винтера, для артериальной крови): pCO₂ ≈{" "}
                    {winterExpectedPco2.toFixed(1)} ± 2 мм рт.ст.
                    {Number(pco2) > winterExpectedPco2 + 2 && (
                      <> Фактический pCO₂ выше ожидаемого — вероятен сопутствующий дыхательный ацидоз.</>
                    )}
                    {Number(pco2) < winterExpectedPco2 - 2 && (
                      <> Фактический pCO₂ ниже ожидаемого — вероятен сопутствующий дыхательный алкалоз.</>
                    )}
                  </div>

                )}

              </div>

              {isMetabolicAcidosis && (

                <div className="rounded-3xl border border-amber-300 bg-amber-50 p-8">

                  <div className="mb-4 flex items-center gap-2">
                    <CircleAlert className="h-6 w-6 text-amber-700" />
                    <h3 className="text-xl font-bold text-amber-900">
                      Расчётная доза гидрокарбоната натрия
                    </h3>
                  </div>

                  {!weight ? (

                    <p className="text-amber-900">
                      Укажите массу тела для расчёта дозы.
                    </p>

                  ) : bicarbDose && (

                    <div className="space-y-4">

                      {bicarbDose.doseFromHco3 !== null && (
                        <div className="rounded-xl bg-white/70 p-4">
                          <div className="text-sm text-amber-800">
                            По дефициту HCO₃⁻: 0.5 × вес × (целевой − текущий HCO₃⁻)
                          </div>
                          <div className="mt-1 text-2xl font-bold text-amber-900">
                            {bicarbDose.doseFromHco3.toFixed(0)} мэкв
                          </div>
                        </div>
                      )}

                      <div className="rounded-xl bg-white/70 p-4">
                        <div className="text-sm text-amber-800">
                          По дефициту оснований: 0.3 × вес × |BE|
                          {bicarbDose.usedEstimatedBe && " (BE оценён приблизительно)"}
                        </div>
                        <div className="mt-1 text-2xl font-bold text-amber-900">
                          {bicarbDose.doseFromBe.toFixed(0)} мэкв
                        </div>
                      </div>

                    </div>

                  )}

                  <div className="mt-6 space-y-2 text-sm leading-6 text-amber-900">
                    <p><strong>Это не автоматическая рекомендация к введению.</strong> Гидрокарбонат натрия при метаболическом ацидозе вводится не рутинно, а по строгим показаниям (как правило, pH ≤7.1–7.2 и/или тяжёлая гиперкалиемия) и обычно не более половины расчётной дозы одномоментно, с повторной оценкой КЩС.</p>
                    <p>Цель — частичная коррекция (обычно до pH ≈7.2–7.3 / HCO₃⁻ 15–18 ммоль/л), а не полная нормализация.</p>
                    <p>Требуется адекватная вентиляция — введение гидрокарбоната увеличивает продукцию CO₂.</p>
                    <p>При диабетическом кетоацидозе гидрокарбонат обычно не показан, если pH ≥6.9–7.0.</p>
                  </div>

                </div>

              )}

            </>

          ) : (

            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Заполните параметры</h3>
                <p className="mt-2 text-zinc-500">
                  Введите pH, pCO₂ и HCO₃⁻.
                </p>
              </div>
            </div>

          )}

        </div>

      </div>

      <ExpandableCard title="Нормы для венозной крови и источники">

        <div className="space-y-4 text-gray-700">

          <p>
            Референсные значения для венозной крови отличаются от
            артериальной: pH 7.31–7.41 (ниже на ~0.03–0.04), pCO₂
            41–51 мм рт.ст. (выше на ~3–8 мм рт.ст.), HCO₃⁻ близок к
            артериальному, обычно немного выше. Венозная кровь хорошо
            подходит для оценки метаболического компонента КЩС (pH,
            HCO₃⁻, BE), но не отражает оксигенацию — для этого нужна
            артериальная кровь.
          </p>

          <p>
            Классификация нарушения — по упрощённому пошаговому
            алгоритму (первичное нарушение определяется по
            направлению изменения pCO₂ и HCO₃⁻ относительно pH) и не
            заменяет полноценный клинический анализ, включая анионный
            интервал и клиническую картину.
          </p>

          <p className="text-sm text-gray-500">
            Источники: формула Винтера — Winters RW, et al. Ann N Y
            Acad Sci. 1965;133:246-265. Формулы дозирования
            гидрокарбоната — стандартные клинические протоколы
            коррекции метаболического ацидоза.
          </p>

        </div>

      </ExpandableCard>

    </div>
  );
}
