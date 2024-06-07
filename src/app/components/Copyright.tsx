import { Center, Text } from "@chakra-ui/react";

export function Copyright() {
  return (
    <Center>
      <Text fontSize="small" color="gray" my={2} bottom={0}>
        &copy; {new Date().getFullYear()} My Arubaito. All rights reserved.
      </Text>
    </Center>
  );
}
