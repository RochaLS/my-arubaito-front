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
  Text,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import NextLink from "next/link";
import { Shift, getData } from "@/app/util/fetchShifts";
import { useEffect, useState } from "react";
import { formatDate } from "@/app/util/dateFormatting";
import { IoIosWarning } from "react-icons/io";
import { ErrorBanner } from "@/app/components/ErrorBanner";
import { Copyright } from "@/app/components/Copyright";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [data, setData] = useState<any>(null);
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
          setError("Error fetching shifts, try again later.");
        }
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [data]);

  if (error && error !== "404") {
    return <ErrorBanner currentUserId={id} message={error} />;
  }

  async function handleOnClick(id: number) {
    const response = await fetch(
      `http://localhost:8080/api/shift/delete/${id}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Deletion failed, try again later.");
    }
  }

  return (
    <>
      <Navbar currentUserId={id} />
      <Heading pt={10} textAlign="center">
        My shifts
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
            {data?.shifts.map((shift: Shift, index: number) => (
              <Flex
                key={index}
                direction="column"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Flex justify="space-between" mb={2}>
                  <Box>
                    <SkeletonText isLoaded={isLoaded}>
                      <Text fontSize="lg">{formatDate(shift.startDate)}</Text>
                      <Text fontSize="lg">
                        {shift.startTime} - {shift.endTime}
                      </Text>
                    </SkeletonText>
                  </Box>
                  <Skeleton isLoaded={isLoaded}>
                    <Text>Job ID: {shift.job_id}</Text>
                  </Skeleton>
                </Flex>
                <Flex justify="flex-end">
                  <Skeleton isLoaded={isLoaded}>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        handleOnClick(shift.id);
                      }}
                    >
                      Remove
                    </Button>
                  </Skeleton>
                </Flex>
              </Flex>
            ))}
            <Center mt={4}>
              <Link as={NextLink} href="shifts/add">
                <Button mb={5} colorScheme="teal">
                  Add new shift
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
                  <Th>Job ID</Th>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.shifts.map((shift: Shift, index: number) => (
                  <Tr key={index}>
                    <Td>
                      {" "}
                      <SkeletonText isLoaded={isLoaded}>
                        {shift.job_id}
                      </SkeletonText>
                    </Td>

                    <Td>
                      {" "}
                      <SkeletonText isLoaded={isLoaded}>
                        {formatDate(shift.startDate)}{" "}
                      </SkeletonText>
                    </Td>

                    <Td>
                      <SkeletonText isLoaded={isLoaded}>
                        {shift.startTime} - {shift?.endTime}
                      </SkeletonText>
                    </Td>

                    <Td>
                      <Link as={NextLink} href={`shifts/edit/${shift.id}`}>
                        <Button variant="outline" colorScheme="teal">
                          Edit
                        </Button>
                      </Link>
                    </Td>

                    <Td>
                      <SkeletonText isLoaded={isLoaded}>
                        <Button
                          variant="outline"
                          colorScheme="red"
                          onClick={() => {
                            handleOnClick(shift.id);
                          }}
                        >
                          Remove
                        </Button>
                      </SkeletonText>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>
                    <Link as={NextLink} href="shifts/add">
                      <Button colorScheme="teal">Add new shift</Button>
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
