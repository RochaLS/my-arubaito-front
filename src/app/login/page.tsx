"use client";

import { Flex, Box } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

import { FieldValues, SubmitHandler } from "react-hook-form";

export default function Page() {
  const handleLoginSubmit: SubmitHandler<FieldValues> = (data) => {
    // Handle form submission here
  };

  return (
    <Box>
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Box>
          <Logo />
        </Box>
        <AuthForm
          title="Welcome back."
          fields={[
            { name: "email", placeholder: "Email", label: "Email" },
            {
              name: "password",
              placeholder: "Password",
              label: "Password",
              type: "password",
            },
          ]}
          onSubmit={handleLoginSubmit}
          formType="login"
        />
      </Flex>
    </Box>
  );
}
