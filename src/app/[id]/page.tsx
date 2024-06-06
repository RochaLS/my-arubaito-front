"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { OverviewBox } from "../components/OverviewBox";
import { Center, Heading, Box, Flex, Button, Link } from "@chakra-ui/react";
import { ShiftBox } from "../components/ShiftBox";
import { ListBox } from "../components/ListBox";
import MyCalendar from "../components/Calendar";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";
import NextLink from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/income/${id}/calculate?date=${new Date()
      .toISOString()
      .slice(0, 10)}`,
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
        }
        setError("Error fetching shifts, try again later.");
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  // if (error) {
  //   return (
  //     <>
  //       <Navbar currentUserId={id} />
  //       <Center>
  //         <Box
  //           display="flex"
  //           alignItems="center"
  //           justifyContent="center"
  //           flexDir="column"
  //           mt={5}
  //         >
  //           <IoIosWarning size={100} color="teal" />
  //           <Heading>{error}</Heading>
  //         </Box>
  //       </Center>
  //     </>
  //   );
  // }

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
          <Flex justify="right" mx={[5, 5, 5, 10]}>
            <Link as={NextLink} href={`${id}/shifts/add`}>
              <Button colorScheme="teal">Add shift</Button>
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
    </>
  );
}
