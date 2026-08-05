export type Sex = "male" | "female";

export type QTcData = {
  qt: number;
  heartRate: number;
  sex: Sex;
};

export type QTcCategory = "normal" | "borderline" | "prolonged" | "high-risk";
