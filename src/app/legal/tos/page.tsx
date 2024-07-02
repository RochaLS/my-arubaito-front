import { Logo } from "@/app/components/Logo";
import { Box, Heading, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/">
        <Logo />
      </Link>
      <Box padding="4" maxW="3xl" mx="auto">
        <Heading color="teal" as="h1" size="xl" textAlign="center" my="6">
          Terms of Use
        </Heading>

        <Heading as="h2" size="md" mt="6">
          1. Acceptance of Terms
        </Heading>
        <Text mt="2">
          By accessing and using My Arubaito (the “Service”), you accept and
          agree to be bound by the terms and provision of this agreement. If you
          do not agree to abide by these Terms of Use, you are not authorized to
          use or access the Service.
        </Text>

        <Heading as="h2" size="md" mt="6">
          2. Description of Service
        </Heading>
        <Text mt="2">
          My Arubaito is a web application designed to help part-time workers
          predict their income. The Service provides functionalities such as
          managing work shifts and calculating earnings based on provided job
          data.
        </Text>

        <Heading as="h2" size="md" mt="6">
          3. User Responsibilities
        </Heading>
        <UnorderedList mt="2">
          <ListItem>
            You agree to provide accurate, current, and complete information
            during the registration process and to update such information to
            keep it accurate, current, and complete.
          </ListItem>
          <ListItem>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </ListItem>
          <ListItem>
            You agree not to use the Service for any illegal or unauthorized
            purposes.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="md" mt="6">
          4. Privacy Policy
        </Heading>
        <Text mt="2">
          Your use of the Service is also subject to our Privacy Policy, which
          covers how we collect, use, share, and store your personal
          information. Please review our Privacy Policy for more information.
        </Text>

        <Heading as="h2" size="md" mt="6">
          5. Modifications to Service
        </Heading>
        <Text mt="2">
          We reserve the right to modify or discontinue, temporarily or
          permanently, the Service (or any part thereof) with or without notice
          at any time.
        </Text>

        <Heading as="h2" size="md" mt="6">
          6. Termination
        </Heading>
        <Text mt="2">
          We may terminate or suspend your account and bar access to the Service
          immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever, including but not limited to a
          breach of the Terms.
        </Text>

        <Heading as="h2" size="md" mt="6">
          7. Governing Law
        </Heading>
        <Text mt="2">
          These Terms shall be governed and construed in accordance with the
          laws of Canada, without regard to its conflict of law provisions.
        </Text>

        <Heading as="h2" size="md" mt="6">
          8. Contact Us
        </Heading>
        <Text mt="2">
          If you have any questions about these Terms, please contact us at
          myarubaito@gmail.com.
        </Text>
      </Box>
    </>
  );
}
