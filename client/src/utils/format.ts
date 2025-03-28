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

export const formatTimeDifference = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return diffInSeconds === 1
      ? "1 second ago"
      : `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
};
