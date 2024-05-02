import { Center, Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

export function ShiftBox() {
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
        Next Shift 🕦
      </Heading>
      <Text boxShadow="sm" fontSize="2xl">
        Date: 10/05/2024
      </Text>
      <Text boxShadow="sm" fontSize="2xl">
        Time: 9:00am - 5:00pm
      </Text>
      <Text boxShadow="sm" fontSize="2xl">
        Type: Opening
      </Text>
      <Text boxShadow="sm" fontSize="2xl">
        Total hours: 64
      </Text>
      <Text boxShadow="sm" fontSize="2xl">
        Money value:{" "}
        <Text color="teal" as="span">
          $98.00
        </Text>
      </Text>
    </Flex>
  );
}
