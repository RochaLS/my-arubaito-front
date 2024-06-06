"use client";

import { Flex, Box } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const router = useRouter();
  const handleSignUpSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/worker/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          location: data.location,
          password: data.password,
        }),
      });

      if (!response.ok) {
        setAuthErrorMsg("Error creating user. Try again later.");
      } else {
        // If everything is okay then login and redirect...
        const authString = btoa(`${data.email}:${data.password}`);
        const loginResponse = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${authString}`,
          },
          credentials: "include",
        });

        if (!loginResponse.ok) {
          setAuthErrorMsg("Something went wrong. Try again later.");
        } else {
          const result = await loginResponse.json();
          setAuthErrorMsg("");
          router.push(`/${result}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
