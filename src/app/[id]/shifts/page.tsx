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
  Skeleton,
  SkeletonText,
  HStack,
  IconButton,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import NextLink from "next/link";
import { Shift, getData, getPaginatedData } from "@/app/util/fetchShifts";
import { useEffect, useState } from "react";
import { formatDate } from "@/app/util/dateFormatting";
import { convertTime } from "@/app/util/date";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ErrorBanner } from "@/app/components/ErrorBanner";
import { Copyright } from "@/app/components/Copyright";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ImportButton } from "@/app/components/ImportButton";

interface PageProps {
  params: {
    id: string;
  };
}

export interface JobShift {
  id: number | string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  shiftType: string;
  job: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [data, setData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingShiftId, setIsSubmittingShiftId] = useState<number | null>(
    null
  );

  // Pagination info:
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getPaginatedData(id, 0, 5);
        setData(fetchedData.shifts);
        setCurrentPage(fetchedData.pageNumber);
        setTotalPages(fetchedData.totalPages);
        console.log("In page:" + data);
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
    console.log(data);
  }, [id]);

  if (error && error !== "404") {
    return <ErrorBanner currentUserId={id} message={error} />;
  }

  async function handleOnClick(id: number) {
    setIsSubmittingShiftId(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift/delete/${id}`,
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
      } else {
        const updatedShifts = data.filter((shift: Shift) => shift.id !== id);
        setData(updatedShifts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmittingShiftId(null);
    }
  }

  async function handleChangePageClick(action: string) {
    let pageToFetch = 0;

    if (action === "forward") {
      pageToFetch = currentPage + 1;
    } else if (action === "back") {
      pageToFetch = currentPage - 1;
    } else {
      return;
    }

    try {
      const fetchedData = await getPaginatedData(id, pageToFetch, 5);
      setData(fetchedData.shifts);
      setCurrentPage(fetchedData.pageNumber);
      setTotalPages(fetchedData.totalPages);
      setIsLoaded(true);
    } catch (error: any) {
      if (error.message === "Not found") {
        setError("404");
      } else {
        setError("Error fetching shifts, try again later.");
      }
      setIsLoaded(true);
    }
  }

  return (
    <>
      <Navbar currentUserId={id} />
      <Heading pt={10} textAlign="center">
        My shifts
      </Heading>
      {!isMobile ? (
        <Flex justify="right" mx="10%">
          <ImportButton />
        </Flex>
      ) : (
        <Flex justify="center" mt={5}>
          <ImportButton />
        </Flex>
      )}

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
            {data?.map((shift: JobShift, index: number) => (
              <Flex
                key={index}
                direction="column"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Flex justify="space-between" mb={2}>
                  <Box>
                    <Skeleton isLoaded={isLoaded}>
                      <Text fontSize="lg">{formatDate(shift.startDate)}</Text>
                      <Text fontSize="lg">
                        {convertTime(shift.startTime)} -{" "}
                        {convertTime(shift.endTime)}
                      </Text>
                    </Skeleton>
                  </Box>
                  <Skeleton isLoaded={isLoaded}>
                    <Text>Job ID: {shift.job.id}</Text>
                  </Skeleton>
                </Flex>
                <Flex justify="flex-end">
                  <Skeleton isLoaded={isLoaded}>
                    <Link as={NextLink} href={`shifts/edit/${shift.id}`}>
                      <Button
                        mr={2}
                        variant="outline"
                        colorScheme="teal"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </Link>
                  </Skeleton>
                  <Skeleton isLoaded={isLoaded}>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      size="sm"
                      onClick={() => {
                        if (typeof shift.id === "number") {
                          handleOnClick(shift.id);
                        }
                      }}
                      isDisabled={isSubmittingShiftId === shift.id}
                      isLoading={isSubmittingShiftId === shift.id}
                    >
                      Remove
                    </Button>
                  </Skeleton>
                </Flex>
              </Flex>
            ))}
            <Flex justifyContent="space-between" m={5}>
              <Link as={NextLink} href="shifts/add">
                <Button colorScheme="teal">Add new shift</Button>
              </Link>
              <HStack spacing={2}>
                <IconButton
                  colorScheme="teal"
                  variant="outline"
                  aria-label="Previous page"
                  icon={<IoIosArrowBack />}
                  isDisabled={currentPage === 0}
                  onClick={() => {
                    handleChangePageClick("back");
                  }}
                />
                <IconButton
                  colorScheme="teal"
                  variant="outline"
                  aria-label="Next page"
                  icon={<IoIosArrowForward />}
                  isDisabled={totalPages - 1 === currentPage}
                  onClick={() => {
                    handleChangePageClick("forward");
                  }}
                />
              </HStack>
            </Flex>
            <Center>
              <Text color="gray.500" mb={5} fontSize="xs">
                Page {currentPage + 1} of {totalPages}
              </Text>
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
                {data?.map((shift: JobShift, index: number) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton isLoaded={isLoaded}>{shift.job.id}</Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={isLoaded}>
                        {formatDate(shift.startDate)}
                      </Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={isLoaded}>
                        {convertTime(shift.startTime)} -{" "}
                        {convertTime(shift.endTime)}
                      </Skeleton>
                    </Td>
                    <Td>
                      <Link as={NextLink} href={`shifts/edit/${shift.id}`}>
                        <Button variant="outline" colorScheme="teal">
                          Edit
                        </Button>
                      </Link>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={isLoaded}>
                        <Button
                          variant="outline"
                          colorScheme="red"
                          onClick={() => {
                            if (typeof shift.id === "number") {
                              handleOnClick(shift.id);
                            }
                          }}
                          isDisabled={isSubmittingShiftId === shift.id}
                          isLoading={isSubmittingShiftId === shift.id}
                        >
                          Remove
                        </Button>
                      </Skeleton>
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
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th>
                    <HStack spacing={2}>
                      <IconButton
                        colorScheme="teal"
                        variant="outline"
                        aria-label="Previous page"
                        icon={<IoIosArrowBack />}
                        isDisabled={currentPage === 0}
                        onClick={() => {
                          handleChangePageClick("back");
                        }}
                      />
                      <IconButton
                        colorScheme="teal"
                        variant="outline"
                        aria-label="Next page"
                        icon={<IoIosArrowForward />}
                        isDisabled={totalPages - 1 === currentPage}
                        onClick={() => {
                          handleChangePageClick("forward");
                        }}
                      />
                    </HStack>
                    <Text mt={2} fontSize="xs">
                      Page {currentPage + 1} of {totalPages}
                    </Text>
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
