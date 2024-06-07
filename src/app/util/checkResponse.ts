export function checkResponse(response: Response) {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }
}
