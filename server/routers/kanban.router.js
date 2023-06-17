import { Router } from "express";
import { getTicketsBoard } from "../controllers/tickets.controller.js";

const kanbanRouter = Router();

kanbanRouter.get("/", getTicketsBoard);

export default kanbanRouter;
