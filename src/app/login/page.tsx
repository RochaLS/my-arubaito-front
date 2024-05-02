import { Flex, Box } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { Logo } from "../components/Logo";

export default function Page() {
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle login submission
  };

  return (
    <Box h="100vh">
      <Flex flexDir="column" w="100%" h="100%" justify="center" align="center">
        <Logo />
        <AuthForm
          title="Welcome back."
          fields={[
            { name: "email", placeholder: "Email" },
            { name: "password", placeholder: "Password" },
          ]}
          onSubmit={handleLoginSubmit}
          formType="login"
        />
      </Flex>
    </Box>
  );
}
