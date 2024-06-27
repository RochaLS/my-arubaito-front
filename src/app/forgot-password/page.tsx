"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRequestSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8080/password-reset/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data.email,
        }
      );

      if (!response.ok) {
        console.log("Something went wrong!");
      } else {
        console.log("email sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Flex
        flexDir="column"
        w="100%"
        h="100vh" // Adjust height as needed
        justify="center"
        align="center"
      >
        <Box w={["90%", "70%", "70%", "50%"]} borderRadius={10}>
          <Center>
            <Logo />
          </Center>
          <Box
            m={[5, 10]}
            p={[5, 10]}
            bgColor="white"
            borderRadius={10}
            boxShadow="sm"
          >
            <Heading textAlign="center" mb={5}>
              Password Reset
            </Heading>

            <form onSubmit={handleSubmit(handleRequestSubmit)}>
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                {...register("email", { required: true })}
              />

              <Center mt={5}>
                <Button type="submit" size="lg" colorScheme="teal">
                  Send Reset Email
                </Button>
              </Center>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
