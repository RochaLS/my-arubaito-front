import { Box, Flex, Text, Icon, Heading } from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";
import { ListShiftCard } from "./ListShiftCard";
import { Shift } from "../util/fetchShifts";

interface ListBoxProps {
  shifts: Shift[];
}

export function ListBox({ shifts }: ListBoxProps) {
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
      <Heading textAlign="center" size="lg">
        Upcoming shifts 📆
      </Heading>

      {shifts.slice(1, maxShiftsToDisplay + 1).map((shift, index) => (
        <ListShiftCard key={index} shift={shift} />
      ))}
    </Box>
  );
}
