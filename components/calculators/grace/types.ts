export type KillipClass = "I" | "II" | "III" | "IV";

export type CreatinineUnit = "mgdl" | "umol";

export type GRACEData = {
  age: number;
  heartRate: number;
  sbp: number;
  creatinine: number;
  creatinineUnit: CreatinineUnit;
  killip: KillipClass;
  cardiacArrest: boolean;
  stDeviation: boolean;
  elevatedMarkers: boolean;
};

export type RiskCategory = "low" | "intermediate" | "high";
