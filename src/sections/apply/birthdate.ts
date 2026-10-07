const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function maxBirthdate(years = 21, now = new Date()) {
  const cutoff = new Date(now.getFullYear() - years, now.getMonth(), now.getDate());
  const month = String(cutoff.getMonth() + 1).padStart(2, "0");
  const day = String(cutoff.getDate()).padStart(2, "0");
  return `${cutoff.getFullYear()}-${month}-${day}`;
}

export function isAtLeast21(isoDate: string, now = new Date()) {
  const match = ISO_DATE.exec(isoDate);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const birth = new Date(year, month - 1, day);
  const isRealDate =
    birth.getFullYear() === year &&
    birth.getMonth() === month - 1 &&
    birth.getDate() === day;

  if (!isRealDate) return false;

  return isoDate <= maxBirthdate(21, now);
}

export function formatBirthdate(isoDate: string, arabic: boolean) {
  const match = ISO_DATE.exec(isoDate);
  if (!match) return "";
  const [, year, month, day] = match;
  return arabic ? `${day}/${month}/${year}` : `${month}/${day}/${year}`;
}
