import { Box, Heading, Text, Link, VStack, Container } from "@chakra-ui/react";

export default function SupportPage() {
  return (
    <Container maxW="lg" py={10}>
      <VStack spacing={6} align="start">
        <Heading size="lg">Support</Heading>

        <Text>
          Welcome to Baito Support! If you’re experiencing issues or have questions, we’re here to help.
        </Text>

        <Box>
          <Text fontWeight="semibold">📱 Mobile App Users:</Text>
          <Text>
            The iOS app is the best way to use Baito. It includes full shift tracking, income prediction, and AI Quick Import features.
          </Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">💻 About the Web Version:</Text>
          <Text>
            The web app is currently under development. While it’s functional, it’s still quite barebones and not synced with your iOS app data.
          </Text>
        </Box>

        <Box bg="yellow.50" p={4} rounded="md" border="1px solid" borderColor="yellow.200">
          <Text fontWeight="medium">⚠️ Just to clarify:</Text>
          <Text fontSize="sm">
            You’re currently on Baito’s support page. If you explore the web app from here, keep in mind that it’s an early version — limited in features and not connected to your iOS app data.  
            For the full experience, we recommend continuing to use the iOS app.
          </Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">📧 Contact Us:</Text>
          <Link href="mailto:support@myarubaito.com" color="blue.500">
            support@myarubaito.com
          </Link>
        </Box>

        <Box>
          <Text fontWeight="semibold">📄 Legal:</Text>
          <VStack align="start" spacing={1}>
            <Link href="/legal/mobile/privacy-policy" color="blue.500">
              Privacy Policy
            </Link>
            <Link href="/legal/mobile/tos" color="blue.500">
              Terms of Use
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}