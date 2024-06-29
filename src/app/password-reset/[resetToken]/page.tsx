"use client";

import { Logo } from "@/app/components/Logo";
import { resetPasswordSchema } from "@/app/util/validationSchemas";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handlePasswordChangeSubmit: SubmitHandler<FieldValues> = async (
    data
  ) => {
    console.log(data);
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
            <Heading size="lg" textAlign="center" mb={5}>
              Create new password
            </Heading>

            <form onSubmit={handleSubmit(handlePasswordChangeSubmit)}>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  focusBorderColor="teal.500"
                  size="lg"
                  type="password"
                  {...register("password", { required: true })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirm_password}>
                <FormLabel mt={5}>Confirm Password</FormLabel>
                <Input
                  focusBorderColor="teal.500"
                  size="lg"
                  type="password"
                  {...register("confirm_password", { required: true })}
                />
                <FormErrorMessage>
                  {errors.confirm_password &&
                    errors.confirm_password.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <Center mt={5}>
                <Button type="submit" size="lg" colorScheme="teal">
                  Change password
                </Button>
              </Center>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
