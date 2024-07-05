"use client";

import { JobForm } from "@/app/components/JobForm";
import { Navbar } from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Job } from "@/app/util/types";
import { checkResponse } from "@/app/util/checkResponse";

interface JobEditPageProps {
  params: {
    id: string;
    jobId: string;
  };
}

async function getData(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  checkResponse(response);

  return response.json();
}

export default function Page({ params }: JobEditPageProps) {
  const { id, jobId } = params;
  const [data, setData] = useState<Job>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(jobId);
        setData(fetchedData);
      } catch (error: any) {
        setErrorMsg("Error fetching job, try again later.");
        router.back();
      }
    };
    fetchData();
  }, [jobId, router]);

  const handleJobUpdate: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job/update/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hourlyRate: data.hourlyRate,
            title: data.jobTitle,
            workerId: id,
          }),
          credentials: "include", // Our backend is separate, not same domain so we need this.
        }
      );
      if (!response.ok) {
        setErrorMsg("Error updating job. Try again later.");
      } else {
        setErrorMsg("");
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar currentUserId={id} />
      <JobForm
        onSubmit={handleJobUpdate}
        data={{
          hourlyRate: data?.hourlyRate,
          jobTitle: data?.title,
          jobId: data?.id,
        }}
      />
    </>
  );
}
