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
} from "@chakra-ui/react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../util/validationSchemas";
import { useEffect } from "react";

interface FieldData {
  hourlyRate?: number;
  jobTitle?: string;
  jobId?: number;
}

interface JobFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  data?: FieldData;
}

export function JobForm({ data, onSubmit }: JobFormProps) {
  const isEditForm = !!data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      hourlyRate: data?.hourlyRate !== undefined ? data.hourlyRate : "",
      jobTitle: data?.jobTitle !== undefined ? data.jobTitle : "",
    },
  });

  /*
  This sets the value when the component mounts, it's necessary for the edit to work correctly.
  There were cases where if the user doesn't update a a field validation wouldn't pass,
  even if the previous data is correct.
  That's why in the resolver we need to set the default values right away and we need to values in the
  useEffect as well.
  */

  useEffect(() => {
    if (isEditForm && data) {
      setValue(
        "hourlyRate",
        data.hourlyRate !== undefined ? data.hourlyRate : ""
      );
      setValue("jobTitle", data.jobTitle !== undefined ? data.jobTitle : "");
    }
  }, [data, isEditForm, setValue]);

  return (
    <Box mt={50}>
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Box
          m={[5, 0]}
          p={[5, 10]}
          bgColor="white"
          w={["100", "70%", "70%", "50%"]}
          borderRadius={10}
          boxShadow="sm"
        >
          <Heading m={[5, 10]} textAlign="center">
            {isEditForm ? "Edit job" : "Add job"}
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.hourlyRate}>
              <FormLabel mt={5}>Hourly Rate</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                placeholder="Hourly Rate"
                type="number"
                step="0.01"
                {...register("hourlyRate", { valueAsNumber: true })}
              />
              <FormErrorMessage>
                {errors.hourlyRate && errors.hourlyRate.message?.toString()}
              </FormErrorMessage>
              <FormHelperText>
                This is necessary so we can predict your income.
              </FormHelperText>
            </FormControl>

            <FormControl isInvalid={!!errors.jobTitle}>
              <FormLabel mt={5}>Job Title</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                placeholder="Job Title"
                type="text"
                {...register("jobTitle")}
              />
              <FormErrorMessage>
                {errors.jobTitle && errors.jobTitle.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <Center>
              <Button m={10} size="lg" colorScheme="teal" w="50%" type="submit">
                {isEditForm ? "Confirm" : "Add"}
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
