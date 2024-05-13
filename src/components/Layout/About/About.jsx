import React from "react";
import "./aboutSection.css";
import { Typography , Button , Avatar } from "@mui/material";
import MetaData from "../MetaData";
import { useSelector } from "react-redux";


const About = () => {

  const {user} = useSelector((state) => state.userAuth)
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/saksham-dhyani-6b19aa196/";
  };
  const visitGitHub = () => {
    window.location = "https://github.com/sakshamdhyani";
  };

  return (
    <div className="aboutSection">
      <MetaData title={"About Us"} />
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={`${user?.avatar?.url ? user?.avatar?.url : ""}`}
              alt="Founder"
            />
            <Typography>Saksham Dhyani</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit LinkedIn
            </Button>
            <Button onClick={visitGitHub} color="primary">
              Visit GitHub
            </Button>
            <span>
            Hello, I am Saksham an Enthusiastic MERN stack developer with a strong foundation in full-stack web development, 
            specializing in frontend technologies. Eager to leverage my proficiency in React and passion for
             crafting intuitive user interfaces to excel in a frontend developer role. Recently graduated 
             with a BCA degree from KIIT Gurugram, I am excited to contribute my skills and creativity to 
             deliver captivating user experiences. 
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;
