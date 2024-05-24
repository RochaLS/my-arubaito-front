import { Heading, Text, Flex, SkeletonText } from "@chakra-ui/react";
import { Shift } from "../util/fetchShifts";

interface ShiftBoxProps {
  nextShift: {
    shift: Shift | null;
    totalHours: number | null;
    moneyValue: string | null;
  };
}

export function ShiftBox({ nextShift }: ShiftBoxProps) {
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
        Next Shift 🕦
      </Heading>
      <SkeletonText skeletonHeight={4} noOfLines={5} isLoaded={true}>
        {nextShift.shift === null ? (
          <Text textAlign="center" color="gray.500">
            No shift scheduled.
          </Text>
        ) : (
          <>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Date: {nextShift.shift.startDate}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Time: {nextShift.shift.startTime} - {nextShift.shift.endTime}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Type: {nextShift.shift.shiftType}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Total hours: {nextShift.totalHours}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Money value:{" "}
              <Text color="teal.500" as="span">
                {nextShift.moneyValue}
              </Text>
            </Text>
          </>
        )}
      </SkeletonText>
    </Flex>
  );
}
