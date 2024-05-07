import {
  Center,
  Flex,
  Heading,
  Highlight,
  Avatar,
  Button,
  Icon,
} from "@chakra-ui/react";

import { LuSettings, LuSunMoon, LuSunrise } from "react-icons/lu";

export function Navbar() {
  return (
    <Flex boxShadow="sm" bg="white" p={10} h={50} justify="space-between">
      <Center>
        <Heading lineHeight="tall" size="lg">
          <Highlight
            query="Arubaito."
            styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
          >
            My Arubaito.
          </Highlight>
        </Heading>
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
