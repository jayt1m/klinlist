import { CreatinineUnit, GRACEData, KillipClass } from "./types";


// Перевод креатинина в мг/дл (таблица баллов построена на мг/дл)

export function convertCreatinine(
  value: number,
  unit: CreatinineUnit
): number {

  if (unit === "umol") {
    return value / 88.4;
  }

  return value;
}


// =======================================
// Балльные таблицы GRACE (модель госпитальной летальности)
// Fox KA, et al. GRACE. BMJ. 2006;333(7578):1091.
// Granger CB, et al. Arch Intern Med. 2003;163(19):2345-53.
// =======================================

function getAgePoints(age: number): number {

  if (age < 30) return 0;
  if (age <= 39) return 8;
  if (age <= 49) return 25;
  if (age <= 59) return 41;
  if (age <= 69) return 58;
  if (age <= 79) return 75;
  if (age <= 89) return 91;

  return 100;

}


function getHeartRatePoints(hr: number): number {

  if (hr < 50) return 0;
  if (hr <= 69) return 3;
  if (hr <= 89) return 9;
  if (hr <= 109) return 15;
  if (hr <= 149) return 24;
  if (hr <= 199) return 38;

  return 46;

}


function getSbpPoints(sbp: number): number {

  if (sbp < 80) return 58;
  if (sbp <= 99) return 53;
  if (sbp <= 119) return 43;
  if (sbp <= 139) return 34;
  if (sbp <= 159) return 24;
  if (sbp <= 199) return 10;

  return 0;

}


function getCreatininePoints(mgdl: number): number {

  if (mgdl < 0.4) return 1;
  if (mgdl <= 0.79) return 4;
  if (mgdl <= 1.19) return 7;
  if (mgdl <= 1.59) return 10;
  if (mgdl <= 1.99) return 13;
  if (mgdl <= 3.99) return 21;

  return 28;

}


function getKillipPoints(killip: KillipClass): number {

  const points: Record<KillipClass, number> = {
    I: 0,
    II: 20,
    III: 39,
    IV: 59,
  };

  return points[killip];

}


export function calculateGRACE(
  data: GRACEData
): number {

  const creatinineMgdl = convertCreatinine(
    data.creatinine,
    data.creatinineUnit
  );

  const total =
    getAgePoints(data.age) +
    getHeartRatePoints(data.heartRate) +
    getSbpPoints(data.sbp) +
    getCreatininePoints(creatinineMgdl) +
    getKillipPoints(data.killip) +
    (data.cardiacArrest ? 39 : 0) +
    (data.stDeviation ? 28 : 0) +
    (data.elevatedMarkers ? 14 : 0);

  return total;

}
