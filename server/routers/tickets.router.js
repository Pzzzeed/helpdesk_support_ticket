import { Router } from "express";
import {
  getTickets,
  createTicket,
  updateTicket,
  getTicketById,
} from "../controllers/tickets.controller.js";

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);
ticketsRouter.post("/", createTicket);
ticketsRouter.put("/:id", updateTicket);
ticketsRouter.get("/:id", getTicketById);

export default ticketsRouter;
