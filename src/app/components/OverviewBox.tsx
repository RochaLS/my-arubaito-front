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

interface OverviewBoxProps {
  data: {
    totalGrossPay: string;
    totalHours: number;
    numOfShifts: number;
  };
}

export function OverviewBox({ data }: OverviewBoxProps) {
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
        <Text fontSize="xl">Total gross pay: {data.totalGrossPay}</Text>
        <Text fontSize="lg">Number of shifts: {data.numOfShifts}</Text>
        <Flex justify="space-between">
          <Text fontSize="lg">Total hours: {data.totalHours}</Text>
          <Button colorScheme="teal">See details</Button>
        </Flex>
      </SkeletonText>
    </Flex>
  );
}
