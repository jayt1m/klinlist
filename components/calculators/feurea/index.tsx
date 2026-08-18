"use client";
import { useMemo, useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import { useScrollToResult } from "@/lib/useScrollToResult";
import InputWithUnit from "@/components/ui/InputWithUnit";

export default function FeUreaCalculator() {
  const [urineUrea, setUrineUrea] = useState("");
  const [plasmaUrea, setPlasmaUrea] = useState("");
  const [urineCr, setUrineCr] = useState("");
  const [plasmaCr, setPlasmaCr] = useState("");

  const isValid = urineUrea !== "" && plasmaUrea !== "" && urineCr !== "" && plasmaCr !== "";

  const result = useMemo(() => {
    if (!isValid) return null;
    const v = ((Number(urineUrea) * Number(plasmaCr)) / (Number(plasmaUrea) * Number(urineCr))) * 100;
    return Number(v.toFixed(1));
  }, [isValid, urineUrea, plasmaUrea, urineCr, plasmaCr]);

  const resultRef = useScrollToResult(result !== null);
  const category = result === null ? null : result < 35 ? "prerenal" : result > 50 ? "intrinsic" : "mid";
  const color = category === "prerenal" ? "border-emerald-300 bg-emerald-50" : category === "mid" ? "border-amber-300 bg-amber-50" : "border-red-300 bg-red-50";
  const label = category === "prerenal" ? "<35% — типично для преренальной ОПП" : category === "mid" ? "35–50% — неопределённо" : ">50% — типично для интраренальной ОПП (острый канальцевый некроз)";

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="feurea" />
      <div className="grid gap-8 lg:grid-cols-[430px_1fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Исходные данные</h2>
          <p className="mb-4 text-sm text-zinc-500">Единицы могут быть любыми — важно, чтобы обе концентрации мочевины были в одних единицах, а обе концентрации креатинина — в одних.</p>
          <div className="space-y-6">
            <InputWithUnit label="Мочевина мочи" value={urineUrea} unit="ммоль/л" onChange={setUrineUrea} />
            <InputWithUnit label="Мочевина плазмы" value={plasmaUrea} unit="ммоль/л" onChange={setPlasmaUrea} />
            <InputWithUnit label="Креатинин мочи" value={urineCr} unit="мкмоль/л" onChange={setUrineCr} />
            <InputWithUnit label="Креатинин плазмы" value={plasmaCr} unit="мкмоль/л" onChange={setPlasmaCr} />
          </div>
        </div>
        <div ref={resultRef}>
          {result !== null ? (
            <div className={`rounded-3xl border p-8 ${color}`}>
              <div className="text-sm text-gray-600">FeUrea (фракционная экскреция мочевины)</div>
              <div className="mt-2 text-5xl font-bold">{result}<span className="ml-2 text-lg font-normal">%</span></div>
              <div className="mt-4 text-sm font-semibold">{label}</div>
            </div>
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50">
              <div className="text-center"><h3 className="text-xl font-semibold">Заполните параметры</h3></div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>FeUrea(%) = (мочевина мочи × креатинин плазмы) / (мочевина плазмы × креатинин мочи) × 100. Главное преимущество перед FeNa — сохраняет информативность на фоне диуретиков, поскольку реабсорбция мочевины происходит преимущественно в проксимальном канальце и меньше зависит от петлевых диуретиков.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Carvounis CP, et al. Kidney Int. 2002;62(6):2223-2229.</p>
      </div>
    </div>
  );
}
