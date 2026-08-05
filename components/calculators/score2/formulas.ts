import { CholesterolUnit, RiskRegion, SCORE2Data, Sex } from "./types";


// Перевод холестерина в ммоль/л
// 1 ммоль/л ≈ 38.67 мг/дл (для холестерина)

export function convertCholesterol(
  value: number,
  unit: CholesterolUnit
): number {

  if (unit === "mgdl") {
    return value / 38.67;
  }

  return value;
}


// =======================================
// Коэффициенты модели SCORE2
// (SCORE2 Working Group, Eur Heart J 2021;42:2439–2454)
//
// Переменные центрируются и стандартизируются,
// затем строится линейный предиктор с учётом
// взаимодействий с возрастом (эффект факторов риска
// снижается с возрастом).
// =======================================

type Betas = {
  age: number;
  smoking: number;
  sbp: number;
  chol: number;
  hdl: number;
  ageSmoking: number;
  ageSbp: number;
  ageChol: number;
  ageHdl: number;
};

const BETAS: Record<Sex, Betas> = {
  male: {
    age: 0.3742,
    smoking: 0.6012,
    sbp: 0.2777,
    chol: 0.1458,
    hdl: -0.2698,
    ageSmoking: -0.0755,
    ageSbp: -0.0255,
    ageChol: -0.0281,
    ageHdl: 0.0426,
  },
  female: {
    age: 0.4648,
    smoking: 0.7744,
    sbp: 0.3131,
    chol: 0.1002,
    hdl: -0.2606,
    ageSmoking: -0.1088,
    ageSbp: -0.0277,
    ageChol: -0.0226,
    ageHdl: 0.0613,
  },
};

// Базовая 10-летняя выживаемость (без калибровки по региону)
const BASELINE_SURVIVAL: Record<Sex, number> = {
  male: 0.9605,
  female: 0.9776,
};

// Калибровочные коэффициенты по региону риска (scale1, scale2)
const REGION_SCALES: Record<Sex, Record<RiskRegion, [number, number]>> = {
  male: {
    low: [-0.5699, 0.7476],
    moderate: [-0.1565, 0.8009],
    high: [0.3207, 0.9360],
    veryhigh: [0.5836, 0.8294],
  },
  female: {
    low: [-0.738, 0.7019],
    moderate: [-0.3143, 0.7701],
    high: [0.571, 0.9369],
    veryhigh: [0.9412, 0.8329],
  },
};


// =======================================
// Расчёт 10-летнего риска фатальных и
// нефатальных сердечно-сосудистых событий (%)
// =======================================

export function calculateSCORE2(
  data: SCORE2Data
): number {

  const tchol = convertCholesterol(
    data.totalChol,
    data.totalCholUnit
  );

  const hdl = convertCholesterol(
    data.hdl,
    data.hdlUnit
  );

  const cage = (data.age - 60) / 5;
  const csbp = (data.sbp - 120) / 20;
  const cchol = tchol - 6;
  const chdl = (hdl - 1.3) / 0.5;
  const smoking = data.smoking ? 1 : 0;

  const b = BETAS[data.sex];

  const x =
    b.age * cage +
    b.smoking * smoking +
    b.sbp * csbp +
    b.chol * cchol +
    b.hdl * chdl +
    b.ageSmoking * cage * smoking +
    b.ageSbp * cage * csbp +
    b.ageChol * cage * cchol +
    b.ageHdl * cage * chdl;

  const s0 = BASELINE_SURVIVAL[data.sex];

  const rawRisk = 1 - Math.pow(s0, Math.exp(x));

  const [scale1, scale2] =
    REGION_SCALES[data.sex][data.region];

  const calibratedRisk =
    1 -
    Math.exp(
      -Math.exp(
        scale1 +
          scale2 * Math.log(-Math.log(1 - rawRisk))
      )
    );

  return Number(
    (calibratedRisk * 100).toFixed(1)
  );
}
