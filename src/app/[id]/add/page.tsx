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
import { Navbar } from "../../components/Navbar";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shiftSchema } from "../../util/validationSchemas";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shiftSchema),
  });

  const handleShiftSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle form submission here
  };

  return (
    <>
      <Navbar />
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
                  <option value="opening">Opening</option>
                  <option value="mid">Mid</option>
                  <option value="closing">Closing</option>
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
                  <option value="0">Uniqlo</option>
                  <option value="1">Danbo Ramen</option>
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
