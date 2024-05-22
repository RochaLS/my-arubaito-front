import {
  Center,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  SkeletonText,
} from "@chakra-ui/react";
import { Shift } from "../util/fetchShifts";

interface ShiftBoxProps {
  nextShift: Shift;
  totalHours: number;
  moneyValue: string;
}

export function ShiftBox({ nextShift, totalHours, moneyValue }: ShiftBoxProps) {
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
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Date: {nextShift.startDate}
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Time: {nextShift.startTime} - {nextShift.endTime}
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Type: {nextShift.shiftType}
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Total hours: {totalHours}
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Money value:{" "}
          <Text color="teal.500" as="span">
            {moneyValue}
          </Text>
        </Text>
      </SkeletonText>
    </Flex>
  );
}
