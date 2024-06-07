import { Center, Text } from "@chakra-ui/react";

export function Copyright() {
  return (
    <Center>
      <Text fontSize="small" color="gray" my={2}>
        &copy; {new Date().getFullYear()} MyArubaito. All rights reserved.
      </Text>
    </Center>
  );
}
