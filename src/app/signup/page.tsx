"use client";

import { Flex, Box } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

import { FieldValues, SubmitHandler } from "react-hook-form";

export default function Page() {
  const handleSignUpSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle form submission here
  };

  return (
    <Box p={50}>
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Logo />
        <AuthForm
          title="Sign up."
          fields={[
            { name: "email", placeholder: "Email", label: "Email" },
            { name: "name", placeholder: "Name", label: "Name" },
            {
              name: "password",
              placeholder: "Password",
              type: "password",
              label: "Password",
            },
            {
              name: "confirm_password",
              placeholder: "Confirm password",
              type: "password",
              label: "Confirm password",
            },
          ]}
          onSubmit={handleSignUpSubmit}
          formType="signup"
        />
      </Flex>
    </Box>
  );
}
