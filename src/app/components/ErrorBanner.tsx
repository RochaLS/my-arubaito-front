import { Center, Heading, Box } from "@chakra-ui/react";
import error from "next/error";
import { IoIosWarning } from "react-icons/io";
import { Navbar } from "./Navbar";

interface ErrorBannerProps {
  currentUserId: string;
  message: string;
}

export function ErrorBanner({ currentUserId, message }: ErrorBannerProps) {
  return (
    <>
      <Navbar currentUserId={currentUserId} />
      <Center>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          mt={5}
        >
          <IoIosWarning size={100} color="teal" />
          <Heading>{message}</Heading>
        </Box>
      </Center>
    </>
  );
}
