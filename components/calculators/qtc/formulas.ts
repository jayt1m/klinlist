import { QTcData } from "./types";


// RR-интервал в секундах = 60 / ЧСС

function getRRSeconds(heartRate: number): number {
  return 60 / heartRate;
}


// Формула Базетта: QTc = QT / √RR
// Наиболее распространена, но завышает коррекцию при тахикардии

export function calculateQTcBazett(
  data: QTcData
): number {

  const rr = getRRSeconds(data.heartRate);

  const qtc = data.qt / Math.sqrt(rr);

  return Number(qtc.toFixed(0));

}


// Формула Фридериции: QTc = QT / RR^(1/3)
// Считается более точной при отклонениях ЧСС от нормы

export function calculateQTcFridericia(
  data: QTcData
): number {

  const rr = getRRSeconds(data.heartRate);

  const qtc = data.qt / Math.cbrt(rr);

  return Number(qtc.toFixed(0));

}
