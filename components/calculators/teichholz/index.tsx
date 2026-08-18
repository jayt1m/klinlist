"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function TeichholzCalculator() {
  const [edd, setEdd] = useState("");
  const [esd, setEsd] = useState("");

  const isValid = edd !== "" && esd !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const d = Number(edd) / 10;
    const s = Number(esd) / 10;
    const edv = (7 / (2.4 + d)) * Math.pow(d, 3);
    const esv = (7 / (2.4 + s)) * Math.pow(s, 3);
    const ef = ((edv - esv) / edv) * 100;
    const fs = ((Number(edd) - Number(esd)) / Number(edd)) * 100;
    return { edv: Math.round(edv), esv: Math.round(esv), ef: Number(ef.toFixed(1)), fs: Number(fs.toFixed(1)) };
  }, [isValid, edd, esd]);

  const resultRef = useScrollToResult(result !== null);
  const reduced = result !== null && result.ef < 50;

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="teichholz" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные (М-режим ЭхоКГ)</h2>
          <div className="space-y-6">
            <InputWithUnit label="КДР — конечно-диастолический размер ЛЖ" value={edd} unit="мм" onChange={setEdd} />
            <InputWithUnit label="КСР — конечно-систолический размер ЛЖ" value={esd} unit="мм" onChange={setEsd} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 space-y-4 ${reduced ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
              <div>
                <div className="text-sm text-gray-600">Фракция выброса (по Тейхольцу)</div>
                <div className="mt-1 text-5xl font-bold">{result.ef}<span className="ml-2 text-lg font-normal">%</span></div>
                <div className="mt-2 text-sm font-semibold">{result.ef >= 50 ? "Сохранная (≥50%)" : result.ef >= 40 ? "Умеренно сниженная (40–49%)" : "Сниженная (<40%)"}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/70 p-3"><div className="text-xs text-gray-600">КДО</div><div className="text-lg font-bold">{result.edv} мл</div></div>
                <div className="rounded-xl bg-white/70 p-3"><div className="text-xs text-gray-600">КСО</div><div className="text-lg font-bold">{result.esv} мл</div></div>
                <div className="rounded-xl bg-white/70 p-3"><div className="text-xs text-gray-600">ФУ</div><div className="text-lg font-bold">{result.fs}%</div></div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Формула Тейхольца рассчитывает объёмы ЛЖ из линейных размеров в М-режиме. Важное ограничение: метод предполагает симметричное сокращение и даёт ошибочные значения при региональных нарушениях сократимости (после инфаркта, при блокаде ножки пучка Гиса, аневризме ЛЖ). В этих случаях рекомендован метод дисков Симпсона в двухмерном режиме, который является предпочтительным по действующим рекомендациям.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Teichholz LE, et al. Am J Cardiol. 1976;37(1):7-11.</p>
      </div>
    </div>
  );
}
