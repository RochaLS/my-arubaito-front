"use client";

import {
  Input,
  Box,
  Button,
  Center,
  Heading,
  Select,
  FormControl,
  Flex,
  FormLabel,
} from "@chakra-ui/react";

import { provinces } from "../data/provinces";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signUpSchema } from "../util/validationSchemas";

import { SubmitHandler } from "react-hook-form";

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
}

export function AuthForm({ title, fields, onSubmit, formType }: AuthFormProps) {
  const primaryButtonText = formType === "login" ? "Login" : "Sign up";
  const secondaryButtonText = formType === "login" ? "Sign up" : "Login";

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
      w={["100", "70%", "70%", "50%"]}
      borderRadius={10}
      boxShadow="sm"
    >
      <Heading m={[5, 10]} textAlign="center">
        {title}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          {fields.map((field) => (
            <Flex key={field.name} flexDirection="column" mb={5}>
              {errors[field.name] && (
                <p style={{ color: "red" }}>
                  {errors[field.name]?.message?.toString()}
                </p>
              )}
              <FormLabel>{field.label}</FormLabel>
              <Input
                focusBorderColor="teal.500"
                key={field.name}
                size="lg"
                mb={5}
                {...field}
                {...register(field.name)}
              />
            </Flex>
          ))}

          {formType === "signup" && (
            <Flex flexDirection="column" mb={5}>
              {errors.location && (
                <p style={{ color: "red" }}>
                  {errors.location.message?.toString()}
                </p>
              )}
              <FormLabel>Location</FormLabel>
              <Select
                placeholder="Select Province"
                size="lg"
                mb={5}
                {...register("location")}
              >
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </Select>
            </Flex>
          )}
          <Center flexDir="column" m={10}>
            <Button type="submit" m={5} size="lg" colorScheme="teal" w="50%">
              {primaryButtonText}
            </Button>
            <Button size="lg" colorScheme="teal" variant="link">
              {secondaryButtonText}
            </Button>
          </Center>
        </FormControl>
      </form>
    </Box>
  );
}
