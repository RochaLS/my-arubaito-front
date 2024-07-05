export async function getJobsByWorker(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job/byWorker/${id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  console.log(data);

  return data;
}

export async function getShiftById(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shift/${id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return data;
}
