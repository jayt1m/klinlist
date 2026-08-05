export type Sex = "male" | "female";

export type RiskRegion = "low" | "moderate" | "high" | "veryhigh";

export type CholesterolUnit = "mmol" | "mgdl";

export type SCORE2Data = {
  sex: Sex;
  age: number;
  smoking: boolean;
  sbp: number;
  totalChol: number;
  totalCholUnit: CholesterolUnit;
  hdl: number;
  hdlUnit: CholesterolUnit;
  region: RiskRegion;
};

export type RiskCategory = "low" | "high" | "veryhigh";
