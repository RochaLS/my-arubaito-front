import { Locale, format, parse } from "date-fns";
import { enUS } from "date-fns/locale";

//Only US for now
const localeMap: { [key: string]: Locale } = {
  "en-US": enUS, // English (United States)
};

export function convertTime(time: string): string {
  const userLocale = navigator.language || "en-US";
  const locale = localeMap[userLocale] || enUS; // Fallback to enUS if for some reason locale is not found

  const timeWithoutSeconds = time.split(":").slice(0, 2).join(":");

  const currentDate = new Date();
  const parsedTime = parse(timeWithoutSeconds, "HH:mm", currentDate);
  return format(parsedTime, "p", { locale });
}
