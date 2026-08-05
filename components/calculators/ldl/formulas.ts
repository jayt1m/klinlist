import { LDLData } from "./types";


// Конверсия ммоль/л ↔ мг/дл
// Холестерин: ×38.67, Триглицериды: ×88.5

function toMgDl(data: LDLData): {
  tc: number;
  hdl: number;
  tg: number;
} {

  if (data.unit === "mmol") {

    return {
      tc: data.totalChol * 38.67,
      hdl: data.hdl * 38.67,
      tg: data.triglycerides * 88.5,
    };

  }

  return {
    tc: data.totalChol,
    hdl: data.hdl,
    tg: data.triglycerides,
  };

}


// Формула Фридвальда: ЛПНП = ОХС − ЛПВП − ТГ/5 (мг/дл)
// Неприменима при ТГ ≥400 мг/дл (≈4.5 ммоль/л)

export function isFriedewaldValid(
  data: LDLData
): boolean {

  const { tg } = toMgDl(data);

  return tg < 400;

}


export function calculateLDL(
  data: LDLData
): number | null {

  if (!isFriedewaldValid(data)) {
    return null;
  }

  const { tc, hdl, tg } = toMgDl(data);

  const ldlMgDl = tc - hdl - tg / 5;

  if (data.unit === "mmol") {
    return Number((ldlMgDl / 38.67).toFixed(2));
  }

  return Number(ldlMgDl.toFixed(0));

}
