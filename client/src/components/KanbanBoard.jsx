import { useState, useEffect } from "react";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Column from "./Column";
import TicketDetails from "./TicketDetails";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useTickets from "../hooks/useTicket";

const KanbanBoard = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  const [user, setUser] = useState(null);
  const {
    ticketBoard,
    getTicketBoard,
    isError,
    isLoading,
    updateTicketById,
    setTicketBoard,
  } = useTickets();

  useEffect(() => {
    getTicketBoard();
  }, []);

  // get update data when click on sidebar
  if (props.refresh) {
    getTicketBoard();
    props.setRefresh(false);
  }

  // define column type to use with column
  const ColumnType = [
    { title: "pending", status: "pending" },
    { title: "accepted", status: "accepted" },
    { title: "resolved", status: "resolved" },
    { title: "rejected", status: "rejected" },
  ];

  // ฟังก์ชั่นเมื่อกดปุ่มดูรายละเอียด Ticket
  const handleViewDetail = (user) => {
    setUser(user);
    setShowDetail(true);
  };

  // แสดง Component `TicketDetails` หากกดดูรายละเอียด ticket
  if (showDetail) {
    return <TicketDetails setShowDetail={setShowDetail} userId={user} />;
  }

  //function for event handle drag and drop
  const onDragEnd = async ({ source, destination, draggableId }) => {
    if (!destination) {
      return;
    }

    const sourceColumn = ColumnType.find(
      (column) => column.title === source.droppableId
    );
    const destinationColumn = ColumnType.find(
      (column) => column.title === destination.droppableId
    );

    if (
      sourceColumn &&
      destinationColumn &&
      sourceColumn.status !== destinationColumn.status
    ) {
      // Move the ticket to the new column
      const updatedTicket = {
        ...ticketBoard.find((ticket) => ticket._id === draggableId),
        status: destinationColumn.status,
      };

      // Update ticket status in frontend
      const updatedTicketBoard = ticketBoard.map((ticket) =>
        ticket._id === draggableId ? updatedTicket : ticket
      );

      setTicketBoard(updatedTicketBoard);

      try {
        // Update ticket status in backend
        await updateTicketById(updatedTicket._id, updatedTicket);
      } catch (error) {
        // Revert the ticket status in case of an error
        setTicketBoard(ticketBoard);
        console.error("Error updating ticket status:", error);
      }
    }
  };

  return (
    <Box w="83vw" h="100vh">
      <Heading
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #81A08F, #2F3E35)"
        bgClip="text"
        mt={4}
      >
        Ticket Support Kanban Board
      </Heading>
      <Container maxWidth="container.lg" px={4} py={10}>
        <DragDropContext onDragEnd={onDragEnd}>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            {ColumnType.map((column, index) => {
              return (
                <Column
                  column={column.title}
                  handleViewDetail={handleViewDetail}
                  key={column.title}
                  index={index}
                  ticketBoard={ticketBoard}
                />
              );
            })}
          </SimpleGrid>
        </DragDropContext>
      </Container>
    </Box>
  );
};

export default KanbanBoard;
