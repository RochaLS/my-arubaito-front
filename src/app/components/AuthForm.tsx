import { Input, Box, Button, Center, Heading, Select } from "@chakra-ui/react";

import { provinces } from "../data/provinces";

interface Field {
  name: string;
  placeholder: string;
}

interface AuthFormProps {
  title: string;
  fields: Field[];
  onSubmit: (e: React.FormEvent) => void;
  formType: string;
}

export function AuthForm({ title, fields, onSubmit, formType }: AuthFormProps) {
  const primaryButtonText = formType === "login" ? "Login" : "Sign up";
  const secondaryButtonText = formType === "login" ? "Sign up" : "Login";

  return (
    <Box
      m={[5, 0]}
      p={[5, 10]}
      bgColor="white"
      w={["100", "70%", "70%", "50%"]}
      borderRadius={10}
      boxShadow="sm"
    >
      <Heading m={[5, 10]} textAlign="center">
        {title}
      </Heading>
      {fields.map((field) => (
        <Input key={field.name} size="lg" mb={5} {...field} />
      ))}
      {formType === "signup" && (
        <Select placeholder="Select Province" size="lg" mb={5}>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </Select>
      )}
      <Center flexDir="column" m={10}>
        <Button m={5} size="lg" colorScheme="teal" w="50%">
          {primaryButtonText}
        </Button>
        <Button size="lg" colorScheme="teal" variant="link">
          {secondaryButtonText}
        </Button>
      </Center>
    </Box>
  );
}
