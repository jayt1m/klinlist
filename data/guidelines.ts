export type Guideline = {
  id: string;
  title: string;
  specialty: string;
  approvedDate: string;
  summary: string;
  url: string;
  sourceLabel: string;
};

export const guidelines: Guideline[] = [
  {
    id: "af",
    title: "Фибрилляция и трепетание предсердий у взрослых",
    specialty: "Кардиология",
    approvedDate: "2025",
    summary:
      "Диагностика, стратификация риска инсульта и кровотечений (CHA₂DS₂-VASc, HAS-BLED), выбор антикоагулянтной терапии и контроль ритма/частоты.",
    url: "https://cr.minzdrav.gov.ru/",
    sourceLabel: "Рубрикатор Минздрава",
  },
  {
    id: "nstemi",
    title: "Острый коронарный синдром без подъёма сегмента ST ЭКГ",
    specialty: "Кардиология",
    approvedDate: "утв. 26.09.2024",
    summary:
      "Диагностика и лечение ОКСбпST, стратификация риска по шкале GRACE, сроки и показания к инвазивной стратегии.",
    url: "https://cr.minzdrav.gov.ru/",
    sourceLabel: "Рубрикатор Минздрава",
  },
  {
    id: "chf",
    title: "Хроническая сердечная недостаточность",
    specialty: "Кардиология",
    approvedDate: "утв. 25.09.2024",
    summary:
      "Классификация ХСН, диагностический алгоритм, медикаментозная и немедикаментозная терапия, показания к устройствам.",
    url: "https://base.garant.ru/410499626/",
    sourceLabel: "ГАРАНТ",
  },
  {
    id: "lipids",
    title: "Нарушения липидного обмена",
    specialty: "Кардиология",
    approvedDate: "2023, актуализация 2024",
    summary:
      "Оценка сердечно-сосудистого риска по шкале SCORE2/SCORE2-OP, целевые уровни ЛПНП, гиполипидемическая терапия.",
    url: "https://cr.minzdrav.gov.ru/",
    sourceLabel: "Рубрикатор Минздрава",
  },
  {
    id: "hypertension",
    title: "Артериальная гипертензия у взрослых",
    specialty: "Кардиология",
    approvedDate: "утв. 12.09.2024",
    summary:
      "Диагностика, классификация степеней и стадий АГ, стратификация риска, медикаментозная терапия и целевые уровни АД.",
    url: "https://base.garant.ru/410479834/",
    sourceLabel: "ГАРАНТ",
  },
  {
    id: "ckd",
    title: "Хроническая болезнь почек",
    specialty: "Нефрология",
    approvedDate: "актуализируется",
    summary:
      "Критерии диагностики и стадирования ХБП по СКФ и альбуминурии, тактика ведения и нефропротекция.",
    url: "https://cr.minzdrav.gov.ru/",
    sourceLabel: "Рубрикатор Минздрава",
  },
];
