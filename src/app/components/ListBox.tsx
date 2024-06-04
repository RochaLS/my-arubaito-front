import { Box, Flex, Text, Icon, Heading, Skeleton } from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";
import { ListShiftCard } from "./ListShiftCard";
import { Shift } from "../util/fetchShifts";

interface ListBoxProps {
  shifts: Shift[];
  isLoaded: boolean;
}

export function ListBox({ shifts, isLoaded }: ListBoxProps) {
  const maxShiftsToDisplay = 5;

  return (
    <Box
      borderRadius={10}
      boxShadow="sm"
      bg="white"
      w={["90%", "70", "60%", "50%"]}
      m={[5, 5, 5, 10]}
      p={5}
    >
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
