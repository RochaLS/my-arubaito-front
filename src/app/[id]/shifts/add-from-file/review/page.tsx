"use client";

import { Navbar } from "@/app/components/Navbar";
import { formatDate } from "@/app/util/dateFormatting";
import { Shift } from "@/app/util/fetchShifts";
import {
  Heading,
  Center,
  Box,
  Flex,
  Button,
  HStack,
  IconButton,
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { JobShift } from "../../page";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { convertTime } from "@/app/util/date";

interface ShiftReviewPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: ShiftReviewPageProps) {
  const { id } = params;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [shifts, setShifts] = useState<JobShift[]>([]);
  const [jobId, setJobId] = useState("0");
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedShifts, setPaginatedShifts] = useState<JobShift[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const importedShifts = JSON.parse(
      sessionStorage.getItem("importedShifts") || "[]"
    );
    console.log(importedShifts);

    setShifts(importedShifts);
    // sessionStorage.removeItem("importedShifts");
  }, []);

  useEffect(() => {
    setPaginatedShifts(
      shifts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );
  }, [shifts, currentPage]);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < shifts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar currentUserId={id} />
      <Heading pt={10} textAlign="center">
        Review Shifts
      </Heading>
      <Text fontSize="xl" mt={10} mx="10%">
        Our AI has processed and extracted your work schedule information.
        Please take a look at the details to confirm everything is correct. Your
        shifts are listed below, showing the start and end times, as well as the
        dates. If you spot any discrepancies or need to make adjustments, you
        can edit or remove shifts as needed.
      </Text>
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
            {paginatedShifts.map((shift: JobShift, index: number) => (
              <Flex
                key={index}
                direction="column"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Flex justify="space-between" mb={2}>
                  <Box>
                    <Text fontSize="lg">{formatDate(shift.startDate)}</Text>
                    <Text fontSize="lg">
                      {convertTime(shift.startTime)} -{" "}
                      {convertTime(shift.endTime)}
                    </Text>
                  </Box>

                  <Text>Job ID: {jobId}</Text>
                </Flex>
                <Flex justify="flex-end">
                  <Button mr={2} variant="outline" colorScheme="teal" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" colorScheme="red" size="sm">
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}
            <Flex m={5} justify="space-between">
              <Button colorScheme="teal">Confirm</Button>
              <Box>
                <HStack spacing={2}>
                  <IconButton
                    colorScheme="teal"
                    variant="outline"
                    aria-label="Previous page"
                    icon={<IoIosArrowBack />}
                    isDisabled={currentPage === 0}
                    onClick={handlePreviousPage}
                  />
                  <IconButton
                    colorScheme="teal"
                    variant="outline"
                    aria-label="Next page"
                    icon={<IoIosArrowForward />}
                    isDisabled={
                      (currentPage + 1) * itemsPerPage >= shifts.length
                    }
                    onClick={handleNextPage}
                  />
                </HStack>

                <Text
                  mt={2}
                  color="gray.500"
                  mb={5}
                  fontSize="xs"
                  textAlign="center"
                >
                  Page {currentPage + 1} of{" "}
                  {Math.ceil(shifts.length / itemsPerPage)}
                </Text>
              </Box>
            </Flex>
          </Box>
        ) : (
          <TableContainer
            mt={10}
            bgColor="white"
            boxShadow="sm"
            w="80%"
            borderRadius={10}
            mb={10}
          >
            <Table size="lg" variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedShifts.map((shift: JobShift, index: number) => (
                  <Tr key={index}>
                    <Td>{formatDate(shift.startDate)}</Td>
                    <Td>
                      {convertTime(shift.startTime)} -{" "}
                      {convertTime(shift.endTime)}
                    </Td>
                    <Td>
                      <Button variant="outline" colorScheme="teal">
                        Edit
                      </Button>
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
                    <Button colorScheme="teal" size="lg">
                      Confirm and Save
                    </Button>
                  </Th>
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
                        onClick={handlePreviousPage}
                      />
                      <IconButton
                        colorScheme="teal"
                        variant="outline"
                        aria-label="Next page"
                        icon={<IoIosArrowForward />}
                        isDisabled={
                          (currentPage + 1) * itemsPerPage >= shifts.length
                        }
                        onClick={handleNextPage}
                      />
                    </HStack>
                    <Text mt={2} fontSize="xs">
                      Page {currentPage + 1} of{" "}
                      {Math.ceil(shifts.length / itemsPerPage)}
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
