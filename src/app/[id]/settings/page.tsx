"use client";

import { Copyright } from "@/app/components/Copyright";
import { Navbar } from "../../components/Navbar";
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
import { useRouter } from "next/navigation";

interface SettingsPageProps {
  params: {
    id: string;
  };
}

export default function page({ params }: SettingsPageProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const { id } = params;

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Logout failed.");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error " + error);
    }
  }

  return (
    <>
      <Navbar currentUserId={id} />
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
                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    onClick={handleLogout}
                  >
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
                      <Button
                        variant="outline"
                        colorScheme="teal"
                        onClick={handleLogout}
                      >
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