import {
  Center,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";

export function OverviewBox() {
  return (
    <Flex
      boxShadow="md"
      bg="white"
      direction="column"
      justify="space-around"
      p={5}
      m={[5, 5, 5, 10]}
      borderRadius={10}
    >
      <Heading mb={5} textAlign="center" size="lg">
        Prediction for upcoming weeks 🤑
      </Heading>
      <Text fontSize="3xl">Total gross pay: $750.00</Text>
      <Text fontSize="2xl">Number of shifts: 6</Text>
      <Flex justify="space-between">
        <Text fontSize="2xl">Total hours: 64</Text>
        <Button colorScheme="teal" display={["none", "block"]}>
          See details
        </Button>
        <Icon
          color="teal"
          boxSize={10}
          as={LuInfo}
          display={["block", "none"]}
        />
      </Flex>
    </Flex>
  );
}
