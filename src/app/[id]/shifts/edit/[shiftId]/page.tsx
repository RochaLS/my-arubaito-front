"use client";

import { Navbar } from "@/app/components/Navbar";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorBanner } from "@/app/components/ErrorBanner";
import { ShiftForm } from "@/app/components/ShiftForm";
import { getJobsByWorker, getShiftById } from "@/app/util/dataFetch";

interface ShiftEditPageProps {
  params: {
    id: string;
    shiftId: string;
  };
}

export default function Page({ params }: ShiftEditPageProps) {
  const { id, shiftId } = params;
  console.log(shiftId);
  const [jobs, setJobs] = useState<any>(null);
  const [shift, setShift] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedJobs = await getJobsByWorker(id);
        setJobs(fetchedJobs);
        const fetchedShift = await getShiftById(shiftId);
        console.log(fetchedShift);
        setShift(fetchedShift);
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          router.push("/login");
        } else if (error.message === "Not found") {
          setErrorMsg("404");
        } else {
          setErrorMsg("Error fetching shifts, try again later.");
        }
      }
    };

    fetchData();
  }, []);

  const handleShiftUpdate: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/shift/update/${shiftId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: data.date,
            startTime: data.startTime,
            endDate: data.date,
            endTime: data.endTime,
            shiftType: data.shiftType,
            job_id: data.job,
            worker_id: id,
          }),
          credentials: "include", // Our backend is separate, not same domain so we need this.
        }
      );

      if (!response.ok) {
        setErrorMsg("Error adding shift. Try again later.");
      } else {
        setErrorMsg("");
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (errorMsg && errorMsg !== "404") {
    return <ErrorBanner currentUserId={id} message={errorMsg} />;
  }

  return (
    <>
      <Navbar currentUserId={id} />
      <ShiftForm shiftData={shift} jobs={jobs} onSubmit={handleShiftUpdate} />
    </>
  );
}
