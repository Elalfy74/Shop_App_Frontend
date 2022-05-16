import {
  MapOutlined,
  MailOutlined,
  LocalPhoneOutlined,
  WatchLaterOutlined,
} from "@mui/icons-material";
import Container from "../../components/UI/Container/Container";
import LetsTalkBanner from "../../components/LetsTalkBanner/LetsTalkBanner";

import classes from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <div>
      <LetsTalkBanner />
      <Container>
        <div className={classes.location}>
          <div className={classes.info}>
            <span>Get in Touch</span>
            <h2>Visit one of our agency locations or contact us today</h2>
            <p>Head Office</p>
            <ul>
              <li>
                <MapOutlined /> 56 Glassford Street Glasgow GI IUL New York
              </li>
              <li>
                <MailOutlined /> contact@example.com
              </li>
              <li>
                <LocalPhoneOutlined /> contact@example.com
              </li>
              <li>
                <WatchLaterOutlined /> Monday to Satursay: 9:00 AM to 2:00 PM
              </li>
            </ul>
          </div>
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19015.293774881804!2d-2.9730336659563723!3d53.43428666982963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b216efda9671d%3A0x5daa2e216fe4a4b8!2sAnfield%2C%20Liverpool%2C%20UK!5e0!3m2!1sen!2seg!4v1651279885837!5m2!1sen!2seg"
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
        <h2 className={classes.contact_title}>Contact Us</h2>
        <form className={classes.form}>
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Email" />
          <textarea placeholder="Your Message" />
          <input type="submit" value="Send Message" />
        </form>
      </Container>
    </div>
  );
};

export default ContactUs;
