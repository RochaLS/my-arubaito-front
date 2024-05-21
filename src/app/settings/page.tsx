"use client";

import { Navbar } from "../components/Navbar";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Button,
  Center,
  TableContainer,
  Link,
  Heading,
  useBreakpointValue,
  Flex,
  Text,
} from "@chakra-ui/react";

import NextLink from "next/link";

export default function page() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Navbar />
      <Heading pt={10} textAlign="center">
        Settings
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
            <Flex
              direction="column"
              p={4}
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Flex align="center" justify="space-between" mb={2}>
                <Text>Logout from this device</Text>
                <Link as={NextLink} href="/login">
                  <Button size="sm" colorScheme="teal" variant="outline">
                    Logout
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              p={4}
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Heading mb={4} textAlign="center" size="sm">
                Danger Zone
              </Heading>
              <Flex align="center" justify="space-between" mb={2}>
                <Text>Delete your account permanently</Text>
                <Button size="sm" variant="outline" colorScheme="red">
                  Delete account
                </Button>
              </Flex>
            </Flex>
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
                  <Th>Setting</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Logout from this device</Td>
                  <Td>
                    <Link as={NextLink} href="/login">
                      <Button variant="outline" colorScheme="teal">
                        Logout
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Danger zone</Th>
                </Tr>
                <Tr>
                  <Td>Delete your account permanently</Td>
                  <Td>
                    <Button variant="outline" colorScheme="red">
                      Delete my account
                    </Button>
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        )}
      </Center>
    </>
  );
}
