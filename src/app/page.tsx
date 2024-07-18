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
  Image,
  useBreakpointValue,
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
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Center pt={5}>
        <Logo />
      </Center>
      <Center w="100%">
        <Flex flexDir="column" justify="center" w="100%">
          <Box
            p={[2, 20]}
            // background="url('/images/bg-with-coins.jpg') right center /cover no-repeat"
            bgColor="teal.500"
          >
            <Flex
              justifyContent={"space-between"}
              alignItems="center"
              flexDir={[
                "column-reverse",
                "column-reverse",
                "column-reverse",
                "row",
              ]}
            >
              <Box>
                <Heading
                  my={2}
                  size={["xl", "3xl"]}
                  color="white"
                  textAlign={["center", "left"]}
                >
                  Know What You’ll Earn
                </Heading>
                <Heading
                  textAlign={["center", "left"]}
                  size={["xl", "3xl"]}
                  color="white"
                >
                  Before You Work
                </Heading>
                {isMobile ? (
                  <Heading
                    mt={10}
                    mb={2}
                    color="white"
                    fontWeight="regular"
                    size="lg"
                    textAlign="center"
                  >
                    Empowering hourly workers with a snapshot of their future
                    income in dynamic job settings.
                  </Heading>
                ) : (
                  <>
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
                  </>
                )}
                {/* <Heading
                  mt={10}
                  mb={2}
                  color="white"
                  fontWeight="regular"
                  size="lg"
                  p={5}
                >
                  Empowering hourly workers with a snapshot
                </Heading>
                <Heading p={5} color="white" fontWeight="regular" size="lg">
                  of their future income in dynamic job settings.
                </Heading> */}

                <Flex
                  mt={10}
                  mb={[10, 0]}
                  flexWrap="wrap"
                  justify={["center", "flex-start"]}
                >
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
              <Image src="/images/girl.png" boxSize={[300, 400, 500]} />
            </Flex>
          </Box>
          <Heading mx={2} mt={10} textAlign="center">
            Get to know our features
          </Heading>
          <SimpleGrid
            p={5}
            spacing={10}
            templateColumns={{
              base: "1fr", // 1 column on mobile devices
              sm: "repeat(1, 1fr)", // 1 columns on small devices (sm)
              md: "repeat(3, 1fr)", // 3 columns on rest of devices
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
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
