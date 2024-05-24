"use client";

import { Flex, Box, Heading } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const router = useRouter();

  const handleLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    const authString = btoa(`${data.email}:${data.password}`);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
      });

      if (!response.ok) {
        setAuthErrorMsg("Wrong credentials.");
      } else {
        const result = await response.json();
        setAuthErrorMsg("");

        router.push(`/dashboard/worker?id=${result}`);
      }
    } catch (error) {
      console.log(error);
    }
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
          authErrorMsg={authErrorMsg}
        />
      </Flex>
    </Box>
  );
}
