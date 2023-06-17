import Ticket from "../models/ticket.model.js";
import { ObjectId } from "mongodb";

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
    query.$or = [
      { title: { $regex: keywords, $options: "i" } },
      { description: { $regex: keywords, $options: "i" } },
      { contact: { $regex: keywords, $options: "i" } },
    ];
  } else if (keywords) {
    query.$or = [
      { title: { $regex: keywords, $options: "i" } },
      { description: { $regex: keywords, $options: "i" } },
      { contact: { $regex: keywords, $options: "i" } },
    ];
  } else if (status) {
    query.status = status;
  }

  let sortOptions = {};

  if (sortBy === "status") {
    sortOptions = { status: 1 };
  } else if (sortBy === "latest_update") {
    sortOptions = { updatedAt: -1 };
  }

  try {
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
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to created Ticket");
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticketId = new ObjectId(req.params.id);
    const ticket = await Ticket.findById(ticketId);
    return res.json({
      data: ticket,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to get Ticket");
  }
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
    res.status(400).send("Failed to created Ticket");
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

export const getTicketsBoard = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    return res.json({
      data: tickets,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("test");
  }
};
