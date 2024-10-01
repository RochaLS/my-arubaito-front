import { Box, Flex, Text, Icon, Skeleton } from "@chakra-ui/react";
import { LuSunrise, LuSun, LuMoonStar } from "react-icons/lu";
import { Shift } from "../util/fetchShifts";
import { convertTime } from "../util/date";

interface ListShiftCardProps {
  shift: Shift;
  isLoaded: boolean;
}

export function ListShiftCard({ shift, isLoaded }: ListShiftCardProps) {
  const dateParts = shift.startDate.split("-");
  //Temporary solution, wanna deal timezones as well in a later point
  const dateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return (
    <Flex m={5} boxShadow="sm" justify="space-between" align="center">
      <Box>
        <Text fontSize="xl">{dateString}</Text>
        <Text color={shift.isHoliday ? "yellow.500" : "teal.500"} fontSize="xl">
          {convertTime(shift.startTime)} - {convertTime(shift.endTime)}
        </Text>
      </Box>
      {shift.shiftType === "Opening" && <LuSunrise size={24} color="teal" />}
      {shift.shiftType === "Mid" && <LuSun size={24} color="teal" />}
      {shift.shiftType === "Closing" && <LuMoonStar size={24} color="teal" />}
    </Flex>
  );
}
