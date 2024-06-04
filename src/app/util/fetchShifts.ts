import axios from "axios";

export interface Shift {
  id: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  shiftType: string;
  job_id: string;
}

export async function getData(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/income/${id}/1/calculate?date=${new Date()
      .toISOString()
      .slice(0, 10)}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  return response.json();
}
