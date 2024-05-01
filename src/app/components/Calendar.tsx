import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

export function Calendar() {
  // Get current date
  const [date, setDate] = useState(new Date());

  // Function to get the days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to generate array of days in a month
  const getDaysArray = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // Get the days array for the current month
  const daysArray = getDaysArray(date.getFullYear(), date.getMonth());

  return (
    <Center>
      <Box maxW="600px" p={4}>
        <Heading textAlign="center" mb={4}>
          {date.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </Heading>
        <SimpleGrid columns={7} spacing={2}>
          {daysArray.map((day) => (
            <Box key={day} textAlign="center" p={2} border="1px solid #ddd">
              {day}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
}
