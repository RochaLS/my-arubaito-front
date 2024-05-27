// app/[id]/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { OverviewBox } from "../components/OverviewBox";
import { Center, Heading, Box, Flex } from "@chakra-ui/react";
import { ShiftBox } from "../components/ShiftBox";
import { ListBox } from "../components/ListBox";
import MyCalendar from "../components/Calendar";
import { IoIosWarning } from "react-icons/io";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/income/${id}/1/calculate?date=2024-02-28`,
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
      console.log(response);
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return response.json();
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData(id);
        setData(fetchedData);
      } catch (error: any) {
        console.log(error.message);
        if (error.message === "Unauthorized") {
          router.push("/login");
        }
        setError("Error fetching shifts, try again later.");
      }
    };
    fetchData();
    // Cleanup function (if needed)
    return () => {};
  }, []); // Empty dependency array to run effect only once when component mounts

  if (error) {
    return (
      <>
        <Navbar />
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

  if (!data) {
    return <div>Loading...</div>;
  }

  let formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <>
      <Navbar />
      <Center>
        <Box minW="80%">
          <Heading m={[5, 10]} textAlign="center">
            Dashboard
          </Heading>

          <Flex flexDir={["column", "row"]}>
            <Box w={["100%", "90%", "90%", "70%"]} minH={300}>
              <OverviewBox
                data={{
                  totalHours: data.totalHours,
                  totalGrossPay: formatter.format(data.totalGrossPay),
                  numOfShifts: data.shifts.length,
                }}
              />
              <ShiftBox
                nextShift={{
                  shift: data.nextShift,
                  totalHours: data.nextShiftTotalHours,
                  moneyValue: formatter.format(data.nextShiftGrossPay),
                }}
              />
            </Box>
            <ListBox shifts={data.shifts} />
          </Flex>
          <Box
            boxShadow="md"
            margin={10}
            h={[0, 400, 500, 800]}
            display={["none", "block"]}
          >
            <MyCalendar shifts={data.shifts} />
          </Box>
        </Box>
      </Center>
    </>
  );
}
