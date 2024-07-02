import { Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export function Copyright() {
  return (
    <Flex
      mx={5}
      alignItems="center"
      my={2}
      bottom={0}
      justifyContent="space-between"
    >
      <Text fontSize="small" color="gray">
        &copy; {new Date().getFullYear()} My Arubaito. All rights reserved.
      </Text>
      <Flex justifyContent="space-around">
        <Link href="/legal/tos">
          <Text color="gray" fontSize="small">
            Terms of Service
          </Text>
        </Link>
        <Link href="/legal/privacy-policy">
          <Text color="gray" ml={5} fontSize="small">
            Privacy Policy
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
