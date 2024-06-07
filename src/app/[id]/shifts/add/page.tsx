"use client";

import {
  Box,
  Heading,
  Center,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { Navbar } from "@/app/components/Navbar";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shiftSchema } from "../../../util/validationSchemas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";

interface ShiftAddPageProps {
  params: {
    id: string;
  };
}

interface Job {
  title: string;
  id: string;
  hourlyRate: number;
}

async function getData(id: string) {
  const response = await fetch(`http://localhost:8080/api/job/byWorker/${id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return data;
}

export default function Page({ params }: ShiftAddPageProps) {
  const { id } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftSchema),
  });

  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(id);
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
  }, []);

  const handleShiftSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/shift/add", {
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
      });

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
    return (
      <>
        <Navbar currentUserId={id} />
        <Center>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            mt={5}
          >
            <IoIosWarning size={100} color="teal" />
            <Heading>{errorMsg}</Heading>
          </Box>
        </Center>
      </>
    );
  }

  return (
    <>
      <Navbar currentUserId={id} />
      <Box p={50}>
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
            w={["100", "70%", "70%", "50%"]}
            borderRadius={10}
            boxShadow="sm"
          >
            <Heading m={[5, 10]} textAlign="center">
              Add shift
            </Heading>
            <form onSubmit={handleSubmit(handleShiftSubmit)}>
              <FormControl isInvalid={!!errors.date}>
                <FormLabel mt={5}>Date</FormLabel>
                <Input
                  focusBorderColor="teal.500"
                  size="lg"
                  placeholder="Date"
                  type="date"
                  {...register("date")}
                />
                <FormErrorMessage>
                  {errors.date && errors.date.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.startTime}>
                <FormLabel mt={5}>Start time</FormLabel>
                <Input
                  focusBorderColor="teal.500"
                  size="lg"
                  placeholder="Start time"
                  type="time"
                  {...register("startTime")}
                />
                <FormErrorMessage>
                  {errors.startTime && errors.startTime.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.endTime}>
                <FormLabel mt={5}>End time</FormLabel>
                <Input
                  focusBorderColor="teal.500"
                  size="lg"
                  placeholder="End time"
                  type="time"
                  {...register("endTime")}
                />
                <FormErrorMessage>
                  {errors.endTime && errors.endTime.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.shiftType}>
                <FormLabel mt={5}>Shift type</FormLabel>
                <Select
                  placeholder="Select shift type"
                  focusBorderColor="teal.500"
                  size="lg"
                  {...register("shiftType")}
                >
                  <option value="Opening">Opening</option>
                  <option value="Mid">Mid</option>
                  <option value="Closing">Closing</option>
                </Select>
                <FormErrorMessage>
                  {errors.shiftType && errors.shiftType.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.job}>
                <FormLabel mt={5}>Job</FormLabel>
                <Select
                  placeholder="Select job"
                  focusBorderColor="teal.500"
                  size="lg"
                  {...register("job")}
                >
                  {data?.map((job: Job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.job && errors.job.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <Center>
                <Button
                  m={5}
                  size="lg"
                  colorScheme="teal"
                  w="50%"
                  type="submit"
                >
                  Add
                </Button>
              </Center>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
