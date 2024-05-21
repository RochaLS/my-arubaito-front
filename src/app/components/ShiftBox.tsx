import {
  Center,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  SkeletonText,
} from "@chakra-ui/react";

export function ShiftBox() {
  return (
    <Flex
      boxShadow="sm"
      bg="white"
      direction="column"
      justify="space-around"
      p={5}
      m={[5, 5, 5, 10]}
      borderRadius={10}
    >
      <Heading mb={5} textAlign="center" size="lg">
        Next Shift 🕦
      </Heading>
      <SkeletonText skeletonHeight={4} noOfLines={5} isLoaded={true}>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Date: 10/05/2024
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Time: 9:00am - 5:00pm
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Type: Opening
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Total hours: 64
        </Text>
        <Text boxShadow="sm" fontSize="lg" m={2}>
          Money value:{" "}
          <Text color="teal.500" as="span">
            $98.00
          </Text>
        </Text>
      </SkeletonText>
    </Flex>
  );
}
