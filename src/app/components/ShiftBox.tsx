import { Heading, Text, Flex, SkeletonText } from "@chakra-ui/react";
import { Shift } from "../util/fetchShifts";
import { convertTime } from "../util/date";

interface ShiftBoxProps {
  nextShift: {
    shift: Shift | null;
    totalHours: number | null;
    moneyValue: string | null;
  };
  isLoaded: boolean;
}

export function ShiftBox({ nextShift, isLoaded }: ShiftBoxProps) {
  const dateParts = nextShift.shift?.startDate.split("-");
  //Temporary solution, wanna deal timezones as well in a later point

  let dateString = "";
  if (dateParts) {
    dateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

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
      <SkeletonText skeletonHeight={4} noOfLines={5} isLoaded={isLoaded}>
        {nextShift.shift === null || nextShift.shift === undefined ? (
          <Text textAlign="center" color="gray.500">
            No shift scheduled.
          </Text>
        ) : (
          <>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Date: {dateString}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Time: {convertTime(nextShift.shift?.startTime)} -{" "}
              {convertTime(nextShift.shift?.endTime)}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Type: {nextShift.shift?.shiftType}
            </Text>
            <Text boxShadow="sm" fontSize="lg" m={2}>
              Total hours: {nextShift.totalHours?.toFixed(2)}
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
