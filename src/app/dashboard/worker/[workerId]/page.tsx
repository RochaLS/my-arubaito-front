import { Navbar } from "../../../components/Navbar";
import { OverviewBox } from "../../../components/OverviewBox";
import { Center, Heading, Box, Flex } from "@chakra-ui/react";
import { ShiftBox } from "../../../components/ShiftBox";
import { ListBox } from "../../../components/ListBox";
import MyCalendar from "../../../components/Calendar";
import { IoIosWarning } from "react-icons/io";

import { useRouter } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await fetch(
    `http://localhost:8080/api/income/${params.slug}/1/calculate?date=2024-02-28`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  // console.log(data);

  let formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <>
      <Navbar />
      <Center>
        {!response.ok ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            mt={5}
          >
            <IoIosWarning size={100} color="teal" />
            <Heading>Error fetching shifts, try again later.</Heading>
          </Box>
        ) : (
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
        )}
      </Center>
    </>
  );
}