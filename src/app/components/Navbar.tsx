import {
  Center,
  Flex,
  Heading,
  Highlight,
  Avatar,
  Button,
  Icon,
  Link,
} from "@chakra-ui/react";

import NextLink from "next/link";

export function Navbar() {
  return (
    <Flex boxShadow="sm" bg="white" p={10} h={50} justify="space-between">
      <Center>
        <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <Heading lineHeight="tall" size="lg">
            <Highlight
              query="Arubaito."
              styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
            >
              My Arubaito.
            </Highlight>
          </Heading>
        </Link>
      </Center>
      <Center>
        <Button mr={10} variant="link" colorScheme="teal">
          Jobs
        </Button>
        <Button variant="link" colorScheme="teal">
          Settings
        </Button>
      </Center>
    </Flex>
  );
}
