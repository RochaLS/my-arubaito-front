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
import { Navbar } from "../../components/Navbar";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Job } from "@/app/util/types";
import { checkResponse } from "@/app/util/checkResponse";
import { IoIosWarning } from "react-icons/io";

interface PageProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const response = await fetch(`http://localhost:8080/api/job/byWorker/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  checkResponse(response); // Checks the response and sets and throws respective error.

  return response.json();
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [data, setData] = useState<Job[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(id);
        setData(fetchedData);
        setIsLoaded(true);
      } catch (error: any) {
        if (error.message === "Not found") {
          setError("404");
        } else {
          setError("Error fetching jobs, try again later.");
        }
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [data]);

  async function handleOnClick(id: number) {
    const response = await fetch(`http://localhost:8080/api/job/delete/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      credentials: "include",
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Deletion failed, try again later.");
    }
  }

  if (error && error !== "404") {
    return (
      <>
        <Navbar currentUserId={id} />
        <Center>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            mt={5}
          >
            <IoIosWarning size={100} color="teal" />
            <Heading>{error}</Heading>
          </Box>
        </Center>
      </>
    );
  }

  return (
    <>
      <Navbar currentUserId={id} />
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
            {data.map((job: Job, index: number) => (
              <Flex
                key={index}
                direction="column"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Flex justify="space-between" mb={2}>
                  <Box fontWeight="bold">{job.title}</Box>
                  <Box>{job.hourlyRate.toFixed(2)}</Box>
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
                  <Button
                    variant="outline"
                    colorScheme="red"
                    size="sm"
                    onSubmit={() => {
                      handleOnClick(job.id);
                    }}
                  >
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
                {data.map((job: Job, index: number) => (
                  <Tr key={index}>
                    <Td>{job.title}</Td>
                    <Td isNumeric>{job.hourlyRate.toFixed(2)}</Td>
                    <Td>
                      <Link as={NextLink} href={`jobs/edit/${job.id}`}>
                        <Button variant="outline" colorScheme="teal">
                          Edit
                        </Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => {
                          console.log("clicked");
                          handleOnClick(job.id);
                        }}
                      >
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
