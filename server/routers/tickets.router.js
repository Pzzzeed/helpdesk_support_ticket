import { Router } from "express";
import {
  getTickets,
  createTicket,
  updateTicket,
  getTicketById,
  getTicketsBoard,
} from "../controllers/tickets.controller.js";

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);
ticketsRouter.post("/create", createTicket);
ticketsRouter.put("/update/:id", updateTicket);
ticketsRouter.get("/:id", getTicketById);

export default ticketsRouter;
