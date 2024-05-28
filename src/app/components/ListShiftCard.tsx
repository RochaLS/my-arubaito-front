import { Box, Flex, Text, Icon, Skeleton } from "@chakra-ui/react";
import { LuSunrise, LuSun, LuMoonStar } from "react-icons/lu";
import { Shift } from "../util/fetchShifts";

interface ListShiftCardProps {
  shift: Shift;
  isLoaded: boolean;
}

export function ListShiftCard({ shift, isLoaded }: ListShiftCardProps) {
  return (
    <Flex m={5} boxShadow="sm" justify="space-between" align="center">
      <Box>
        <Text fontSize="xl">{shift.startDate}</Text>
        <Text color="teal.500" fontSize="xl">
          {shift.startTime} - {shift.endTime}
        </Text>
      </Box>
      {shift.shiftType === "Opening" && <LuSunrise size={24} color="teal" />}
      {shift.shiftType === "Mid" && <LuSun size={24} color="teal" />}
      {shift.shiftType === "Closing" && <LuMoonStar size={24} color="teal" />}
    </Flex>
  );
}
