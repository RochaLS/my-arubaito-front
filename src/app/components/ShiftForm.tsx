import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import { Job } from "../util/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { shiftSchema } from "../util/validationSchemas";

interface FieldData {
  date?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  shiftType?: string;
  job?: {
    id: string;
    title?: string;
    hourlyRate?: number;
  };
}

interface ShiftFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  shiftData?: FieldData;
  jobs: Job[];
  isSubmitting: boolean;
}

export function ShiftForm({
  shiftData,
  jobs,
  onSubmit,
  isSubmitting,
}: ShiftFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftSchema),
  });

  const isEditForm = !!shiftData;

  useEffect(() => {
    if (isEditForm && shiftData) {
      setValue("shiftType", shiftData.shiftType ?? "");
      setValue("date", shiftData.startDate ?? "");

      // Format startTime and endTime to remove seconds and display in HH:mm format
      if (shiftData.startTime && shiftData.endTime) {
        const formattedStartTime = shiftData.startTime.substring(0, 5); // Assuming format is "HH:mm:ss"
        const formattedEndTime = shiftData?.endTime?.substring(0, 5); // and we need "HH:mm"

        setValue("startTime", formattedStartTime);
        setValue("endTime", formattedEndTime);
      }

      setValue("endDate", shiftData.endDate ?? "");

      setValue("job", shiftData.job?.id.toString() ?? "");
    }
  }, [shiftData, isEditForm, setValue]);

  return (
    <Box p={[30, 50]}>
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Box
          m={[5, 0]}
          p={[5, 10]}
          bgColor="white"
          w={["100%", "70%", "70%", "50%"]}
          borderRadius={10}
          boxShadow="sm"
        >
          <Heading m={[5, 10]} textAlign="center">
            {isEditForm ? "Edit shift" : "Add shift"}
          </Heading>
          <form
            onSubmit={handleSubmit((data) => {
              console.log("Form data: ", data); // Debug log
              onSubmit(data);
            })}
          >
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
                {jobs?.map((job: Job) => (
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
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                m={5}
                size="lg"
                colorScheme="teal"
                w="50%"
                type="submit"
              >
                {isEditForm ? "Confirm" : "Add"}
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
