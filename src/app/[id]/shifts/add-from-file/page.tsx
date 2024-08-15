"use client";
import { Navbar } from "@/app/components/Navbar";
import { getAllShiftsByJobId, Shift } from "@/app/util/fetchShifts";
import { getJobsByWorker } from "@/app/util/dataFetch";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Job } from "@/app/util/types";

interface ShiftAddFromFilePageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: ShiftAddFromFilePageProps) {
  const { id } = params;
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<String>("none");
  const [data, setData] = useState<Shift[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [jobId, setJobId] = useState("0");
  const [jobData, setJobData] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMessageJobId, setErrorMessageJobId] = useState<string | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const fetchedData = await getJobsByWorker(id);
        setJobData(fetchedData);
        console.log(data);
      } catch (error: any) {
        console.log("error");
      }
    };

    fetchJobData();
  }, []);

  async function handleFileUpload() {
    setIsSubmitting(true);
    if (!file) {
      setIsSubmitting(false);
      setErrorMessage("Please upload a file.");
      return;
    }

    if (selectedJob === "" || selectedJob == "Select job") {
      setIsSubmitting(false);
      setErrorMessageJobId("Please select a job.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/process-image`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      console.log("File uploaded successfully");

      response.json().then(async (data) => {
        const text = data.candidates[0].content.parts[0].text;

        const jsonData = JSON.parse(text.replace(/^```json\n|\n```$/g, ""));
        const shifts = jsonData.shifts;

        const formattedShifts = shifts
          .map((item: any) => {
            const year = new Date().getFullYear(); // Use current year

            // Ensure month and day values are valid
            const month = new Date().getMonth();
            const day = parseInt(item.date, 10);

            if (
              isNaN(month) ||
              isNaN(day) ||
              day < 1 ||
              day > 31 ||
              month < 0 ||
              month > 11
            ) {
              console.log(month, day);
              console.error(`Invalid date: month=${month}, day=${day}`);
              setIsSubmitting(false);
              return null;
            }

            const formattedDate = new Date(year, month, day);
            if (isNaN(formattedDate.getTime())) {
              console.error(`Invalid Date: ${year}-${month + 1}-${day}`);
              setIsSubmitting(false);
              return null;
            }

            // Format times
            const formattedStartTime = `${item.start_time.slice(
              0,
              2
            )}:${item.start_time.slice(2)}`;
            const formattedEndTime = `${item.end_time.slice(
              0,
              2
            )}:${item.end_time.slice(2)}`;

            return {
              startDate: formattedDate.toISOString().split("T")[0],
              startTime: formattedStartTime,
              endDate: formattedDate.toISOString().split("T")[0],
              endTime: formattedEndTime,
            };
          })
          .filter((shift: any) => shift !== null); // Filter out invalid shifts

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/shift/checkDuplicateShiftsByJob/${selectedJob}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formattedShifts),
              credentials: "include", // Our backend is separate, not same domain so we need this.
            }
          );

          const uniqueShifts: Shift[] = await response.json();
          console.log("UNIQUE: " + JSON.stringify(uniqueShifts));

          if (uniqueShifts.length !== 0) {
            sessionStorage.setItem(
              "importedShifts",
              JSON.stringify(uniqueShifts)
            );

            setIsSubmitting(false);
            router.push("add-from-file/review?job=" + selectedJob);
          } else {
            setErrorMessage(
              "No shifts detected in image. Please upload a valid image."
            );
            setIsSubmitting(false);
          }

          if (!response.ok) {
            throw new Error("Error checking for duplicates!");
          }
        } catch (error) {
          setErrorMessage("Something went wrong. Try again later.");
          return;
        }
      });
    } catch (error) {
      setErrorMessage("Error checking processing image, try again later.");
      setIsSubmitting(false);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFileUpload();
  };

  return (
    <>
      <Navbar currentUserId={id} />
      <Box p={[30, 50]}>
        <Flex
          flexDir="column"
          w="100%"
          h="100%"
          justify="center"
          align="center"
        >
          <Box
            m={[5, 0]}
            p={[5, 10]}
            bgColor="white"
            w={["100%", "70%", "70%", "50%"]}
            borderRadius={10}
            boxShadow="sm"
          >
            <Flex justify="right">
              <Badge color="teal">Beta</Badge>
            </Flex>
            <Heading m={[5, 10]} textAlign="center">
              Import Work Schedule
            </Heading>
            <Text>
              Upload a screenshot of your work schedule, and we will
              automatically extract and import your shifts into the app. ⚡️
            </Text>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormControl isInvalid={!!errorMessageJobId}>
                <FormLabel mt={5}>
                  Select the job to import the work schedule:
                </FormLabel>
                {/* <Select
                placeholder="Select job"
                focusBorderColor="teal.500"
                size="lg"
                {...register("job")}
              >

              </Select> */}
                <Select
                  onChange={(event) => {
                    setSelectedJob(event.target.value);
                    console.log(event.target.value);
                  }}
                  placeholder="Select job"
                >
                  {jobData?.map((job: Job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </Select>
                {errorMessageJobId && (
                  <FormErrorMessage>{errorMessageJobId}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errorMessage}>
                <Input
                  mt={5}
                  type="file"
                  display="none"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);
                    setFileName(selectedFile ? selectedFile.name : "none");
                  }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <Flex mt={5} align="center">
                    <Button
                      mr={5}
                      variant="outline"
                      as="span"
                      colorScheme="teal"
                    >
                      Choose File
                    </Button>
                    <Text color="gray">Selected File: {fileName}</Text>
                  </Flex>
                </label>
                {errorMessage && (
                  <FormErrorMessage>{errorMessage}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <Center>
                  <Button
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    m={5}
                    size="lg"
                    colorScheme="teal"
                    w="50%"
                    type="submit"
                  >
                    Confirm
                  </Button>
                </Center>

                <FormHelperText>
                  By uploading your screenshot, you agree that the file will be
                  sent to Gemini AI for processing.
                </FormHelperText>
              </FormControl>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
