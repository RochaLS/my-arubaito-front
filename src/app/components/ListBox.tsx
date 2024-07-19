import {
  Box,
  Flex,
  Text,
  Icon,
  Heading,
  Skeleton,
  Link,
  Button,
} from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";
import { ListShiftCard } from "./ListShiftCard";
import { Shift } from "../util/fetchShifts";
import NextLink from "next/link";

interface ListBoxProps {
  shifts: Shift[];
  isLoaded: boolean;
  currentUserId: string;
}

export function ListBox({ shifts, isLoaded, currentUserId }: ListBoxProps) {
  const maxShiftsToDisplay = 5;

  const findNextShift = (shifts: Shift[]) => {
    const currentDate = new Date();

    return shifts.filter((shift) => new Date(shift.startDate) > currentDate)[0];
  };

  return (
    <Box
      borderRadius={10}
      boxShadow="sm"
      bg="white"
      w={["90%", "70", "60%", "50%"]}
      minH="30%"
      m={[5, 5, 5, 10]}
      mt={0}
      p={5}
    >
      <Flex mb={5} justify="right">
        <Link as={NextLink} href={`${currentUserId}/shifts/add`}>
          <Button my={[5, 0]} colorScheme="teal">
            Add shift
          </Button>
        </Link>
      </Flex>
      <Heading textAlign="center" size="lg" mb={10}>
        Upcoming shifts 📆
      </Heading>

      {isLoaded ? (
        shifts.length === 0 ? (
          <Text mt={5} textAlign="center" color="gray.500">
            No upcoming shifts, enjoy your break!
          </Text>
        ) : (
          shifts
            .slice(0, maxShiftsToDisplay + 1)
            .map((shift, index) => (
              <ListShiftCard key={index} shift={shift} isLoaded={isLoaded} />
            ))
        )
      ) : (
        Array.from({ length: maxShiftsToDisplay }).map((_, index) => (
          <Skeleton key={index} height="50px" m={5} />
        ))
      )}
    </Box>
  );
}
