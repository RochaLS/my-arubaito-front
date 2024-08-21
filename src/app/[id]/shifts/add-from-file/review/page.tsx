"use client";

import { Navbar } from "@/app/components/Navbar";
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
import { Controller, useForm } from "react-hook-form";
import { Path } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface ShiftReviewPageProps {
  params: {
    id: string;
  };
}

// As the backend requires
interface ShiftToSave {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  shiftType: string | null | undefined;
  job_id: string;
  worker_id: string;
}

type FieldPath = Path<{ shifts: JobShift[] }>;
type JobShiftField = keyof JobShift; // Specifying the the type of fields.

export default function Page({ params }: ShiftReviewPageProps) {
  const { id } = params;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [shifts, setShifts] = useState<JobShift[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedShifts, setPaginatedShifts] = useState<JobShift[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const itemsPerPage = isMobile ? shifts.length : 10;

  const [editShiftId, setEditShiftId] = useState<string | null>(null);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      shifts: paginatedShifts,
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  //

  useEffect(() => {
    const importedShifts = JSON.parse(
      sessionStorage.getItem("importedShifts") || "[]"
    );

    importedShifts.forEach((shift: JobShift) => {
      shift.id = uuidv4(); // This is a temporary id.
    });
    console.log(importedShifts);

    setShifts(importedShifts);
  }, []);

  useEffect(() => {
    const start = isMobile ? 0 : currentPage * itemsPerPage;
    const end = isMobile
      ? shifts.length
      : Math.min((currentPage + 1) * itemsPerPage, shifts.length);
    /* If we don’t update the form data with the sliced shifts,
    the form will retain the previous page’s data, which can lead to inconsistencies, like duplicated shifts.
    */
    const paginatedData = shifts.slice(start, end);

    // Ensuring the form shifts (useForm) sync with paginated shifts or shifts for mobile
    setValue("shifts", paginatedData);

    setPaginatedShifts(paginatedData); // Remember to avoid setPaginatedShifts elsewhere. Always update shifts, and then react will take care of it.
    console.log("Shifts updated:", shifts);
  }, [shifts, currentPage, itemsPerPage, setValue, isMobile]);

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

  const handleEditClick = (shiftId: string) => {
    setEditShiftId(shiftId);
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

  const handleSave = async () => {
    setIsSubmitting(true);
    const shiftsToSave: ShiftToSave[] = [];
    const jobId = searchParams.get("job");

    if (jobId) {
      shifts.forEach((shift) => {
        shiftsToSave.push({
          startDate: shift.startDate,
          startTime: shift.startTime,
          endDate: shift.endDate,
          endTime: shift.endTime,
          shiftType: null,
          job_id: jobId,
          worker_id: id,
        });
      });
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shift/add-multiple`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shiftsToSave),
          credentials: "include", // Our backend is separate, not same domain so we need this.
        }
      );

      if (response.ok) {
        setIsSubmitting(false);
        router.push(`/${id}`);
      } else {
        setShowErrorMsg(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      setShowErrorMsg(true);
      console.log(error);
    }
  };

  const handleRemoveClick = (shiftId: string) => {
    const updatedShifts = shifts.filter((shift) => shift.id !== shiftId);
    setShifts(updatedShifts);
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
          <Box m={5} mt={10} bgColor="gray.100" w="full">
            {paginatedShifts.map((shift: JobShift, index: number) => (
              <Flex
                boxShadow="sm"
                key={shift.id}
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
                      name={`shifts[${shift.id}].startDate` as FieldPath}
                      control={control}
                      defaultValue={shift.startDate}
                      render={({ field }) => (
                        <Input
                          type="date"
                          isReadOnly={shift.id !== editShiftId}
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
                        name={`shifts[${shift.id}].startTime` as FieldPath}
                        control={control}
                        defaultValue={shift.startTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={shift.id !== editShiftId}
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
                        name={`shifts[${shift.id}].endTime` as FieldPath}
                        control={control}
                        defaultValue={shift.endTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={shift.id !== editShiftId}
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
                </Flex>
                <Flex mt={2} justify="flex-end">
                  {shift.id === editShiftId && (
                    <IconButton
                      mr={2}
                      size="sm"
                      colorScheme="teal"
                      aria-label="Confirm changes"
                      icon={<CheckIcon />}
                      onClick={() => {
                        setEditShiftId(null);
                      }}
                    />
                  )}
                  <Button
                    mr={2}
                    variant="outline"
                    colorScheme="teal"
                    size="sm"
                    onClick={() => {
                      if (typeof shift.id === "string") {
                        handleEditClick(shift.id);
                      }
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      if (typeof shift.id === "string") {
                        handleRemoveClick(shift.id);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}
            <Flex m={5} justify="center">
              <Button
                colorScheme="teal"
                onClick={() => {
                  handleSave();
                }}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Confirm
              </Button>
            </Flex>
            {showErrorMsg && (
              <Text
                textAlign="center"
                my={2}
                color="red.500"
                textTransform="none"
              >
                Something went wrong when saving the shifts. Try again later.
              </Text>
            )}
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
                  <Tr key={shift.id}>
                    <Td>
                      {" "}
                      <Controller
                        name={`shifts[${shift.id}].startDate` as FieldPath}
                        control={control}
                        defaultValue={shift.startDate}
                        render={({ field }) => (
                          <Input
                            type="date"
                            isReadOnly={shift.id !== editShiftId}
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
                        name={`shifts[${shift.id}].startTime` as FieldPath}
                        control={control}
                        defaultValue={shift.startTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={shift.id !== editShiftId}
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
                        name={`shifts[${shift.id}].endTime` as FieldPath}
                        control={control}
                        defaultValue={shift.endTime}
                        render={({ field }) => (
                          <Input
                            type="time"
                            isReadOnly={shift.id !== editShiftId}
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
                        onClick={() => {
                          if (typeof shift.id === "string") {
                            handleEditClick(shift.id);
                          }
                        }}
                      >
                        Edit
                      </Button>
                      {shift.id === editShiftId && (
                        <IconButton
                          ml={2}
                          colorScheme="teal"
                          aria-label="Confirm changes"
                          icon={<CheckIcon />}
                          onClick={() => {
                            setEditShiftId(null);
                          }}
                        />
                      )}
                    </Td>
                    <Td>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => {
                          if (typeof shift.id === "string") {
                            handleRemoveClick(shift.id);
                          }
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
                    <Button
                      colorScheme="teal"
                      size="lg"
                      onClick={() => {
                        handleSave();
                      }}
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Confirm and Save
                    </Button>
                    {showErrorMsg && (
                      <Text my={2} color="red.500" textTransform="none">
                        Something went wrong when saving the shifts. Try again
                        later.
                      </Text>
                    )}
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
