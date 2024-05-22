import {
  Center,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  SkeletonText,
  Icon,
} from "@chakra-ui/react";

import { LuInfo } from "react-icons/lu";

export function OverviewBox() {
  return (
    <Flex
      boxShadow="sm"
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
      <SkeletonText skeletonHeight={4} noOfLines={4} isLoaded={true}>
        <Text fontSize="xl">Total gross pay: $750.00</Text>
        <Text fontSize="lg">Number of shifts: 6</Text>
        <Flex justify="space-between">
          <Text fontSize="lg">Total hours: 64</Text>
          <Button colorScheme="teal">See details</Button>
        </Flex>
      </SkeletonText>
    </Flex>
  );
}
