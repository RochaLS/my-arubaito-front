export function formatDate(dateString: string) {
  const dateParts = dateString.split("-");
  //Temporary solution, wanna deal timezones as well in a later point
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}
