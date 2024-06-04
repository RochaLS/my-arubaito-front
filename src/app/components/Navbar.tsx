import {
  Center,
  Flex,
  Heading,
  Highlight,
  Button,
  Link,
} from "@chakra-ui/react";

import NextLink from "next/link";

interface NavBarProps {
  currentUserId: string;
}

export function Navbar({ currentUserId }: NavBarProps) {
  const dynamicPath = `/${currentUserId}`;
  return (
    <Flex boxShadow="sm" bg="white" p={10} h={50} justify="space-between">
      <Center>
        <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <Heading lineHeight="tall" size={["md", "lg"]}>
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
        <Link as={NextLink} href={dynamicPath + "/shifts"}>
          <Button mr={[5, 10]} variant="link" colorScheme="teal">
            Shifts
          </Button>
        </Link>
        <Link as={NextLink} href={dynamicPath + "/jobs"}>
          <Button mr={[5, 10]} variant="link" colorScheme="teal">
            Jobs
          </Button>
        </Link>
        <Link as={NextLink} href="/settings">
          <Button variant="link" colorScheme="teal">
            Settings
          </Button>
        </Link>
      </Center>
    </Flex>
  );
}
