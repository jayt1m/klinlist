"use client";
import { useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";

export default function DukeEndocarditisCalculator() {
  const [bloodCultures, setBloodCultures] = useState(false);
  const [imaging, setImaging] = useState(false);

  const [predisposition, setPredisposition] = useState(false);
  const [fever, setFever] = useState(false);
  const [vascular, setVascular] = useState(false);
  const [immunologic, setImmunologic] = useState(false);
  const [microbiologic, setMicrobiologic] = useState(false);

  const major = [bloodCultures, imaging].filter(Boolean).length;
  const minor = [predisposition, fever, vascular, immunologic, microbiologic].filter(Boolean).length;

  const definite = major === 2 || (major === 1 && minor >= 3) || minor >= 5;
  const possible = !definite && ((major === 1 && minor >= 1) || minor >= 3);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <CalculatorHeader calculatorId="duke-endocarditis" />
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Большие критерии</h2>
        <div className="space-y-4">
          <CheckboxCard title="Положительная гемокультура" description="Типичные для ИЭ микроорганизмы в 2 раздельных посевах, или стойкая бактериемия, или однократный посев Coxiella burnetii" points={0} checked={bloodCultures} onChange={() => setBloodCultures(!bloodCultures)} />
          <CheckboxCard title="Признаки поражения эндокарда" description="Вегетации, абсцесс, новая частичная несостоятельность протеза клапана по данным ЭхоКГ, или новая клапанная регургитация" points={0} checked={imaging} onChange={() => setImaging(!imaging)} />
        </div>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Малые критерии</h2>
        <div className="space-y-4">
          <CheckboxCard title="Предрасполагающие факторы" description="Порок сердца, протез клапана, внутривенное употребление наркотиков" points={0} checked={predisposition} onChange={() => setPredisposition(!predisposition)} />
          <CheckboxCard title="Лихорадка ≥38°C" points={0} checked={fever} onChange={() => setFever(!fever)} />
          <CheckboxCard title="Сосудистые феномены" description="Эмболии крупных артерий, септические инфаркты лёгких, микотические аневризмы, внутричерепные кровоизлияния, пятна Джейнуэя" points={0} checked={vascular} onChange={() => setVascular(!vascular)} />
          <CheckboxCard title="Иммунологические феномены" description="Гломерулонефрит, узелки Ослера, пятна Рота, ревматоидный фактор" points={0} checked={immunologic} onChange={() => setImmunologic(!immunologic)} />
          <CheckboxCard title="Микробиологические данные" description="Положительная гемокультура, не соответствующая большому критерию" points={0} checked={microbiologic} onChange={() => setMicrobiologic(!microbiologic)} />
        </div>
      </div>
      <div className={`rounded-3xl border p-8 ${definite ? "border-red-300 bg-red-50" : possible ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
        <div className="mb-3 flex items-center gap-3">
          {definite || possible ? <CircleAlert className="h-7 w-7 text-amber-600" /> : <CircleCheck className="h-7 w-7 text-emerald-600" />}
          <h3 className="text-2xl font-bold">{definite ? "Определённый инфекционный эндокардит" : possible ? "Возможный инфекционный эндокардит" : "Диагноз отвергнут по критериям"}</h3>
        </div>
        <p className="text-sm text-gray-700">Больших критериев: {major} · Малых критериев: {minor}</p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Определённый ИЭ: 2 больших, либо 1 большой + 3 малых, либо 5 малых критериев. Возможный ИЭ: 1 большой + 1 малый, либо 3 малых критерия. Патоморфологические критерии (микроорганизмы в вегетации или гистологическое подтверждение) сами по себе устанавливают диагноз независимо от клинических критериев.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Li JS, et al. Clin Infect Dis. 2000;30(4):633-638 (модифицированные критерии Дьюка).</p>
      </div>
    </div>
  );
}
