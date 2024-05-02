// app/page.tsx
"use client";
import { Link } from "@chakra-ui/next-js";
import { Navbar } from "./components/Navbar";
import { OverviewBox } from "./components/OverviewBox";
import { Center, Heading, Box, Flex } from "@chakra-ui/react";
import { ShiftBox } from "./components/ShiftBox";
import { ListBox } from "./components/ListBox";
import MyCalendar from "./components/Calendar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Center>
        <Box minW="80%">
          <Heading m={[5, 10]} textAlign="center">
            Dashboard
          </Heading>
          <Flex flexDir={["column", "row"]}>
            <Box w={["100%", "90%", "90%", "70%"]} minH={300}>
              <OverviewBox />
              <ShiftBox />
            </Box>
            <ListBox />
          </Flex>
          <Box
            boxShadow="md"
            margin={10}
            h={[0, 400, 500, 800]}
            display={["none", "block"]}
          >
            <MyCalendar />
          </Box>
        </Box>
      </Center>
    </>
  );
}
