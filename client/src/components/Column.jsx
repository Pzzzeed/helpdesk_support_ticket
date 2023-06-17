import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../utils/StrictModeDroppable";

function Column({ column, handleViewDetail, ticketBoard, index }) {
  const getColumnTasks = (column) => {
    return ticketBoard.filter((task) => task.status === column);
  };

  return (
    <Box overflow="auto" h="100vh">
      {/* heading of column */}
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={1} rounded="lg">
          {column}
        </Badge>
      </Heading>
      {/* column rows */}
      <StrictModeDroppable droppableId={column} key={column}>
        {(provided) => {
          return (
            <Stack
              // ref={dropRef}
              direction={{ base: "row", md: "column" }}
              h={{ base: "80%", md: "80%" }}
              p={4}
              mt={1}
              spacing={3}
              bgColor={useColorModeValue("gray.50", "gray.900")}
              rounded="lg"
              boxShadow="md"
              overflow="auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
              // opacity={isOver ? 0.85 : 1}
            >
              {getColumnTasks(column).map((task) => {
                let textColor;
                let bgColor;
                if (task.status === "accepted") {
                  textColor = "#084BAF";
                  bgColor = "#E4ECFF";
                } else if (task.status === "rejected") {
                  textColor = "#FFE5E5";
                  bgColor = "#A50606";
                } else if (task.status === "pending") {
                  textColor = "#F0F1F8";
                  bgColor = "#6E7288";
                } else if (task.status === "resolved") {
                  textColor = "#E5FFFA";
                  bgColor = "#006753";
                }
                return (
                  // each ticket can draggable
                  <Draggable
                    key={task._id} // Use a unique identifier as the key
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        bg={bgColor}
                        key={task._id}
                        borderRadius={5}
                        w="100%"
                        h="25px"
                        onClick={() => handleViewDetail(task._id)}
                        cursor="pointer"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Text
                          textStyle="b1"
                          color={textColor}
                          textAlign="center"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          w="100%"
                          h="100%"
                        >
                          {task.title}
                        </Text>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Stack>
          );
        }}
      </StrictModeDroppable>
    </Box>
  );
}

export default Column;
