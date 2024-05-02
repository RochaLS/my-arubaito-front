import { Flex, Box } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

export default function Page() {
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle sign up submission
  };

  return (
    <Box h="100vh">
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Logo />
        <AuthForm
          title="Sign up."
          fields={[
            { name: "email", placeholder: "Email" },
            { name: "location", placeholder: "Location" },
            { name: "password", placeholder: "Password" },
            { name: "comfirm-password", placeholder: "Confirm password" },
          ]}
          onSubmit={handleSignUpSubmit}
          formType="signup"
        />
      </Flex>
    </Box>
  );
}
