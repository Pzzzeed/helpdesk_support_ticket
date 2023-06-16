import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

function Column({ column }) {
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={1} rounded="lg">
          {column}
        </Badge>
      </Heading>

      <Stack
        // ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={{ base: "100%", md: "100%" }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        // opacity={isOver ? 0.85 : 1}
      >
        <Box>Test</Box>
        {/* {ColumnTasks} */}
      </Stack>
    </Box>
  );
}

export default Column;
