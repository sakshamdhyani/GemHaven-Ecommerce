import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <div className="contactContainer">
    <MetaData title={"Contact Us - GemHaven"} />
      <a className="mailBtn" href="mailto:dhyanisaksham12@gmail.com">
        <Button>Contact: dhyanisaksham12@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
