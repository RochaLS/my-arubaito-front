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
  isLoaded: boolean;
}

export function OverviewBox({ data, isLoaded }: OverviewBoxProps) {
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
        Income Prediction 🤑
      </Heading>
      <SkeletonText skeletonHeight={4} noOfLines={4} isLoaded={isLoaded}>
        {data.numOfShifts === 0 ? (
          <Text color="gray.500" textAlign="center">
            No data to be displayed.
          </Text>
        ) : (
          <>
            <Text fontSize="xl">Total gross pay: {data.totalGrossPay}</Text>
            <Text fontSize="lg">Number of shifts: {data.numOfShifts}</Text>
            <Flex justify="space-between">
              <Text fontSize="lg">
                Total hours: {data.totalHours.toFixed(2)}
              </Text>
              {/* <Button colorScheme="teal">See details</Button> */}
            </Flex>
          </>
        )}
      </SkeletonText>
    </Flex>
  );
}
