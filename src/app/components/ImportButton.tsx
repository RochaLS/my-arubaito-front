import { Button, Link } from "@chakra-ui/react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import NextLink from "next/link";

export function ImportButton() {
  return (
    <Link as={NextLink} href={`shifts/add-from-file`}>
      <Button colorScheme="teal" rightIcon={<FaWandMagicSparkles />}>
        Import Schedule with AI
      </Button>
    </Link>
  );
}
