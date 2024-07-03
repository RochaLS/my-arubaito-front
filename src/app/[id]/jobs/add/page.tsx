"use client";

import { JobForm } from "@/app/components/JobForm";
import { Navbar } from "@/app/components/Navbar";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface JobAddPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: JobAddPageProps) {
  const { id } = params;
  const router = useRouter();

  const [authErrorMsg, setAuthErrorMsg] = useState<string>("");

  const handleJobSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job/add`,
        {
          method: "POST",
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
        setAuthErrorMsg("Error adding job. Try again later.");
      } else {
        setAuthErrorMsg("");
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar currentUserId={id} />
      <JobForm onSubmit={handleJobSubmit} />
    </>
  );
}
