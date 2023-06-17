import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import useTickets from "../hooks/useTicket";
import { Input, Textarea, Box, Select } from "@chakra-ui/react";

const EditTicket = forwardRef((props, ref) => {
  const { updateTicketById } = useTickets();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const formRef = useRef(null);

  // function to use ref that send from parent component to trigger handlesubmit

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(new Event("submit", { cancelable: true }));
    },
  }));

  useEffect(() => {
    if (props.updatedTicket) {
      setTitle(props.updatedTicket.title);
      setDescription(props.updatedTicket.description);
      setContact(props.updatedTicket.contact);
      setStatus(props.updatedTicket.status);
    }
  }, [props.updatedTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTicketById(props.updatedTicket._id, {
      title,
      description,
      contact,
      status,
    });
  };

  return (
    // form for edit ticket component
    <form onSubmit={handleSubmit}>
      <Box>
        <label>
          Title
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
          />
        </label>
      </Box>
      <Box>
        <label>
          Description
          <Textarea
            id="content"
            name="content"
            type="text"
            placeholder="Enter description here"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            rows={4}
            cols={30}
          />
        </label>
      </Box>
      <Box>
        <label>
          Contact Information
          <Input
            id="contact"
            name="contact"
            type="text"
            placeholder="Enter email or phone number here"
            onChange={(event) => {
              setContact(event.target.value);
            }}
            value={contact}
          />
        </label>
      </Box>
      <label>
        Status
        <Select
          placeholder="-- Select a status --"
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
      </label>
    </form>
  );
});

export default EditTicket;
