import { Box, Flex, Text, Icon, Heading } from "@chakra-ui/react";
import { LuSunrise } from "react-icons/lu";
import { ListShiftCard } from "./ListShiftCard";

export function ListBox() {
  return (
    <Box
      borderRadius={10}
      boxShadow="md"
      bg="white"
      w={["90%", "70", "60%", "50%"]}
      m={[5, 5, 5, 10]}
      p={5}
    >
      <Heading textAlign="center" size="lg">
        Upcoming shifts 📆
      </Heading>
      <ListShiftCard />
      <ListShiftCard />
      <ListShiftCard />
      <ListShiftCard />
    </Box>
  );
}
