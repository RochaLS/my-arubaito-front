import { Center, Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

export function OverviewBox() {
  return (
    <Flex
      boxShadow="md"
      bg="white"
      direction="column"
      justify="space-around"
      p={5}
      m={10}
      minH={300}
      maxW="50%"
      borderRadius={10}
    >
      <Heading textAlign="center" size="xl">
        Prediction for upcoming weeks 🤑
      </Heading>
      <Text fontSize="3xl">Total gross pay: $750.00</Text>
      <Text fontSize="3xl">Number of shifts: 6</Text>
      <Flex justify="space-between">
        <Text fontSize="3xl">Total hours: 64</Text>
        <Button colorScheme="teal">See details</Button>
      </Flex>
    </Flex>
  );
}
