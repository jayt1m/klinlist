"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import RadioCard from "@/components/ui/RadioCard";

type Region = { key: string; label: string; adult: number; child: number };

const regions: Region[] = [
  { key: "head", label: "Голова и шея", adult: 9, child: 18 },
  { key: "armR", label: "Правая рука", adult: 9, child: 9 },
  { key: "armL", label: "Левая рука", adult: 9, child: 9 },
  { key: "trunkFront", label: "Передняя поверхность туловища", adult: 18, child: 18 },
  { key: "trunkBack", label: "Задняя поверхность туловища", adult: 18, child: 18 },
  { key: "legR", label: "Правая нога", adult: 18, child: 13.5 },
  { key: "legL", label: "Левая нога", adult: 18, child: 13.5 },
  { key: "genitals", label: "Промежность", adult: 1, child: 1 },
];

export default function RuleOfNinesCalculator() {
  const [patientType, setPatientType] = useState<"" | "adult" | "child">("");
  const [selected, setSelected] = useState<Record<string, number>>({});

  const isValid = patientType !== "";

  const total = useMemo(() => {
    if (!isValid) return null;
    return Object.values(selected).reduce((s, v) => s + v, 0);
  }, [isValid, selected]);

  const resultRef = useScrollToResult(total !== null && total > 0);

  function setPortion(key: string, portion: number) {
    const region = regions.find((r) => r.key === key)!;
    const full = patientType === "child" ? region.child : region.adult;
    setSelected((p) => {
      const next = { ...p };
      if (portion === 0) delete next[key];
      else next[key] = Number((full * portion).toFixed(1));
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="rule-of-nines" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-6">
          <RadioCard label="Пациент" value={patientType} onChange={(v) => { setPatientType(v as typeof patientType); setSelected({}); }} columns={2}
            options={[{ value: "adult", label: "Взрослый" }, { value: "child", label: "Ребёнок до 1 года" }]} />
          {patientType !== "" && regions.map((r) => {
            const full = patientType === "child" ? r.child : r.adult;
            const current = selected[r.key] ?? 0;
            const portion = current === 0 ? "0" : current === Number((full * 0.25).toFixed(1)) ? "0.25" : current === Number((full * 0.5).toFixed(1)) ? "0.5" : current === Number((full * 0.75).toFixed(1)) ? "0.75" : "1";
            return (
              <div key={r.key}>
                <RadioCard label={`${r.label} (${full}%)`} value={portion} onChange={(v) => setPortion(r.key, Number(v))} columns={3}
                  options={[
                    { value: "0", label: "Нет" }, { value: "0.25", label: "25%" }, { value: "0.5", label: "50%" },
                    { value: "0.75", label: "75%" }, { value: "1", label: "Полностью" },
                  ]} />
              </div>
            );
          })}
        </div>
        <div ref={resultRef}>
          {total !== null ? (
            <div className={`rounded-3xl border p-8 ${total >= 20 ? "border-red-300 bg-red-50" : total >= 10 ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div className="text-sm text-gray-600">Общая площадь ожога</div>
              <div className="mt-2 text-5xl font-bold">{total.toFixed(1)}<span className="ml-2 text-lg font-normal">%</span></div>
              <p className="mt-4 text-sm">{total >= 20 ? "Обширный ожог — показана инфузионная терапия по формуле Паркленда и рассмотрение перевода в ожоговый центр." : total >= 10 ? "Значительная площадь — рассмотреть инфузионную терапию." : "Ограниченная площадь."}</p>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Выберите тип пациента</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Правило девяток — быстрая оценка площади ожоговой поверхности. Учитываются только ожоги II степени и глубже (эритема без пузырей не считается). У детей голова относительно больше, а ноги меньше, поэтому используются иные проценты. Для небольших разрозненных ожогов удобнее правило ладони (ладонь пациента с пальцами ≈ 1% поверхности тела).</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Wallace AB. Lancet. 1951;1(6653):501-504.</p>
      </div>
    </div>
  );
}
