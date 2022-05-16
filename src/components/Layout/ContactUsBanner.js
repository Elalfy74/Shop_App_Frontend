import Banner from "../UI/Banner/Banner";
import bannerImg from "../../assets/banner.png";

import classes from "./ContactUsBanner.module.css";

const ContactUsBanner = () => (
  <Banner
    img={bannerImg}
    className={classes.link}
    title="Contact Us Now !"
    path="/contact"
    value="Contact Us"
  />
);

export default ContactUsBanner;
