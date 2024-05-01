import { Box, Flex, Text, Icon, Heading } from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";
import { ListShiftCard } from "./ListShiftCard";

export function ListBox() {
  return (
    <Box boxShadow="md" bg="white" w="50%" m={10} p={5}>
      <Heading textAlign="center">Upcoming shifts 📆</Heading>
      <ListShiftCard />
      <ListShiftCard />
      <ListShiftCard />
      <ListShiftCard />
    </Box>
  );
}
