import {
    Box,
    Heading,
    ListItem,
    UnorderedList,
    Text,
  } from "@chakra-ui/react";
  
  export default function Page() {
    const lastUpdated = "July 10, 2025";
    return (
      <Box padding="4" maxW="3xl" mx="auto">
        <Heading as="h1" size="xl" textAlign="center" my="6">
          Privacy Policy
        </Heading>
  
        <Text fontSize="sm" textAlign="center" color="gray.500" mb="6">
          Last Updated: {lastUpdated}
        </Text>
  
        <Heading as="h2" size="md" mt="6">
          1. Introduction
        </Heading>
        <Text mt="2">
          This Privacy Policy explains how Baito (&apos;we&apos;, &apos;our&apos;, or
          &apos;us&apos;) collects, uses, shares, and protects your personal
          information when you use our Service.
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
            JWT: We use JSON Web Tokens (JWTs) stored securely in the
            user&apos;s keychain to maintain sessions and enhance the user
            experience. The JWT contains the user&apos;s email and a unique
            identifier.
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
          <ListItem>
            To manage in-app purchases and subscriptions through third-party
            services such as RevenueCat.
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
          7. AI Schedule Import Functionality
        </Heading>
        <Text mt="2">
          By using the AI import schedule functionality, you acknowledge and
          consent that any uploaded files, including images and text, are sent
          to Google for processing through Google&apos;s Gemini API.
        </Text>
        <Text mt="2">
          Uploaded files are used solely for extracting schedule information and
          are not retained by us after processing. However, Google may retain
          such data in accordance with their own privacy practices.
        </Text>
        <Text mt="2">
          You may opt out of using the AI functionality and instead input your
          schedule manually. Please review AI-generated results carefully as we
          are not responsible for any errors or omissions.
        </Text>
        <Text mt="2">
          For more information, please refer to{" "}
          <a
            style={{ color: "teal", textDecoration: "underline" }}
            href="https://support.google.com/gemini/answer/13594961?hl=en#your_data"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Gemini&apos;s Privacy Policy
          </a>
          .
        </Text>
  
        <Heading as="h2" size="md" mt="6">
          8. Third-Party Services
        </Heading>
        <Text mt="2">
          We use trusted third-party services to deliver and support our app’s
          functionality:
        </Text>
        <UnorderedList mt="2" ml="6">
          <ListItem>
            <strong>RevenueCat:</strong> Used for subscription management and
            in-app purchase processing. RevenueCat may collect anonymous user
            identifiers, purchase history, and subscription status. More info:{" "}
            <a
              href="https://www.revenuecat.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "teal", textDecoration: "underline" }}
            >
              RevenueCat Privacy Policy
            </a>
          </ListItem>
          <ListItem>
            <strong>Google Gemini:</strong> See Section 7 for details on how
            Gemini is used for AI image processing.
          </ListItem>
        </UnorderedList>
  
        <Heading as="h2" size="md" mt="6">
          9. Children&apos;s Online Privacy Protection Act (COPPA)
        </Heading>
        <Text mt="2">
          Our Service is not directed to children under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          are a parent or guardian and believe that your child has provided us
          with personal information, please contact us so that we can delete
          such information.
        </Text>
  
        <Heading as="h2" size="md" mt="6">
          10. Changes to This Privacy Policy
        </Heading>
        <Text mt="2">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the updated version on this page. If changes
          are significant, we will notify you within the app or via email.
        </Text>
      </Box>
    );
  }