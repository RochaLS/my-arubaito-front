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
} from "@chakra-ui/react";

interface FieldData {
  hourlyRate: number;
  jobTitle: string;
  jobId: number;
}

interface JobFormProps {
  onSubmit: (e: React.FormEvent) => void;
  data?: FieldData;
}

export function JobForm({ data, onSubmit }: JobFormProps) {
  /*
  !! Quickly converts values to boolean
  Whats happening here is that !!data effectively converts any value to a boolean, with true indicating that data has a value and
  false indicating that data is null or undefined because null or undefined are falsy values.
  */
  let isEditForm = !!data;

  return (
    <>
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
              {isEditForm ? "Edit job" : "Add job"}
            </Heading>
            <FormControl>
              <FormLabel>Hourly Rate</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="Hourly Rate"
                type="number"
                value={isEditForm ? data?.hourlyRate : ""}
              />
              <FormLabel>Job title / Company</FormLabel>
              <Input
                focusBorderColor="teal.500"
                size="lg"
                mb={5}
                placeholder="Job title or company name"
                type="text"
                value={isEditForm ? data?.jobTitle : ""}
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
