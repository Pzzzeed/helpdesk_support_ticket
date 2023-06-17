import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import useTickets from "../hooks/useTicket";
import { Input, Textarea, Box, Select } from "@chakra-ui/react";

const CreateTicketForm = forwardRef((props, ref) => {
  const { createTicket } = useTickets();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    createTicket({
      title,
      description,
      contact,
    });
  };

  // function to use ref that send from parent component to trigger handlesubmit

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(new Event("submit", { cancelable: true }));
    },
  }));

  return (
    // form for create ticket component
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
    </form>
  );
});

export default CreateTicketForm;
