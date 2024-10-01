export interface Shift {
  id: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  shiftType: string;
  isHoliday: boolean;
  job_id: string;
}

export async function getData(id: string) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/income/${id}/calculate?date=${new Date().toISOString().slice(0, 10)}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return response.json();
}

export async function getAllShiftsByJobId(jobId: String) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shift/byJob/${jobId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      return [];
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return response.json();
}

export async function getPaginatedData(id: string, page: number, size: number) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/shift/byWorker-paginated/${id}?date=${new Date()
      .toISOString()
      .slice(0, 10)}&page=${page}&size=${size}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  const paginatedData = await response.json();

  return {
    shifts: paginatedData.content, // renamed to 'shifts' for clarity
    totalPages: paginatedData.totalPages,
    totalElements: paginatedData.totalElements,
    pageNumber: paginatedData.number,
    pageSize: paginatedData.size,
  };
}
