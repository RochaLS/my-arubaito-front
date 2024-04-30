// app/page.tsx
"use client";
import { Link } from "@chakra-ui/next-js";
import { Navbar } from "./components/Navbar";
import { OverviewBox } from "./components/OverviewBox";
import { Heading } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Navbar />
      <Heading m={10} textAlign="center">
        Dashboard
      </Heading>
      <OverviewBox />
    </>
  );
}
