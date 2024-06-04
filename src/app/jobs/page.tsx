"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tfoot,
  Tr,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import NextLink from "next/link";

export default function Page() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const jobData = [
    { title: "Uniqlo", rate: 19.5 },
    { title: "Danbo Ramen", rate: 19.5 },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <Heading pt={10} textAlign="center">
        My jobs
      </Heading>
      <Center>
        {isMobile ? (
          <Box
            m={5}
            mt={10}
            bgColor="white"
            boxShadow="sm"
            w="full"
            borderRadius={10}
          >
            {jobData.map((job, index) => (
              <Flex
                key={index}
                direction="column"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Flex justify="space-between" mb={2}>
                  <Box fontWeight="bold">{job.title}</Box>
                  <Box>{job.rate.toFixed(2)}</Box>
                </Flex>
                <Flex justify="flex-end">
                  <Link as={NextLink} href="jobs/edit">
                    <Button
                      mr={2}
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" colorScheme="red" size="sm">
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}
            <Center mt={4}>
              <Link as={NextLink} href="jobs/add">
                <Button mb={5} colorScheme="teal">
                  Add new job
                </Button>
              </Link>
            </Center>
          </Box>
        ) : (
          <TableContainer
            mt={10}
            bgColor="white"
            boxShadow="sm"
            w="80%"
            borderRadius={10}
          >
            <Table size="lg" variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th isNumeric>Hourly Rate</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jobData.map((job, index) => (
                  <Tr key={index}>
                    <Td>{job.title}</Td>
                    <Td isNumeric>{job.rate.toFixed(2)}</Td>
                    <Td>
                      <Link as={NextLink} href="jobs/edit">
                        <Button variant="outline" colorScheme="teal">
                          Edit
                        </Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button variant="outline" colorScheme="red">
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>
                    <Link as={NextLink} href="jobs/add">
                      <Button colorScheme="teal">Add new job</Button>
                    </Link>
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        )}
      </Center>
    </>
  );
}
