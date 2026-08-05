export type LipidUnit = "mmol" | "mgdl";

export type LDLData = {
  totalChol: number;
  hdl: number;
  triglycerides: number;
  unit: LipidUnit;
};
