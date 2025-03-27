export const formatDateTime = (dateStr: string, format: number): string => {
  const date = new Date(dateStr);

  switch (format) {
    case 1: // Format: YYYY-MM-DD
      return date.toISOString().split("T")[0];
    case 2: // Format: DD/MM/YYYY
      return `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`;
    case 3: // Format: MM-DD-YYYY HH:mm
      return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}-${date.getFullYear()} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    case 4: // Format: Full readable date
      return date.toLocaleString();
    default:
      throw new Error("Invalid format number");
  }
};
