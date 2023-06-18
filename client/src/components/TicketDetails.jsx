import React, { useState, useEffect } from "react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";
import { useTickets } from "../contexts/useTicket";

const TicketDetails = (props) => {
  const { getTicketById, ticket } = useTickets();

  useEffect(() => {
    getTicketById(props.userId);
  }, []);

  //function for change format date

  const dateCreateStr = ticket?.createdAt;
  const dateCreated = new Date(dateCreateStr);
  const formattedCreatedDate = dateCreated.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  //function for change format date
  const dateUpdateStr = ticket?.updatedAt;
  const dateUpdated = new Date(dateUpdateStr);
  const formattedUpdatedDate = dateUpdated.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Flex h="100vh" w="100%" flexDirection="column">
      <Flex w="1200px" h="10%" alignItems="center">
        <CloseIcon
          ml={20}
          onClick={() => props.setShowDetail(false)}
          cursor="pointer"
        />
        <Text ml={5} textStyle="h5">
          Ticket ID
        </Text>
        <Text ml={5} textStyle="b1" fontWeight="400">
          {ticket?._id}
        </Text>
      </Flex>

      <Flex
        bg="bg"
        h="90%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        pb={20}
        overflow="auto"
        overflowX="hidden"
      >
        <Box
          w="1080px"
          bg="white"
          pb={20}
          display="flex"
          flexDirection="column"
          mt={55}
          flex={1}
        >
          <Box w="80%" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Title
            </Text>
            <Text textStyle="b1"> {ticket?.title}</Text>
          </Box>
          <Box w="80%" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Description
            </Text>
            <Text textStyle="b1" color="black">
              {ticket?.description}
            </Text>
          </Box>
          <Box w="80%" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Contact Information
            </Text>
            <Text textStyle="b1" color="black">
              {ticket?.contact}
            </Text>
          </Box>
          <Box w="80%" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Created At
            </Text>
            <Text textStyle="b1" color="black">
              {formattedCreatedDate}
            </Text>
          </Box>
          <Box w="80%" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Updated At
            </Text>
            <Text textStyle="b1" color="black">
              {formattedUpdatedDate}
            </Text>
          </Box>
          <Box w="80%" h="58px" mt={10} ml={20}>
            <Text textStyle="h5" color="gray.600" mb={2}>
              Status
            </Text>
            <Text textStyle="b1" color="black">
              {ticket?.status}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TicketDetails;
