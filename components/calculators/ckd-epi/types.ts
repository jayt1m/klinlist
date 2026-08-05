export type Sex = "male" | "female";

export type CreatinineUnit =
  | "umol"
  | "mgdl"
  | "mmol";

export interface EGFRData {
  sex: Sex;

  age: number;

  weight: number;

  creatinine: number;

  creatinineUnit: CreatinineUnit;
}