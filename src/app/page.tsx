// app/page.tsx
"use client";
import { Link } from "@chakra-ui/next-js";
import { Navbar } from "./components/Navbar";
import { OverviewBox } from "./components/OverviewBox";
import { Center, Heading, Box, Flex } from "@chakra-ui/react";
import { ShiftBox } from "./components/ShiftBox";
import { ListBox } from "./components/ListBox";
import { Calendar } from "./components/Calendar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Center>
        <Box minW="80%">
          <Heading m={10} textAlign="center">
            Dashboard
          </Heading>
          <Flex>
            <Box w="70%" minH={300}>
              <OverviewBox />
              <ShiftBox />
            </Box>
            <ListBox />
          </Flex>
          <Calendar />
        </Box>
      </Center>
    </>
  );
}
