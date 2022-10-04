import React from "react"
import { Button, Typography, Avatar } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube"
import InstagramIcon from "@material-ui/icons/Instagram"
import FacebookIcon from '@material-ui/icons/Facebook'
import "./aboutSection.css"
const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/deepak-karnadhar-477405213/"
  }
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dxkue8uia/image/upload/v1663871791/avatars/yp3xuru77430axgf4oqk.jpg"
              alt="Founder"
            />
            <Typography>Deepak Karnadhar</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit LinkedIn
            </Button>
            <span>
              This is a sample wesbite made by @DeepakKarnadhar to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My other social handles</Typography>
            <a href="https://www.instagram.com/deeeeeeeeepaaaaaak/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.youtube.com/channel/UCcpMjfqV6j6mVW38UyCj7oQ" target="blank" >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100080660473569" target="blank" >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About
