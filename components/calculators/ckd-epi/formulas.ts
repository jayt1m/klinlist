import { EGFRData } from "./types";


// Перевод креатинина в мг/дл
// Используется внутри всех формул

function convertCreatinine(
  value: number,
  unit: "umol" | "mgdl" | "mmol"
): number {

  // мкмоль/л → мг/дл
  if (unit === "umol") {
    return value / 88.4;
  }


  // ммоль/л → мг/дл
  // 1 ммоль/л креатинина = 1000 мкмоль/л
  if (unit === "mmol") {
    return (value * 1000) / 88.4;
  }


  // мг/дл
  return value;
}




// =======================================
// CKD-EPI 2021 (Creatinine)
// результат мл/мин/1,73 м²
// =======================================

export function calculateCKDEPI(
  data: EGFRData
): number {


  const scr = convertCreatinine(
    data.creatinine,
    data.creatinineUnit
  );


  const k =
    data.sex === "female"
      ? 0.7
      : 0.9;


  const alpha =
    data.sex === "female"
      ? -0.241
      : -0.302;


  const sexCoefficient =
    data.sex === "female"
      ? 1.012
      : 1;



  const ratio =
    scr / k;



  const min =
    Math.min(
      ratio,
      1
    );


  const max =
    Math.max(
      ratio,
      1
    );



  const egfr =
    142 *
    Math.pow(min, alpha) *
    Math.pow(max, -1.200) *
    Math.pow(0.9938, data.age) *
    sexCoefficient;



  return Number(
    egfr.toFixed(1)
  );

}






// =======================================
// CKD-EPI 2009 (Creatinine)
// результат мл/мин/1,73 м²
// Формула указана в глоссарии действующих клинических
// рекомендаций Минздрава России «Хроническая болезнь почек (ХБП)»
// Levey AS, et al. Ann Intern Med. 2009;150(9):604-612.
// Расовый коэффициент не применяется (использовался только
// для лиц негроидной расы в исходном американском исследовании)
// =======================================

export function calculateCKDEPI2009(
  data: EGFRData
): number {


  const scr = convertCreatinine(
    data.creatinine,
    data.creatinineUnit
  );


  const k =
    data.sex === "female"
      ? 0.7
      : 0.9;


  const alpha =
    data.sex === "female"
      ? -0.329
      : -0.411;


  const sexCoefficient =
    data.sex === "female"
      ? 1.018
      : 1;



  const ratio =
    scr / k;



  const min =
    Math.min(
      ratio,
      1
    );


  const max =
    Math.max(
      ratio,
      1
    );



  const egfr =
    141 *
    Math.pow(min, alpha) *
    Math.pow(max, -1.209) *
    Math.pow(0.993, data.age) *
    sexCoefficient;



  return Number(
    egfr.toFixed(1)
  );

}




// =======================================
// MDRD 4 переменные
// результат мл/мин/1,73 м²
// =======================================

export function calculateMDRD(
  data: EGFRData
): number {


  const scr = convertCreatinine(
    data.creatinine,
    data.creatinineUnit
  );



  const sexCoefficient =
    data.sex === "female"
      ? 0.742
      : 1;



  const egfr =
    175 *
    Math.pow(scr, -1.154) *
    Math.pow(data.age, -0.203) *
    sexCoefficient;



  return Number(
    egfr.toFixed(1)
  );

}







// =======================================
// Cockcroft-Gault
// клиренс креатинина мл/мин
// =======================================

export function calculateCockcroftGault(
  data: EGFRData
): number {


  const scr = convertCreatinine(
    data.creatinine,
    data.creatinineUnit
  );



  let clearance =
    (
      (140 - data.age) *
      data.weight
    )
    /
    (
      72 * scr
    );



  if (data.sex === "female") {

    clearance =
      clearance * 0.85;

  }



  return Number(
    clearance.toFixed(1)
  );

}