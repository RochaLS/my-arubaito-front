import { Box, Flex, Text, Icon, Skeleton } from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";

export function ListShiftCard() {
  return (
    <Skeleton isLoaded={true}>
      <Flex m={5} boxShadow="sm" justify="space-between" align="center">
        <Box>
          <Text fontSize="xl">11/05/2024</Text>
          <Text color="teal.500" fontSize="xl">
            2:00pm - 9:00pm
          </Text>
        </Box>
        <LuSunrise size={24} color="teal" />
      </Flex>
    </Skeleton>
  );
}
