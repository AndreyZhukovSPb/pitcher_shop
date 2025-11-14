const transliterate = (str: string): string => {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };

  return str
    .toLowerCase()
    .split("")
    .map(char => map[char] ?? char)
    .join("")
    .replace(/\s+/g, ""); // убираем пробелы
};

export const cartIdHandler = (
  itemId: string,
  currentSize: string | number,
  millingType?: string
): string => {
  const normalizedMilling = millingType ? transliterate(millingType) : undefined;

  return [itemId, currentSize, normalizedMilling]
    .filter(v => v !== undefined && v !== null && v !== "") // сохраняем 0!
    .join("_");
};

