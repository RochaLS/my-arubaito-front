"use client";

import { Flex, Box, Link } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import NextLink from "next/link";

export default function Page() {
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    const authString = btoa(`${data.email}:${data.password}`);

    console.log(`${process.env.NEXT_PUBLIC_API_URL}/login`);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        credentials: "include", // Our backend is separate, not same domain so we need this.
      });

      if (!response.ok) {
        setAuthErrorMsg("Wrong credentials.");
      } else {
        const result = await response.json();
        console.log(result);
        setAuthErrorMsg("");
        router.push(`/${result}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Box>
          <Link href="/" as={NextLink} style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
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
          isSubmitting={isSubmitting}
        />
      </Flex>
    </Box>
  );
}
