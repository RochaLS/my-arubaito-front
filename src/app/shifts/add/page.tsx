import {
  Box,
  Heading,
  Center,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { Navbar } from "@/app/components/Navbar";

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
              Add shift
            </Heading>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="Date"
                type="date"
              />
              <FormLabel>Start time</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="Start time"
                type="time"
              />
              <FormLabel>End time</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="End time"
                type="time"
              />
              <Select
                placeholder="Select shift type"
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
              >
                <option value="opening">Opening</option>
                <option value="mid">Mid</option>
                <option value="closing">Closing</option>
              </Select>
              <Select
                placeholder="Select job"
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
              >
                <option value="0">Uniqlo</option>
                <option value="1">Danbo Ramen</option>
              </Select>
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
