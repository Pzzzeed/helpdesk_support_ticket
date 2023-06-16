import Ticket from "../models/ticket.model.js";
import { ObjectId } from "mongodb";
import escapeStringRegexp from "escape-string-regexp";

export const getTickets = async (req, res) => {
  const status = req.query.status;
  const keywords = req.query.keywords;
  const page = req.query.page;
  const sortBy = req.query.sortBy;

  const PAGE_SIZE = 10;
  const skip = PAGE_SIZE * (page - 1);

  const query = {};

  if (status && keywords) {
    query.status = status;
    query.title = new RegExp(escapeStringRegexp(keywords), "i");
  } else if (keywords) {
    query.title = new RegExp(escapeStringRegexp(keywords), "i");
  } else if (status) {
    query.status = status;
  }

  let sortOptions = {};

  if (sortBy === "status") {
    sortOptions = { status: 1 };
  } else if (sortBy === "latest_update") {
    sortOptions = { updatedAt: -1 };
  }

  const tickets = await Ticket.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(10);

  const count = await Ticket.countDocuments(query);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  return res.json({
    data: tickets,
    total_pages: totalPages,
  });
};

export const getTicketById = async (req, res) => {
  const ticketId = new ObjectId(req.params.id);
  const ticket = await Ticket.findById(ticketId);
  return res.json({
    data: ticket,
  });
};

export const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      ...req.body,
    });
    await ticket.save();

    return res.json({
      message: "Ticket has been created.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to get Ticket");
  }
};

export const updateTicket = async (req, res) => {
  const updatedTicket = {
    ...req.body,
  };
  const ticketId = new ObjectId(req.params.id);
  try {
    await Ticket.findByIdAndUpdate(ticketId, updatedTicket);
    return res.json({
      message: `Ticket ${ticketId} has been updated.`,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Updating Ticket ${ticketId} failed`);
  }
};
