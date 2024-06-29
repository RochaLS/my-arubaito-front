"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordRequestEmailSchema } from "../util/validationSchemas";

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sendPasswordRequestEmailSchema),
  });

  const [message, setMessage] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

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
        setMessage("Something went wrong. Try again later.");
      } else {
        setMessage(
          "We just sent you an email with instructions so you can reset your password."
        );
        reset();
        setAlreadySubmitted(true);
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
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  focusBorderColor="teal.500"
                  size="lg"
                  {...register("email", { required: true })}
                />

                <FormErrorMessage>
                  {errors.email && errors.email.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <Center mt={5}>
                <Button
                  isDisabled={alreadySubmitted}
                  type="submit"
                  size="lg"
                  colorScheme="teal"
                >
                  Send Reset Email
                </Button>
              </Center>
              <Text textAlign="center" color="teal" mt={5}>
                {message}
              </Text>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
