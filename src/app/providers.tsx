"use client";

import { ChakraProvider, Box } from "@chakra-ui/react";
import Head from "next/head";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <Box bg="gray.100" minH="100vh">
        {children}
      </Box>
    </ChakraProvider>
  );
}
