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
  specialty: "Анестезиология и реаниматология",
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
  specialty: "Анестезиология и реаниматология",
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
 {
  id: "crusade",
  title: "CRUSADE",
  description:
    "Риск крупного кровотечения в стационаре при ОКС без подъёма ST",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "precise-dapt",
  title: "PRECISE-DAPT",
  description:
    "Оптимальная длительность двойной антиагрегантной терапии после стентирования",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "vbg",
  title: "КЩС венозной крови",
  description:
    "Анализ кислотно-щелочного состояния и расчёт дозы гидрокарбоната натрия",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "perfusor",
  title: "Перфузор",
  description:
    "Перевод дозы (мкг/кг/мин) в скорость инфузии (мл/ч) и обратно — норадреналин, дофамин, добутамин, адреналин и другие препараты на шприцевом насосе",
  specialty: "Анестезиология и реаниматология",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "score2-op",
  title: "SCORE2-OP",
  description:
    "10-летний риск сердечно-сосудистых событий у пациентов 70-89 лет",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "nyha",
  title: "NYHA",
  description:
    "Функциональный класс хронической сердечной недостаточности",
  specialty: "Кардиология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "duke-treadmill",
  title: "Duke Treadmill Score",
  description:
    "Стратификация риска по результатам нагрузочного теста на тредмиле",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "rankin",
  title: "Модифицированная шкала Рэнкина",
  description:
    "Степень инвалидизации после инсульта",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ich-score",
  title: "ICH Score",
  description:
    "Прогноз 30-дневной летальности при внутримозговом кровоизлиянии",
  specialty: "Неврология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "canadian-ct-head",
  title: "Canadian CT Head Rule",
  description:
    "Показания к КТ головы при лёгкой черепно-мозговой травме",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "bode",
  title: "BODE Index",
  description:
    "Прогноз выживаемости при ХОБЛ",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "cat-copd",
  title: "CAT (COPD Assessment Test)",
  description:
    "Влияние ХОБЛ на повседневную жизнь пациента",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "mmrc",
  title: "mMRC",
  description:
    "Модифицированная шкала одышки",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "stop-bang",
  title: "STOP-BANG",
  description:
    "Скрининг риска синдрома обструктивного апноэ сна",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ranson",
  title: "Критерии Ranson",
  description:
    "Тяжесть острого панкреатита",
  specialty: "Гастроэнтерология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "rockall",
  title: "Шкала Rockall",
  description:
    "Риск при кровотечении из верхних отделов ЖКТ",
  specialty: "Гастроэнтерология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "apri",
  title: "APRI",
  description:
    "Неинвазивная оценка фиброза печени",
  specialty: "Гастроэнтерология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "alvarado",
  title: "Шкала Alvarado",
  description:
    "Клиническая вероятность острого аппендицита",
  specialty: "Хирургия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "free-water-deficit",
  title: "Дефицит свободной воды",
  description:
    "Расчёт дефицита воды при гипернатриемии",
  specialty: "Эндокринология",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "corrected-calcium",
  title: "Скорректированный кальций",
  description:
    "Поправка общего кальция на уровень альбумина",
  specialty: "Эндокринология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "corrected-sodium",
  title: "Скорректированный натрий",
  description:
    "Поправка натрия на гипергликемию",
  specialty: "Эндокринология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ideal-body-weight",
  title: "Идеальная масса тела",
  description:
    "Формула Девайна для расчёта доз препаратов",
  specialty: "Терапия",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "bmr",
  title: "Базальный метаболизм (BMR)",
  description:
    "Формула Миффлина-Сан Жеора",
  specialty: "Терапия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "news2",
  title: "NEWS2",
  description:
    "Раннее выявление клинического ухудшения у взрослых",
  specialty: "Терапия",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "charlson",
  title: "Индекс Charlson",
  description:
    "Оценка коморбидности и прогноза выживаемости",
  specialty: "Терапия",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "anion-gap",
  title: "Анионный интервал",
  description:
    "Диагностика метаболического ацидоза",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "sofa",
  title: "SOFA",
  description:
    "Оценка полиорганной дисфункции в ОРИТ",
  specialty: "Анестезиология и реаниматология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "mallampati",
  title: "Шкала Маллампати",
  description:
    "Предоперационная оценка трудности интубации",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "4ts",
  title: "Шкала 4Ts",
  description:
    "Претестовая вероятность гепарин-индуцированной тромбоцитопении",
  specialty: "Анестезиология и реаниматология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ecog",
  title: "ECOG",
  description:
    "Функциональный статус онкологического пациента",
  specialty: "Терапия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "nexus",
  title: "Критерии NEXUS",
  description:
    "Показания к визуализации шейного отдела позвоночника при травме",
  specialty: "Травматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "revised-trauma",
  title: "Revised Trauma Score",
  description:
    "Оценка тяжести травмы для сортировки и прогноза",
  specialty: "Травматология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "naegele",
  title: "Правило Негеле",
  description:
    "Расчёт предполагаемой даты родов",
  specialty: "Акушерство и гинекология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "waist-hip-ratio",
  title: "Отношение талия/бёдра",
  description:
    "Оценка абдоминального ожирения по критериям ВОЗ",
  specialty: "Терапия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "spesi",
  title: "sPESI",
  description:
    "Упрощённый индекс тяжести ТЭЛА — прогноз 30-дневной летальности",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "atria",
  title: "ATRIA",
  description:
    "Риск кровотечения при фибрилляции предсердий на антикоагулянтах",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "timi-stemi",
  title: "TIMI для ИМпST",
  description:
    "30-дневная летальность при инфаркте миокарда с подъёмом ST",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "duke-endocarditis",
  title: "Критерии Дьюка",
  description:
    "Диагностика инфекционного эндокардита",
  specialty: "Кардиология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "maddrey",
  title: "Дискриминантная функция Маддрея",
  description:
    "Тяжесть алкогольного гепатита",
  specialty: "Гастроэнтерология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "light-criteria",
  title: "Критерии Лайта",
  description:
    "Дифференциация экссудата и транссудата при плевральном выпоте",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "caprini",
  title: "Шкала Caprini",
  description:
    "Риск венозных тромбоэмболических осложнений у хирургических пациентов",
  specialty: "Хирургия",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "lrinec",
  title: "LRINEC",
  description:
    "Лабораторный индикатор риска некротизирующего фасциита",
  specialty: "Хирургия",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "parkland",
  title: "Формула Паркленда",
  description:
    "Расчёт объёма инфузионной терапии при ожогах",
  specialty: "Травматология",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "rule-of-nines",
  title: "Правило девяток",
  description:
    "Оценка площади ожоговой поверхности",
  specialty: "Травматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ottawa-knee",
  title: "Ottawa Knee Rule",
  description:
    "Показания к рентгенографии при травме коленного сустава",
  specialty: "Травматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "gad7",
  title: "GAD-7",
  description:
    "Скрининг генерализованного тревожного расстройства",
  specialty: "Психиатрия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "nihss",
  title: "NIHSS",
  description:
    "Оценка тяжести неврологического дефицита при инсульте",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "barthel",
  title: "Индекс Бартел",
  description:
    "Оценка независимости в повседневной жизни",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "morse",
  title: "Шкала Морсе",
  description:
    "Риск падений у госпитализированных пациентов",
  specialty: "Терапия",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "apfel",
  title: "Шкала Apfel",
  description:
    "Риск послеоперационной тошноты и рвоты",
  specialty: "Анестезиология и реаниматология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "osmolar-gap",
  title: "Осмолярный интервал",
  description:
    "Расчётная осмолярность и выявление токсичных спиртов",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "shock-index",
  title: "Шоковый индекс",
  description:
    "Быстрая оценка гемодинамической нестабильности",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "feurea",
  title: "FeUrea",
  description:
    "Фракционная экскреция мочевины — дифференциальная диагностика ОПП",
  specialty: "Нефрология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "calcium-phosphate",
  title: "Кальций-фосфорное произведение",
  description:
    "Оценка минерально-костных нарушений при ХБП",
  specialty: "Нефрология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "sirs",
  title: "Критерии ССВО (SIRS)",
  description:
    "Синдром системного воспалительного ответа",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "rass",
  title: "Шкала RASS",
  description:
    "Оценка глубины седации и ажитации в ОРИТ",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "oxygenation-index",
  title: "Индекс оксигенации paO₂/FiO₂",
  description:
    "Тяжесть ОРДС по Берлинскому определению",
  specialty: "Анестезиология и реаниматология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "cage",
  title: "CAGE",
  description:
    "Краткий скрининг проблемного употребления алкоголя",
  specialty: "Психиатрия",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "tiffno",
  title: "Индекс Тиффно",
  description:
    "ОФВ1/ФЖЕЛ — выявление бронхиальной обструкции",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "pack-years",
  title: "Индекс курящего человека",
  description:
    "Расчёт пачка/лет и оценка риска ХОБЛ и рака лёгкого",
  specialty: "Пульмонология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "six-minute-walk",
  title: "Тест 6-минутной ходьбы",
  description:
    "Расчёт должной дистанции",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "peak-flow",
  title: "Пиковая скорость выдоха",
  description:
    "Должные значения ПСВ и зоны контроля астмы",
  specialty: "Пульмонология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "atherogenic-index",
  title: "Коэффициент атерогенности",
  description:
    "Соотношение атерогенных и антиатерогенных липидов",
  specialty: "Кардиология",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "map-bp",
  title: "Среднее артериальное давление",
  description:
    "Расчёт САД и пульсового давления",
  specialty: "Кардиология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "teichholz",
  title: "Фракция выброса по Тейхольцу",
  description:
    "Расчёт объёмов и ФВ левого желудочка из линейных размеров",
  specialty: "Кардиология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "caro-index",
  title: "Индекс Caro",
  description:
    "Отношение глюкозы к инсулину — оценка инсулинорезистентности",
  specialty: "Эндокринология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "tyg-index",
  title: "Индекс TyG",
  description:
    "Суррогатный маркер инсулинорезистентности без анализа на инсулин",
  specialty: "Эндокринология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
 {
  id: "ganzoni",
  title: "Формула Ганзони",
  description:
    "Расчёт общего дефицита железа",
  specialty: "Гематология",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "infusion-rate",
  title: "Скорость инфузии",
  description:
    "Перевод объёма и времени в капли в минуту и мл/ч",
  specialty: "Терапия",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "norton",
  title: "Шкала Нортон",
  description:
    "Риск развития пролежней",
  specialty: "Терапия",
  category: "Риск",
  icon: "Activity",
  color: "blue",
},
 {
  id: "holliday-segar",
  title: "Правило 4-2-1 (Холлидея-Сегара)",
  description:
    "Поддерживающая потребность в жидкости у детей",
  specialty: "Педиатрия",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "pediatric-antipyretic",
  title: "Жаропонижающие у детей",
  description:
    "Расчёт дозы парацетамола и ибупрофена по массе тела",
  specialty: "Педиатрия",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "hyponatremia-correction",
  title: "Коррекция гипонатриемии",
  description:
    "Расчёт изменения натрия по формуле Адрогé-Мадиаса",
  specialty: "Нефрология",
  category: "Дозирование",
  icon: "Activity",
  color: "blue",
},
 {
  id: "mrc-muscle",
  title: "Шкала MRC",
  description:
    "Оценка мышечной силы",
  specialty: "Неврология",
  category: "Диагностика",
  icon: "Activity",
  color: "blue",
},
];