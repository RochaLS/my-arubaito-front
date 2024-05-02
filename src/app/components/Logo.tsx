import { Heading, Highlight } from "@chakra-ui/react";

export function Logo() {
  return (
    <Heading m={5} lineHeight="tall" size="xl">
      <Highlight
        query="Arubaito."
        styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
      >
        My Arubaito.
      </Highlight>
    </Heading>
  );
}
