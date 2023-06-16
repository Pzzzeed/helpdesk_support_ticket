import mongoose from "mongoose";
const { Schema } = mongoose;

//Define Schema
const TicketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    deletable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
  { collection: "tickets" }
);

// Define pre-hook for the remove operation
TicketSchema.pre("remove", function (next) {
  if (!this.deletable) {
    const error = new Error("Ticket deletion is not allowed.");
    error.status = 403;
    error.code = "DELETION_NOT_ALLOWED";
    return next(error);
  }
  next();
});

export default mongoose.model("Ticket", TicketSchema);
