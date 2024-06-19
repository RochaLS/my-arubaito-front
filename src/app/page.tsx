"use client";

import {
  Box,
  Heading,
  Center,
  Flex,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Logo } from "./components/Logo";
import { Copyright } from "./components/Copyright";
import { IoMdCalendar } from "react-icons/io";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcPieChart } from "react-icons/fc";

import NextLink from "next/link";

// app/page.tsx
export default function Page() {
  return (
    <>
      <Center pt={5}>
        <Logo />
      </Center>
      <Center w="100%">
        <Flex flexDir="column" justify="center" w="100%">
          <Box
            p={40}
            background="url('/images/bg-with-coins.jpg') center/cover no-repeat"
            bgColor="white"
          >
            <Heading my={2} size="3xl" color="white">
              Know What You’ll Earn
            </Heading>
            <Heading size="3xl" color="white">
              Before You Work
            </Heading>
            <Heading
              mt={10}
              mb={2}
              color="white"
              fontWeight="regular"
              size="lg"
            >
              Empowering hourly workers with a snapshot
            </Heading>
            <Heading color="white" fontWeight="regular" size="lg">
              of their future income in dynamic job settings.
            </Heading>

            <Flex mt={10}>
              <NextLink href="/signup">
                <Button mr={5} size="lg" bgColor="teal.700" color="white">
                  Get Started
                </Button>
              </NextLink>
              <NextLink href="/login">
                <Button
                  size="lg"
                  bgColor="transparent"
                  border="3px solid white"
                  color="white"
                >
                  Login
                </Button>
              </NextLink>
            </Flex>
          </Box>
          <Heading mt={10} textAlign="center">
            Get to know our features
          </Heading>
          <SimpleGrid
            p={5}
            spacing={10}
            templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
            mt={10}
          >
            <Card>
              <CardHeader>
                <HStack>
                  <Icon as={FcMoneyTransfer} boxSize={8} color="teal.500" />
                  <Heading size="md"> Income Predictions</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text>
                  Get accurate projections of your earnings, tailored to your
                  changing work schedule.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <HStack>
                  <Icon as={FcPieChart} boxSize={8} color="teal.500" />
                  <Heading size="md"> Flexible Financial Planning</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text>
                  Plan your finances effectively with insights into your
                  expected income, helping you make informed decisions.
                </Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <HStack>
                  <Icon as={FcCalendar} boxSize={8} />
                  <Heading size="md"> Calendar View</Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text mb={10}>
                  Easily visualize and manage your work schedules in a
                  convenient calendar format. View the monetary value of each
                  shift at a glance.
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Flex>
      </Center>
      <Copyright />
    </>
  );
}
