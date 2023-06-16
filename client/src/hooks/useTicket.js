import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
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
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const createTicket = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${backend}/tickets`, data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateTicketById = async (postId, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const backend = import.meta.env.VITE_BACKEND_URL;
      await axios.put(`${backend}/tickets/${postId}`, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    tickets,
    totalPages,
    ticket,
    getTickets,
    getTicketById,
    createTicket,
    updateTicketById,
    isError,
    isLoading,
  };
};

export default useTickets;