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

interface FieldData {
  hourlyRate: number;
  jobTitle: string;
  jobId: number;
}

interface JobFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  data?: FieldData;
}

export function JobForm({ data, onSubmit }: JobFormProps) {
  let isEditForm = !!data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  return (
    <Box h="100vh">
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
                value={isEditForm ? data?.hourlyRate : ""}
                {...register("hourlyRate")}
              />
              <FormErrorMessage>
                {errors.hourlyRate && errors.hourlyRate.message?.toString()}
              </FormErrorMessage>
              <FormHelperText>
                This is necessary so we can predict your income.
              </FormHelperText>
            </FormControl>

            <FormControl isInvalid={!!errors.jobTitle}>
              <FormLabel mt={5}>Job title / Company</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                placeholder="Job title or company name"
                type="text"
                value={isEditForm ? data?.jobTitle : ""}
                {...register("jobTitle")}
              />
              <FormErrorMessage>
                {errors.jobTitle && errors.jobTitle.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <Center>
              <Button m={5} size="lg" colorScheme="teal" w="50%" type="submit">
                Add
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
