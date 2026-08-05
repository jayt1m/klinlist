export function getCKDStage(eGFR: number): string {
  if (eGFR >= 90) return "C1";
  if (eGFR >= 60) return "C2";
  if (eGFR >= 45) return "C3a";
  if (eGFR >= 30) return "C3b";
  if (eGFR >= 15) return "C4";
  return "C5";
}

export function getCKDStageDescription(stage: string): string {
  switch (stage) {
    case "C1":
      return "Нормальная или высокая скорость клубочковой фильтрации.";

    case "C2":
      return "Незначительно сниженная скорость клубочковой фильтрации.";

    case "C3a":
      return "Лёгкое или умеренное снижение функции почек.";

    case "C3b":
      return "Умеренное или выраженное снижение функции почек.";

    case "C4":
      return "Резкое снижение функции почек.";

    case "C5":
      return "Почечная недостаточность.";

    default:
      return "";
  }
}

export function getCKDStageColor(stage: string): string {
  switch (stage) {
    case "C1":
      return "bg-green-100 text-green-700";

    case "C2":
      return "bg-lime-100 text-lime-700";

    case "C3a":
      return "bg-yellow-100 text-yellow-700";

    case "C3b":
      return "bg-orange-100 text-orange-700";

    case "C4":
      return "bg-red-100 text-red-700";

    case "C5":
      return "bg-red-700 text-white";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}