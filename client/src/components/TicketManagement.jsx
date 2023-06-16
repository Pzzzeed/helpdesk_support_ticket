import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Textarea,
} from "@chakra-ui/react";
import TicketDetails from "./TicketDetails";
import axios from "axios";
import {
  Search2Icon,
  AddIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import useTickets from "../hooks/useTicket";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import CreateTicketForm from "./CreateTicketForm";
import EditTicket from "./EditTicket";

const TicketManagement = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { tickets, totalPages, getTickets, isError, isLoading } = useTickets();
  const [user, setUser] = useState(null);

  //state for create modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef(null);

  //state for update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getTickets({ status, keywords, page, sortBy });
  }, [status, keywords, page, sortBy, isOpen, showUpdateModal]);

  // ฟังก์ชั่นเมื่อกดปุ่มดูรายละเอียดบนแต่ละการจอง
  const handleViewDetail = (user) => {
    setUser(user);
    setShowDetail(true);
  };

  // ส่ง trigger create event ไปที่ component create form

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.submit();
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleUpdateClick = () => {
    if (formRef.current) {
      formRef.current.submit();
      setTimeout(() => {
        setShowUpdateModal(false);
      }, 1500);
    }
  };

  // แสดง Component `CustomerBookingDetail` หากกดดูรายละเอียดการจอง
  if (showDetail) {
    return <TicketDetails setShowDetail={setShowDetail} userId={user} />;
  }

  // update click handle
  const handleOpenModal = (ticket) => {
    setUpdatedTicket(ticket);
    setShowUpdateModal(true);
  };

  return (
    <Flex w="83vw" h="100vh" flexDirection="column">
      <Flex w="100%" h="10%" alignItems="center" justifyContent="space-between">
        <Text ml={20} textStyle="h5" color="black">
          Ticket Management
        </Text>
        <Box
          display="flex"
          w="320px"
          h="48px"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={5}
          alignItems="center"
        >
          <Search2Icon boxSize={5} ml={3} color="#646D89" />
          <Input
            mr={20}
            w="320px"
            placeholder="Search..."
            border="none"
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          ></Input>
        </Box>
      </Flex>

      <Flex
        w="100%"
        h="10%"
        alignItems="center"
        justifyContent="end"
        gap="10px"
      >
        {sortBy ? <label htmlFor="sortby">Sort by</label> : null}
        <Box
          display="flex"
          w="180px"
          h="48px"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={5}
          alignItems="center"
        >
          {/* <Search2Icon boxSize={5} ml={3} color="#646D89" /> */}
          <Select
            placeholder="Sort by"
            id="sortby"
            name="sortby"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="status">Status</option>
            <option value="latest_update">Lastest update</option>
          </Select>
        </Box>
        {status ? <label htmlFor="status">View by status</label> : null}
        <Box
          display="flex"
          w="180px"
          h="48px"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={5}
          alignItems="center"
        >
          {/* <Search2Icon boxSize={5} ml={3} color="#646D89" /> */}
          <Select
            placeholder="View by status"
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </Select>
        </Box>
      </Flex>

      <Flex
        bg="bg"
        h="90%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        pb={20}
        overflow="auto"
      >
        {/* create ticket modal */}
        <>
          <Button variant="primary" onClick={onOpen}>
            <AddIcon boxSize={5} mr={3} color="white" />
            Create Ticket
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Support Ticket</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CreateTicketForm ref={formRef} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="secondary" onClick={handleCreateClick}>
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        <Box w="100%" display="flex" flexDirection="column" mt={55}>
          <TableContainer>
            <Table
              variant="striped"
              colorScheme="black"
              style={{ tableLayout: "fixed", height: "100%" }}
            >
              <Thead>
                <Tr>
                  <Th>
                    <Text textStyle="b2" textAlign="center">
                      Title
                    </Text>
                  </Th>
                  <Th>
                    <Text textAlign="center">Description</Text>
                  </Th>
                  <Th>
                    <Text textAlign="center">Contact Information</Text>
                  </Th>
                  <Th w="12%">
                    <Text textAlign="center">Created At</Text>
                  </Th>
                  <Th w="12%">
                    <Text textAlign="center">Updated At</Text>
                  </Th>
                  <Th w="12%">
                    <Text textAlign="center">Status</Text>
                  </Th>
                  <Th w="10%">
                    <Text textAlign="center">Update/</Text>
                    <Text textAlign="center">Details</Text>
                  </Th>
                </Tr>
              </Thead>
              {tickets.map((ticket, index) => {
                let rowBG;
                if (ticket.status === "test") {
                  rowBG = "white";
                } else {
                  rowBG = "white";
                }
                let textColor;
                let bgColor;
                if (ticket.status === "accepted") {
                  textColor = "#084BAF";
                  bgColor = "#E4ECFF";
                } else if (ticket.status === "rejected") {
                  textColor = "#FFE5E5";
                  bgColor = "#A50606";
                } else if (ticket.status === "pending") {
                  textColor = "#F0F1F8";
                  bgColor = "#6E7288";
                } else if (ticket.status === "resolved") {
                  textColor = "#E5FFFA";
                  bgColor = "#006753";
                }

                const dateCreateStr = ticket.createdAt;
                const dateCreated = new Date(dateCreateStr);
                const formattedCreatedDate = dateCreated.toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                const dateUpdateStr = ticket.updatedAt;
                const dateUpdated = new Date(dateUpdateStr);
                const formattedUpdatedDate = dateUpdated.toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <Tbody key={index}>
                    <Tr>
                      <Td>
                        <Box>
                          <Text textStyle="b1" color="black" textAlign="center">
                            {ticket.title}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text
                            textStyle="b1"
                            color="black"
                            textAlign="center"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {ticket.description}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text
                            textStyle="b1"
                            color="black"
                            textAlign="center"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {ticket.contact}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text textStyle="b1" color="black" textAlign="center">
                            <span>{formattedCreatedDate.split(",")[0]}</span>
                            <br />
                            <span>{formattedCreatedDate.split(",")[1]}</span>
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text textStyle="b1" color="black" textAlign="center">
                            <span>{formattedUpdatedDate.split(",")[0]}</span>
                            <br />
                            <span>{formattedUpdatedDate.split(",")[1]}</span>
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box bg={bgColor} p="10px 10px" borderRadius={5}>
                          <Text
                            textStyle="b1"
                            color={textColor}
                            textAlign="center"
                          >
                            {ticket.status}
                          </Text>
                        </Box>
                      </Td>
                      <Box
                        textAlign="center"
                        display="flex"
                        flexDirection="column"
                      >
                        <Button
                          onClick={() => handleOpenModal(ticket)}
                          colorScheme="gray"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => handleViewDetail(ticket._id)}
                          colorScheme="gray"
                        >
                          <ViewIcon />
                        </Button>
                      </Box>
                    </Tr>
                  </Tbody>
                );
              })}
            </Table>
          </TableContainer>

          {!tickets.length && (
            <Box w="100%">
              <Text textStyle="b1" textAlign="center">
                No Tickets
              </Text>
            </Box>
          )}

          {/* update modal */}
          <Modal
            isOpen={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Support Ticket</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditTicket updatedTicket={updatedTicket} ref={formRef} />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="secondary" onClick={handleUpdateClick}>
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      {/* pagination */}
      <Flex w="100%" h="10%" alignItems="center" justifyContent="end">
        <Box>
          {page > 1 && tickets.length ? (
            <Button variant="secondary" onClick={() => setPage(page - 1)}>
              <ArrowBackIcon />
            </Button>
          ) : (
            <Button disabled={page > 1 && tickets.length}>
              <ArrowBackIcon />
            </Button>
          )}

          {page !== totalPages && tickets.length ? (
            <Button variant="secondary" onClick={() => setPage(page + 1)}>
              <ArrowForwardIcon />
            </Button>
          ) : (
            <Button disabled={page !== totalPages && tickets.length}>
              <ArrowForwardIcon />
            </Button>
          )}

          {!tickets.length ? null : (
            <Box textAlign="center">
              {page} / {totalPages}
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TicketManagement;
