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
        <Heading as="h1" size="xl" textAlign="center" my="6">
          Privacy Policy
        </Heading>

        <Heading as="h2" size="md" mt="6">
          1. Introduction
        </Heading>
        <Text mt="2">
          This Privacy Policy explains how My Arubaito (“we”, “our”, or “us”)
          collects, uses, shares, and protects your personal information when
          you use our Service.
        </Text>

        <Heading as="h2" size="md" mt="6">
          2. Information We Collect
        </Heading>
        <Text mt="2">We collect the following information:</Text>
        <UnorderedList mt="2" ml="6">
          <ListItem>
            Personal identification information: Email address, first name,
            password.
          </ListItem>
          <ListItem>
            Work-related information: Shifts, job details, and hourly wage.
          </ListItem>
          <ListItem>
            Cookies: We use cookies to maintain sessions and enhance user
            experience.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="md" mt="6">
          3. How We Use Your Information
        </Heading>
        <Text mt="2">
          We use the information we collect in the following ways:
        </Text>
        <UnorderedList mt="2" ml="6">
          <ListItem>To provide and maintain our Service.</ListItem>
          <ListItem>
            To manage your account, including verifying your identity.
          </ListItem>
          <ListItem>To analyze usage and improve our Service.</ListItem>
          <ListItem>
            To communicate with you, including sending updates and security
            alerts.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="md" mt="6">
          4. Data Sharing and Disclosure
        </Heading>
        <Text mt="2">
          We do not share your personal information with third parties except in
          the following circumstances:
        </Text>
        <UnorderedList mt="2" ml="6">
          <ListItem>With your consent.</ListItem>
          <ListItem>To comply with legal obligations.</ListItem>
          <ListItem>To protect and defend our rights and property.</ListItem>
        </UnorderedList>

        <Heading as="h2" size="md" mt="6">
          5. Data Security
        </Heading>
        <Text mt="2">
          We implement reasonable security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. Sensitive information such as passwords, hourly rates,
          and job titles are encrypted to ensure their protection. While we
          strive to use commercially acceptable means to protect your personal
          information, we cannot guarantee its absolute security. Please note
          that no method of transmission over the internet or method of
          electronic storage is 100% secure or error free.
        </Text>

        <Heading as="h2" size="md" mt="6">
          6. Your Data Protection Rights
        </Heading>
        <Text mt="2">
          Depending on your location, you may have the following rights
          regarding your personal data:
        </Text>
        <UnorderedList mt="2" ml="6">
          <ListItem>The right to access and update your information.</ListItem>
          <ListItem>The right to delete your information.</ListItem>
          <ListItem>
            The right to object to processing or request restrictions.
          </ListItem>
          <ListItem>The right to data portability.</ListItem>
        </UnorderedList>

        <Heading as="h2" size="md" mt="6">
          7. Children's Online Privacy Protection Act (COPPA)
        </Heading>
        <Text mt="2">
          Our Service is not directed to children under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          are a parent or guardian and believe that your child has provided us
          with personal information, please contact us so that we can delete
          such information.
        </Text>

        <Heading as="h2" size="md" mt="6">
          8. Changes to This Privacy Policy
        </Heading>
        <Text mt="2">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </Text>
      </Box>
    </>
  );
}
