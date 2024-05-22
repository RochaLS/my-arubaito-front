import axios from "axios";

export interface Shift {
  id: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  shiftType: string;
}

export const fetchShifts = async (): Promise<Shift[]> => {
  const res = await axios.get(
    "http://localhost:8080/api/income/4/1/calculate?date=2024-02-28"
  );
  return res.data;
};
