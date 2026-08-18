"use client";
import { useState } from "react";
import CalculatorHeader from "@/components/ui/CalculatorHeader";
import CheckboxCard from "@/components/ui/CheckboxCard";
import RadioCard from "@/components/ui/RadioCard";
import ResultCard from "@/components/ui/ResultCard";

const onePoint = [
  { key: "age4160", title: "Возраст 41–60 лет" },
  { key: "minorSurgery", title: "Малое хирургическое вмешательство" },
  { key: "bmi25", title: "ИМТ >25 кг/м²" },
  { key: "legEdema", title: "Отёки нижних конечностей" },
  { key: "varicose", title: "Варикозное расширение вен" },
  { key: "pregnancy", title: "Беременность или послеродовый период" },
  { key: "abortions", title: "Необъяснимые повторные выкидыши в анамнезе" },
  { key: "contraceptives", title: "Приём оральных контрацептивов или ЗГТ" },
  { key: "sepsis", title: "Сепсис (в течение последнего месяца)" },
  { key: "lungDisease", title: "Тяжёлое заболевание лёгких, включая пневмонию (в течение месяца)" },
  { key: "lungFunction", title: "Нарушение функции лёгких (ХОБЛ)" },
  { key: "mi", title: "Острый инфаркт миокарда" },
  { key: "chf", title: "Застойная сердечная недостаточность (в течение месяца)" },
  { key: "ibd", title: "Воспалительное заболевание кишечника в анамнезе" },
  { key: "bedRest", title: "Пациент на постельном режиме" },
];

const twoPoints = [
  { key: "age6174", title: "Возраст 61–74 года" },
  { key: "arthroscopy", title: "Артроскопическая операция" },
  { key: "majorSurgery", title: "Большая открытая операция (>45 минут)" },
  { key: "laparoscopy", title: "Лапароскопическая операция (>45 минут)" },
  { key: "malignancy", title: "Злокачественное новообразование" },
  { key: "bedRest72", title: "Постельный режим >72 часов" },
  { key: "cast", title: "Иммобилизация конечности гипсом" },
  { key: "centralLine", title: "Центральный венозный катетер" },
];

const threePoints = [
  { key: "age75", title: "Возраст ≥75 лет" },
  { key: "vteHistory", title: "ВТЭО в анамнезе" },
  { key: "familyVte", title: "Семейный анамнез ВТЭО" },
  { key: "factorV", title: "Мутация фактора V Лейден" },
  { key: "prothrombin", title: "Мутация протромбина 20210A" },
  { key: "lupus", title: "Волчаночный антикоагулянт" },
  { key: "anticardiolipin", title: "Антитела к кардиолипину" },
  { key: "homocysteine", title: "Повышенный уровень гомоцистеина" },
  { key: "hit", title: "Гепарин-индуцированная тромбоцитопения" },
  { key: "thrombophilia", title: "Другая врождённая или приобретённая тромбофилия" },
];

const fivePoints = [
  { key: "stroke", title: "Инсульт (в течение месяца)" },
  { key: "arthroplasty", title: "Плановое эндопротезирование крупного сустава" },
  { key: "hipFracture", title: "Перелом бедра, таза или голени" },
  { key: "spinalInjury", title: "Острая травма спинного мозга (в течение месяца)" },
];

export default function CapriniCalculator() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setChecked((p) => ({ ...p, [k]: !p[k] }));

  const score =
    onePoint.filter((c) => checked[c.key]).length * 1 +
    twoPoints.filter((c) => checked[c.key]).length * 2 +
    threePoints.filter((c) => checked[c.key]).length * 3 +
    fivePoints.filter((c) => checked[c.key]).length * 5;

  const category = score === 0 ? "verylow" : score <= 2 ? "low" : score <= 4 ? "mid" : "high";
  const color = category === "verylow" || category === "low" ? "green" : category === "mid" ? "yellow" : "red";
  const label = { verylow: "Очень низкий риск (~0%)", low: "Низкий риск (~1.5%)", mid: "Умеренный риск (~3%)", high: "Высокий риск (~6% и выше)" }[category];

  const groups = [
    { title: "1 балл", items: onePoint, pts: 1 },
    { title: "2 балла", items: twoPoints, pts: 2 },
    { title: "3 балла", items: threePoints, pts: 3 },
    { title: "5 баллов", items: fivePoints, pts: 5 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <CalculatorHeader calculatorId="caprini" />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">{g.title}</h2>
              <div className="space-y-3">
                {g.items.map((c) => (
                  <CheckboxCard key={c.key} title={c.title} points={g.pts} checked={!!checked[c.key]} onChange={() => toggle(c.key)} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <ResultCard score={score} unit="баллов" title="Шкала Caprini" recommendation={label} color={color} />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
        <p>Оценка риска венозных тромбоэмболических осложнений у хирургических пациентов для выбора профилактики. Ориентировочно: 0–1 балл — ранняя активизация; 2 балла — механическая профилактика; 3–4 балла — фармакологическая или механическая профилактика; ≥5 баллов — фармакологическая профилактика, при высоком риске — продлённая после выписки. Итоговое решение принимается с учётом риска кровотечения.</p>
        <p className="mt-3 text-xs text-gray-500">Источник: Caprini JA. Dis Mon. 2005;51(2-3):70-78.</p>
      </div>
    </div>
  );
}
