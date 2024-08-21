"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { OverviewBox } from "../components/OverviewBox";
import {
  Center,
  Heading,
  Box,
  Flex,
  Button,
  Link,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ShiftBox } from "../components/ShiftBox";
import { ListBox } from "../components/ListBox";
import MyCalendar from "../components/Calendar";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ErrorBanner } from "../components/ErrorBanner";
import { Copyright } from "../components/Copyright";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { Shift } from "../util/fetchShifts";
import { ImportButton } from "../components/ImportButton";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface PageProps {
  params: {
    id: string;
  };
}

async function getData(id: string, filter: string, currentDate: Date) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/income/${id}/calculate`;

  if (filter !== "all") {
    const startDate =
      filter === "week" ? startOfWeek(currentDate) : startOfMonth(currentDate);
    const endDate =
      filter === "week" ? endOfWeek(currentDate) : endOfMonth(currentDate);
    url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/income/${id}/calculate-by-range?start-date=${startDate
      .toISOString()
      .slice(0, 10)}&end-date=${endDate.toISOString().slice(0, 10)}`;
  } else {
    url += `?date=${currentDate.toISOString().slice(0, 10)}`;
  }

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not found");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return response.json();
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const [data, setData] = useState<any>(null);
  const [currentWeekData, setCurrentWeekData] = useState<any>(null);
  const [currentMonthData, setCurrentMonthData] = useState<any>(null);
  const [dataToDisplay, setDataToDisplay] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(id, "all", new Date());
        setData(fetchedData);
        setDataToDisplay(fetchedData);
        setIsLoaded(true);
      } catch (error: any) {
        handleFetchError(error);
      }
    };
    fetchData();
  }, [id, router]);

  const handleFilterClick = async (id: string, filter: string) => {
    setIsLoaded(false);

    /*
    How this section works: If it's the first time the user clicks the button, we make a api call
    with the filter options and then fetch the filtered and save on it respective states, currentMonthData,
    currentWeekData. If it's the second time the user is clicking the button we just get the data from state :)
    */

    if (currentMonthData === null || currentWeekData === null) {
      console.log("here");
      try {
        let fetchedData = null;
        fetchedData = await getData(id, filter, new Date());
        if (filter === "all") {
          setData(fetchedData);
          setDataToDisplay(fetchedData);
        } else if (filter === "week") {
          setCurrentWeekData(fetchedData);
          setDataToDisplay(fetchedData);
        } else if (filter === "month") {
          setCurrentMonthData(fetchedData);
          setDataToDisplay(fetchedData);
        }
        setIsLoaded(true);
        setActiveFilter(filter);
      } catch (error: any) {
        handleFetchError(error);
      }
    } else {
      if (filter === "all") {
        setDataToDisplay(data);
      } else if (filter === "week") {
        setDataToDisplay(currentWeekData);
      } else if (filter === "month") {
        setDataToDisplay(currentMonthData);
      }
      setIsLoaded(true);
      setActiveFilter(filter);
    }
  };

  if (error && error !== "404") {
    return <ErrorBanner currentUserId={id} message={error} />;
  }

  let formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  const handleFetchError = (error: any) => {
    if (error.message === "Unauthorized") {
      router.push("/login");
    } else if (error.message === "Not found") {
      setError("404");
    } else {
      setError("Error fetching shifts, try again later.");
    }
    setIsLoaded(true);
  };

  return (
    <>
      <Navbar currentUserId={id} />
      <Center>
        <Box minW="80%">
          <Heading m={[5, 10]} textAlign="center">
            Dashboard
          </Heading>
          <Flex flexDir="row" justify="space-between" mx={[5, 5, 5, 10]}>
            <HStack>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  handleFilterClick(id, "all");
                }}
                isActive={activeFilter === "all"}
                _active={{
                  bg: "teal.500",
                  color: "white",
                }}
              >
                Upcoming
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  handleFilterClick(id, "month");
                }}
                isActive={activeFilter === "month"}
                _active={{
                  bg: "teal.500",
                  color: "white",
                }}
              >
                This month
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  handleFilterClick(id, "week");
                }}
                isActive={activeFilter === "week"}
                _active={{
                  bg: "teal.500",
                  color: "white",
                }}
              >
                This week
              </Button>
            </HStack>

            {/* <Link as={NextLink} href={`${id}/shifts/add`}>
              <Button my={[5, 0]} colorScheme="teal">
                Add shift
              </Button>
            </Link> */}
            {!isMobile && (
              <Link as={NextLink} href={`${id}/shifts/add-from-file`}>
                <Button colorScheme="teal" rightIcon={<FaWandMagicSparkles />}>
                  Import Schedule
                </Button>
              </Link>
            )}
          </Flex>

          <Flex flexDir={["column", "row"]}>
            <Box w={["100%", "90%", "90%", "70%"]} minH={300}>
              <OverviewBox
                data={{
                  totalHours: dataToDisplay?.totalHours || 0,
                  totalGrossPay: formatter.format(
                    dataToDisplay?.totalGrossPay || 0
                  ),
                  numOfShifts: dataToDisplay?.shifts
                    ? dataToDisplay.shifts.length
                    : 0,
                }}
                isLoaded={isLoaded}
              />
              <ShiftBox
                nextShift={{
                  shift: data?.nextShift,
                  totalHours: data?.nextShiftTotalHours || 0,
                  moneyValue: formatter.format(data?.nextShiftGrossPay || 0),
                }}
                isLoaded={isLoaded}
              />
            </Box>
            <ListBox
              currentUserId={id}
              shifts={data?.shifts || []}
              isLoaded={isLoaded}
            />
          </Flex>
          <Box
            boxShadow="md"
            margin={10}
            h={[0, 400, 500, 800]}
            display={["none", "block"]}
          >
            <MyCalendar shifts={dataToDisplay?.shifts || []} />
          </Box>
        </Box>
      </Center>
      <Copyright />
    </>
  );
}
