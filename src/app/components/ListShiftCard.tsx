import { Box, Flex, Text, Icon, Skeleton } from "@chakra-ui/react";
import { LuSunrise, LuSun, LuMoonStar } from "react-icons/lu";
import { Shift } from "../util/fetchShifts";

interface ListShiftCardProps {
  shift: Shift;
  isLoaded: boolean;
}

export function ListShiftCard({ shift, isLoaded }: ListShiftCardProps) {
  const shiftDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date(shift.startDate))
    .replace(/\//g, "-");
  return (
    <Flex m={5} boxShadow="sm" justify="space-between" align="center">
      <Box>
        <Text fontSize="xl">{shiftDate}</Text>
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
