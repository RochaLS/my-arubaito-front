"use client";

import {
  Input,
  Text,
  Box,
  Button,
  Center,
  Heading,
  Select,
  FormControl,
  Flex,
  FormLabel,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";

import { provinces } from "../data/provinces";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signUpSchema } from "../util/validationSchemas";

import { SubmitHandler } from "react-hook-form";
import NextLink from "next/link";

interface Field {
  name: string;
  placeholder: string;
  type?: string;
  label: string;
}

interface AuthFormProps {
  title: string;
  fields: Field[];
  onSubmit: SubmitHandler<FieldValues>;
  formType: string;
  authErrorMsg?: string;
}

export function AuthForm({
  title,
  fields,
  onSubmit,
  formType,
  authErrorMsg,
}: AuthFormProps) {
  const primaryButtonText = formType === "login" ? "Login" : "Sign up";
  const secondaryButtonText = formType === "login" ? "Sign up" : "Login";
  const secondaryButtonHref = formType === "login" ? "/signup" : "/login";

  // Schema comes from util/validationSchemas
  const schema = formType === "login" ? loginSchema : signUpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Using zod to centralize my valitation rules
  });

  return (
    <Box
      m={[5, 0]}
      p={[5, 10]}
      bgColor="white"
      w={["90%", "70%", "70%", "50%"]}
      borderRadius={10}
      boxShadow="sm"
    >
      <Heading m={[5, 10]} textAlign="center">
        {title}
      </Heading>

      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <FormControl key={field.name} isInvalid={!!errors[field.name]}>
            <FormLabel mt={5}>{field.label}</FormLabel>
            <Input
              focusBorderColor="teal.500"
              key={field.name}
              size="lg"
              {...field}
              {...register(field.name)}
            />
            <FormErrorMessage>
              {errors[field.name] && errors[field.name]?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        ))}

        {formType === "login" && (
          <Link href="/forgot-password">
            <Button mt={5} variant="link" colorScheme="teal">
              Forgot your password?
            </Button>
          </Link>
        )}
        {formType === "signup" && (
          <Text fontSize="md" mt={10}>
            By clicking the button below you agree to our{" "}
            <Link
              textDecor="underline"
              color="teal"
              href="/legal/tos"
              target="_blank"
              as={NextLink}
            >
              terms of use
            </Link>{" "}
            and{" "}
            <Link
              textDecor="underline"
              color="teal"
              href="/legal/privacy-policy"
              target="_blank"
              as={NextLink}
            >
              privacy policy
            </Link>
            .
          </Text>
        )}

        {/* {formType === "signup" && (
          <Flex flexDirection="column" mb={5}>
            <FormControl isInvalid={!!errors.location}>
              <FormLabel mt={5}>Location</FormLabel>
              <Select
                placeholder="Select Province"
                size="lg"
                {...register("location")}
              >
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.location && errors.location.message?.toString()}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        )} */}
        {authErrorMsg && (
          <Text color="red" mt={5}>
            {authErrorMsg}
          </Text>
        )}
        <Center flexDir="column" m={10}>
          <Button type="submit" m={5} size="lg" colorScheme="teal" w="50%">
            {primaryButtonText}
          </Button>
          <Link href={secondaryButtonHref}>
            <Button size="lg" colorScheme="teal" variant="link">
              {secondaryButtonText}
            </Button>
          </Link>
        </Center>
      </form>
    </Box>
  );
}
