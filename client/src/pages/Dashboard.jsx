import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Column from "../components/Column";
import { ColumnType } from "../../utils/ColumnType";

const Dashboard = () => {
  return (
    <Box w="83vw" h="100vh">
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        Welcome to DnD Kanban
      </Heading>
      <Container maxWidth="container.lg" px={4} py={10}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
          <Column column={ColumnType.pending} />
          <Column column={ColumnType.accepted} />
          <Column column={ColumnType.resolved} />
          <Column column={ColumnType.rejected} />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Dashboard;
