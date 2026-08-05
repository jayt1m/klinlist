export type CHA2DS2VASCData = {
  sex: "male" | "female";

  heartFailure: boolean;
  hypertension: boolean;
  age75: boolean;
  age6574: boolean;
  diabetes: boolean;
  stroke: boolean;
  vascularDisease: boolean;
};