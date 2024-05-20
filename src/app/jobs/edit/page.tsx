import { JobForm } from "@/app/components/JobForm";
import { Navbar } from "@/app/components/Navbar";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function Page() {
  const handleJobSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle form submission here
  };

  return (
    <>
      <Navbar />
      <JobForm
        onSubmit={handleJobSubmit}
        data={{
          hourlyRate: 22.55,
          jobTitle: "Sales Associate",
          jobId: 1,
        }}
      />
    </>
  );
}
