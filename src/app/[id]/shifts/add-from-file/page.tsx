"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<String>("none");

  async function handleFileUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/process-image`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      // Handle successful upload (e.g., show a success message, update state, etc.)
      console.log("File uploaded successfully");
      console.log(response.json());
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFileUpload();
  };
  return (
    <Box p={[30, 50]}>
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Box
          m={[5, 0]}
          p={[5, 10]}
          bgColor="white"
          w={["100%", "70%", "70%", "50%"]}
          borderRadius={10}
          boxShadow="sm"
        >
          <Heading m={[5, 10]} textAlign="center">
            Import Work Schedule
          </Heading>
          <Text>
            Upload a screenshot of your work schedule, and we will automatically
            extract and import your shifts into the app. ⚡️
          </Text>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FormControl>
              <FormLabel mt={5}>
                Select the job to import the work schedule:
              </FormLabel>
              {/* <Select
                placeholder="Select job"
                focusBorderColor="teal.500"
                size="lg"
                {...register("job")}
              >
                {jobs?.map((job: Job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </Select> */}
              <Select>
                <option>Some job</option>
              </Select>
              {/* <FormErrorMessage>
                {errors.job && errors.job.message?.toString()}
              </FormErrorMessage> */}
            </FormControl>
            <FormControl>
              <Input
                mt={5}
                type="file"
                display="none"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  setFileName(selectedFile ? selectedFile.name : "none");
                }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Flex mt={5} align="center">
                  <Button mr={5} variant="outline" as="span" colorScheme="teal">
                    Choose File
                  </Button>
                  <Text color="gray">Selected File: {fileName}</Text>
                </Flex>
              </label>
            </FormControl>
            <FormControl>
              <Center>
                <Button
                  // isDisabled={isSubmitting}
                  // isLoading={isSubmitting}
                  m={5}
                  size="lg"
                  colorScheme="teal"
                  w="50%"
                  type="submit"
                >
                  Confirm
                </Button>
              </Center>
              <FormHelperText>
                By uploading your screenshot, you agree that the file will be
                sent to Gemini AI for processing.
              </FormHelperText>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
