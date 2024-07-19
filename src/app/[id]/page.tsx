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
} from "@chakra-ui/react";
import { ShiftBox } from "../components/ShiftBox";
import { ListBox } from "../components/ListBox";
import MyCalendar from "../components/Calendar";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ErrorBanner } from "../components/ErrorBanner";
import { Copyright } from "../components/Copyright";
import {
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

interface PageProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/income/${id}/calculate?date=${new Date().toISOString().slice(0, 10)}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

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

async function getDataWithFilter(
  id: string,
  currentDate: Date,
  filter: string
) {
  let startDate = new Date();
  let endDate = new Date();

  if (filter === "week") {
    startDate = startOfWeek(currentDate);
    endDate = endOfWeek(currentDate);

    console.log("Start date: " + startDate);
    console.log("End date: " + endDate);
  } else if (filter === "month") {
    startDate = startOfMonth(currentDate);
    endDate = endOfMonth(currentDate);
  } else {
    return;
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/income/${id}/calculate-by-range?start-date=${startDate
      .toISOString()
      .slice(0, 10)}&end-date=${endDate.toISOString().slice(0, 10)}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [weekBtnIsActive, setWeekBtnIsActive] = useState(false);
  const [monthBtnIsActive, setMonthBtnIsActive] = useState(false);
  const [allBtnIsActive, setAllBtnIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(id);
        setData(fetchedData);
        setIsLoaded(true);
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          router.push("/login");
        } else if (error.message === "Not found") {
          setError("404");
        } else {
          setError("Error fetching shifts, try again later.");
        }

        setIsLoaded(true);
      }
    };
    fetchData();
  }, [id, router]);

  const handleFilterClick = async (id: string, filter: string) => {
    setIsLoaded(false);
    try {
      let fetchedData = null;
      if (filter === "all") {
        fetchedData = await getData(id);
      } else {
        fetchedData = await getDataWithFilter(id, new Date(), filter);
      }

      setIsLoaded(true);
      setData(fetchedData);
      setActiveFilter(filter);
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.push("/login");
      } else if (error.message === "Not found") {
        setError("404");
      } else {
        setError("Error fetching shifts, try again later.");
      }

      setIsLoaded(true);
    }
  };

  if (error && error !== "404") {
    return <ErrorBanner currentUserId={id} message={error} />;
  }

  let formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <>
      <Navbar currentUserId={id} />
      <Center>
        <Box minW="80%">
          <Heading m={[5, 10]} textAlign="center">
            Dashboard
          </Heading>
          <Flex
            flexDir={["column", "row"]}
            justify="space-between"
            mx={[5, 5, 5, 10]}
          >
            {/* <HStack>
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
                All
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
            </HStack> */}

            <Link as={NextLink} href={`${id}/shifts/add`}>
              <Button my={[5, 0]} colorScheme="teal">
                Add shift
              </Button>
            </Link>
          </Flex>

          <Flex flexDir={["column", "row"]}>
            <Box w={["100%", "90%", "90%", "70%"]} minH={300}>
              <OverviewBox
                data={{
                  totalHours: data?.totalHours || 0,
                  totalGrossPay: formatter.format(data?.totalGrossPay || 0),
                  numOfShifts: data?.shifts ? data.shifts.length : 0,
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
            <ListBox shifts={data?.shifts || []} isLoaded={isLoaded} />
          </Flex>
          <Box
            boxShadow="md"
            margin={10}
            h={[0, 400, 500, 800]}
            display={["none", "block"]}
          >
            <MyCalendar shifts={data?.shifts || []} />
          </Box>
        </Box>
      </Center>
      <Copyright />
    </>
  );
}
