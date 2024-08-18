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
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { JobShift } from "../../page";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { convertTime } from "@/app/util/date";
import { Controller, useForm } from "react-hook-form";
import { Path } from "react-hook-form";

interface ShiftReviewPageProps {
  params: {
    id: string;
  };
}

type FieldPath = Path<{ shifts: JobShift[] }>;
type JobShiftField = keyof JobShift; // Specifying the the type of fields.

export default function Page({ params }: ShiftReviewPageProps) {
  const { id } = params;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [shifts, setShifts] = useState<JobShift[]>([]);
  const [jobId, setJobId] = useState("0");
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedShifts, setPaginatedShifts] = useState<JobShift[]>([]);
  const itemsPerPage = 10;

  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      shifts: paginatedShifts,
    },
  });

  useEffect(() => {
    const importedShifts = JSON.parse(
      sessionStorage.getItem("importedShifts") || "[]"
    );
    console.log(importedShifts);

    setShifts(importedShifts);
    // sessionStorage.removeItem("importedShifts");
  }, []);

  useEffect(() => {
    const start = currentPage * itemsPerPage;
    const end = Math.min((currentPage + 1) * itemsPerPage, shifts.length);
    /* If we don’t update the form data with the sliced shifts,
    the form will retain the previous page’s data, which can lead to inconsistencies, like duplicated shifts.
    */
    setValue("shifts", shifts.slice(start, end)); // Ensuring the form shifts (useForm) sync with paginated shifts
    setPaginatedShifts(shifts.slice(start, end)); // Remember to avoid setPaginatedShifts elsewhere. Always update shifts, and then react will take care of it.
  }, [shifts, currentPage, itemsPerPage, setValue]);

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

  const handleEditClick = (index: number) => {
    setEditRowIndex(index);
  };

  const handleEditShift = (
    index: number,
    field: JobShiftField,
    value: string
  ) => {
    const globalIndex = currentPage * itemsPerPage + index; // Calculate the global index
    const updatedShifts = [...shifts]; // We need to this to update the full shift list, paginated one only shows current page ones
    updatedShifts[globalIndex] = {
      ...updatedShifts[globalIndex],
      [field]: value,
    };

    setShifts(updatedShifts);
  };

  const handleSave = () => {
    console.log(paginatedShifts);
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
          <Box m={5} mt={10} bgColor="gray.100" boxShadow="sm" w="full">
            {paginatedShifts.map((shift: JobShift, index: number) => (
              <Flex
                key={index}
                direction="column"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.200"
                bgColor="white"
                mb={5}
                borderRadius={10}
              >
                <Flex mb={2} justify="center">
                  <Box w="100%">
                    {/* <Text fontSize="lg">{formatDate(shift.startDate)}</Text> */}
                    <FormLabel>Date</FormLabel>
                    <Controller
                      name={`shifts[${index}].startDate` as FieldPath}
                      control={control}
                      defaultValue={shift.startDate}
                      render={({ field }) => (
                        <Input
                          type="date"
                          isReadOnly={index !== editRowIndex}
                          {...field}
                          value={
                            typeof field.value === "string" ? field.value : ""
                          } // Ensure the value is a string
                          onChange={(e) => {
                            field.onChange(e);
                            handleEditShift(index, "startDate", e.target.value);
                          }}
                        />
                      )}
                    />
                    <Text fontSize="lg">
                      {/* {convertTime(shift.startTime)} -{" "} */}
                      <FormLabel>Start Time</FormLabel>
                      <Controller
                        name={`shifts[${index}].startTime` as FieldPath}
                        control={control}
                        defaultValue={shift.startTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={index !== editRowIndex}
                            {...field}
                            value={
                              typeof field.value === "string" ? field.value : ""
                            } // Ensure the value is a string
                            onChange={(e) => {
                              field.onChange(e);
                              handleEditShift(
                                index,
                                "startTime",
                                e.target.value
                              );
                            }}
                          />
                        )}
                      />

                      {/* {convertTime(shift.endTime)} */}
                      <FormLabel>End Time</FormLabel>
                      <Controller
                        name={`shifts[${index}].endTime` as FieldPath}
                        control={control}
                        defaultValue={shift.endTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={index !== editRowIndex}
                            {...field}
                            value={
                              typeof field.value === "string" ? field.value : ""
                            } // Ensure the value is a string
                            onChange={(e) => {
                              field.onChange(e);
                              handleEditShift(index, "endTime", e.target.value);
                            }}
                          />
                        )}
                      />
                    </Text>
                  </Box>

                  {/* <Text>Job ID: {jobId}</Text> */}
                </Flex>
                <Flex mt={2} justify="flex-end">
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
              <Button
                colorScheme="teal"
                onClick={() => {
                  handleSave();
                }}
              >
                Confirm
              </Button>
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
                  <Th>Start Time</Th>
                  <Th>End time</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedShifts.map((shift: JobShift, index: number) => (
                  <Tr key={`${shift.startDate}-${shift.startTime}-${index}`}>
                    <Td>
                      {" "}
                      <Controller
                        name={`shifts[${index}].startDate` as FieldPath}
                        control={control}
                        defaultValue={shift.startDate}
                        render={({ field }) => (
                          <Input
                            type="date"
                            isReadOnly={index !== editRowIndex}
                            {...field}
                            value={
                              typeof field.value === "string" ? field.value : ""
                            } // Ensure the value is a string
                            onChange={(e) => {
                              field.onChange(e);
                              handleEditShift(
                                index,
                                "startDate",
                                e.target.value
                              );
                            }}
                          />
                        )}
                      />
                    </Td>
                    <Td>
                      {" "}
                      <Controller
                        name={`shifts[${index}].startTime` as FieldPath}
                        control={control}
                        defaultValue={shift.startTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={index !== editRowIndex}
                            {...field}
                            value={
                              typeof field.value === "string" ? field.value : ""
                            } // Ensure the value is a string
                            onChange={(e) => {
                              field.onChange(e);
                              handleEditShift(
                                index,
                                "startTime",
                                e.target.value
                              );
                            }}
                          />
                        )}
                      />
                    </Td>
                    <Td>
                      <Controller
                        name={`shifts[${index}].endTime` as FieldPath}
                        control={control}
                        defaultValue={shift.endTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={index !== editRowIndex}
                            {...field}
                            value={
                              typeof field.value === "string" ? field.value : ""
                            } // Ensure the value is a string
                            onChange={(e) => {
                              field.onChange(e);
                              handleEditShift(index, "endTime", e.target.value);
                            }}
                          />
                        )}
                      />
                    </Td>
                    <Td>
                      <Button
                        variant="outline"
                        colorScheme="teal"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </Button>
                      {editRowIndex === index && (
                        <IconButton
                          ml={2}
                          colorScheme="teal"
                          aria-label="Confirm changes"
                          icon={<CheckIcon />}
                          onClick={() => {
                            setEditRowIndex(null);
                          }}
                        />
                      )}
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
                    <Button
                      colorScheme="teal"
                      size="lg"
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      Confirm and Save
                    </Button>
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
