import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";

export function ListShiftCard() {
  return (
    <Flex m={5} boxShadow="sm" justify="space-between" align="center">
      <Box>
        <Text fontSize="2xl">11/05/2024</Text>
        <Text color="teal" fontSize="2xl">
          2:00pm - 9:00pm
        </Text>
      </Box>
      <Icon color="teal" boxSize={10} as={LuSunrise} />
    </Flex>
  );
}
