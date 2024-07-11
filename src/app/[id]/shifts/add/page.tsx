"use client";

import { Navbar } from "@/app/components/Navbar";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorBanner } from "@/app/components/ErrorBanner";
import { ShiftForm } from "@/app/components/ShiftForm";
import { getJobsByWorker } from "@/app/util/dataFetch";

interface ShiftAddPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: ShiftAddPageProps) {
  const { id } = params;
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getJobsByWorker(id);
        setData(fetchedData);
        console.log(data);
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
  }, [id, router]);

  const handleShiftSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift/add`,
        {
          method: "POST",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (errorMsg && errorMsg !== "404") {
    return <ErrorBanner currentUserId={id} message={errorMsg} />;
  }

  return (
    <>
      <Navbar currentUserId={id} />
      <ShiftForm
        isSubmitting={isSubmitting}
        jobs={data}
        onSubmit={handleShiftSubmit}
      />
    </>
  );
}
