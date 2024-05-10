import { JobForm } from "@/app/components/JobForm";
import { Navbar } from "@/app/components/Navbar";

export default function Page() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <JobForm
        onSubmit={handleSubmit}
        data={{
          hourlyRate: 22.55,
          jobTitle: "Sales Associate",
          jobId: 1,
        }}
      />
    </>
  );
}
