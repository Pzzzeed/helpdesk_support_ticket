import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketsContext = React.createContext();

// custom context and react hook
const TicketsProvider = (props) => {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [ticketBoard, setTicketBoard] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const getTickets = async (input) => {
    const { status, keywords, page, sortBy } = input;
    try {
      const params = new URLSearchParams();
      params.append("status", status);
      params.append("keywords", keywords);
      params.append("page", page);
      params.append("sortBy", sortBy);
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      const results = await axios.get(
        `${backend}/tickets?${params.toString()}`
      );
      setTickets(results.data.data);
      setTotalPages(results.data.total_pages);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getTicketById = async (ticketId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      const result = await axios.get(`${backend}/tickets/${ticketId}`);
      setTicket(result.data.data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const createTicket = async (data) => {
    // setIsUpdated(false);
    try {
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${backend}/tickets/create`, data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsUpdated(!isUpdated);
      setIsLoading(false);
    }
  };

  const updateTicketById = async (postId, data) => {
    // setIsUpdated(false);
    try {
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      await axios.put(`${backend}/tickets/update/${postId}`, data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsUpdated(!isUpdated);
      setIsLoading(false);
    }
  };

  const getTicketBoard = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      const result = await axios.get(`${backend}/kanban`);
      setTicketBoard(result.data.data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        totalPages,
        ticket,
        getTickets,
        getTicketById,
        createTicket,
        updateTicketById,
        isError,
        isLoading,
        setIsLoading,
        getTicketBoard,
        ticketBoard,
        setTicketBoard,
        isUpdated,
      }}
    >
      {props.children}
    </TicketsContext.Provider>
  );
};

const useTickets = () => React.useContext(TicketsContext);

export { TicketsProvider, useTickets };
