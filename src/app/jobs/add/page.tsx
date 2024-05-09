import { Navbar } from "@/app/components/Navbar";
import {
  Box,
  Heading,
  Center,
  Input,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Navbar />
      <Box h="100vh">
        <Flex
          flexDir="column"
          w="100%"
          h="100%"
          justify="center"
          align="center"
        >
          <Box
            m={[5, 0]}
            p={[5, 10]}
            bgColor="white"
            w={["100", "70%", "70%", "50%"]}
            borderRadius={10}
            boxShadow="sm"
          >
            <Heading m={[5, 10]} textAlign="center">
              Add job
            </Heading>
            <FormControl>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="Hourly Rate"
              />
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="Job title / Company"
              />
              <Center>
                <Button m={5} size="lg" colorScheme="teal" w="50%">
                  Add
                </Button>
              </Center>
            </FormControl>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
