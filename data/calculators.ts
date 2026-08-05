export type Calculator = {
  id: string;
  title: string;
  description: string;
  specialty: string;
  category: string;
  icon: string;
  color: string;
  popular?: boolean;
};

export const calculators: Calculator[] = [
  {
    id: "cha2ds2-vasc",
    title: "CHA₂DS₂-VASc",
    description: "Оценка риска инсульта при фибрилляции предсердий",
    specialty: "Кардиология",
    category: "Риск",
    icon: "HeartPulse",
    color: "red",
    popular: true,
},
  {
    id: "has-bled",
    title: "HAS-BLED",
    description: "Оценка риска кровотечений",
    specialty: "Кардиология",
    category: "Риск",
    icon: "Droplets",
    color: "rose",
    popular: true,
},
  {
    id: "score2",
    title: "SCORE2",
    description: "Оценка сердечно-сосудистого риска",
    specialty: "Кардиология",
    category: "Профилактика",
    icon: "Activity",
    color: "blue",
    popular: true,
},
 {
  id: "ckd-epi",
  title: "СКФ (eGFR)",
  description:
    "Расчёт скорости клубочковой фильтрации",
  specialty: "Нефрология",
  category: "Почки",
  icon: "Kidney",
  color: "emerald",
  popular: true,
},
 {
  id: "grace",
  title: "GRACE",
  description:
    "Риск госпитальной летальности при остром коронарном синдроме",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Siren",
  color: "orange",
  popular: true,
},
 {
  id: "timi",
  title: "TIMI (UA/NSTEMI)",
  description:
    "Риск неблагоприятных событий при нестабильной стенокардии/ИМбпST",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Gauge",
  color: "purple",
},
 {
  id: "wells-pe",
  title: "Wells (ТЭЛА)",
  description:
    "Клиническая вероятность тромбоэмболии лёгочной артерии",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Wind",
  color: "sky",
},
 {
  id: "qtc",
  title: "QTc",
  description:
    "Коррекция интервала QT по формулам Базетта и Фридериции",
  specialty: "Кардиология",
  category: "ЭКГ",
  icon: "Waves",
  color: "indigo",
},
 {
  id: "ldl",
  title: "ЛПНП (Фридвальд)",
  description:
    "Расчёт холестерина ЛПНП по липидограмме",
  specialty: "Кардиология",
  category: "Липиды",
  icon: "FlaskConical",
  color: "teal",
},
 {
  id: "bmi",
  title: "ИМТ",
  description:
    "Индекс массы тела и классификация ВОЗ",
  specialty: "Терапия",
  category: "Антропометрия",
  icon: "Scale",
  color: "slate",
},
 {
  id: "chads2",
  title: "CHADS₂",
  description:
    "Оценка риска инсульта при фибрилляции предсердий (упрощённая шкала)",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "heart-score",
  title: "HEART Score",
  description:
    "Риск неблагоприятных сердечных событий при боли в груди",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "orbit",
  title: "ORBIT",
  description:
    "Оценка риска кровотечений на антикоагулянтах",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "rcri",
  title: "RCRI (Lee)",
  description:
    "Периоперационный риск кардиальных осложнений",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "padua",
  title: "Padua Prediction Score",
  description:
    "Риск ВТЭО у госпитализированных терапевтических пациентов",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "gcs",
  title: "Шкала комы Глазго",
  description:
    "Оценка уровня сознания при травме и коме",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "abcd2",
  title: "ABCD²",
  description:
    "Риск инсульта после транзиторной ишемической атаки",
  specialty: "Неврология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "hunt-hess",
  title: "Hunt-Hess",
  description:
    "Степень тяжести субарахноидального кровоизлияния",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "curb65",
  title: "CURB-65",
  description:
    "Тяжесть внебольничной пневмонии",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "wells-dvt",
  title: "Wells (ТГВ)",
  description:
    "Клиническая вероятность тромбоза глубоких вен",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "perc",
  title: "PERC",
  description:
    "Правило исключения ТЭЛА при низкой вероятности",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "homa-ir",
  title: "HOMA-IR",
  description:
    "Индекс инсулинорезистентности",
  specialty: "Эндокринология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "hba1c",
  title: "HbA1c → глюкоза",
  description:
    "Перевод гликированного гемоглобина в среднюю глюкозу",
  specialty: "Эндокринология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "fib4",
  title: "FIB-4",
  description:
    "Индекс вероятности фиброза печени",
  specialty: "Гастроэнтерология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "child-pugh",
  title: "Child-Pugh",
  description:
    "Тяжесть цирроза печени",
  specialty: "Гастроэнтерология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "glasgow-blatchford",
  title: "Glasgow-Blatchford",
  description:
    "Риск при кровотечении из верхних отделов ЖКТ",
  specialty: "Гастроэнтерология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "qsofa",
  title: "qSOFA",
  description:
    "Экспресс-оценка риска при подозрении на сепсис",
  specialty: "Реаниматология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "centor",
  title: "Centor / McIsaac",
  description:
    "Вероятность стрептококкового тонзиллофарингита",
  specialty: "Оториноларингология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "bsa",
  title: "Площадь поверхности тела",
  description:
    "Расчёт BSA по формулам Du Bois и Mosteller",
  specialty: "Терапия",
  category: "Антропометрия",
  icon: "Activity",
  color: "blue",
},
 {
  id: "apgar",
  title: "Шкала Апгар",
  description:
    "Оценка состояния новорождённого",
  specialty: "Педиатрия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "killip",
  title: "Killip",
  description:
    "Класс острой сердечной недостаточности при инфаркте миокарда",
  specialty: "Кардиология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "meld-na",
  title: "MELD-Na",
  description:
    "Тяжесть заболевания печени и приоритизация листа ожидания трансплантации",
  specialty: "Гастроэнтерология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "geneva-score",
  title: "Пересмотренная Женевская шкала",
  description:
    "Клиническая вероятность ТЭЛА на основе объективных критериев",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "fena",
  title: "FeNa",
  description:
    "Фракционная экскреция натрия — дифференциальная диагностика ОПП",
  specialty: "Нефрология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ottawa-ankle",
  title: "Ottawa Ankle Rules",
  description:
    "Показания к рентгенографии при травме голеностопа и стопы",
  specialty: "Травматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "asa-ps",
  title: "ASA",
  description:
    "Класс физического статуса пациента перед операцией",
  specialty: "Анестезиология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ipss",
  title: "IPSS",
  description:
    "Выраженность симптомов нижних мочевыводящих путей",
  specialty: "Урология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "phq9",
  title: "PHQ-9",
  description:
    "Скрининг выраженности депрессивной симптоматики",
  specialty: "Психиатрия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "bishop-score",
  title: "Шкала Бишопа",
  description:
    "Готовность шейки матки к индукции родов",
  specialty: "Акушерство и гинекология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "audit-c",
  title: "AUDIT-C",
  description:
    "Скрининг рискованного употребления алкоголя",
  specialty: "Терапия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
];