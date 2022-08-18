import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// css
import "../../Css/Contact.css";

// component
import Navbar from "../Navbar";
import MainFooter from "../Footer/MainFooter";
import TermFooter from "../Footer/TermFooter";

// material icon
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

// api url
import { apiUrl } from "../../Private";

const Contact = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get input value
  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // contact us
  const contactUs = async (e) => {
    e.preventDefault();

    try {
      const contactUrl = `${apiUrl}/extras/contact-form/`;

      const data = new FormData();
      data.append("name", inputValue.name);
      data.append("email", inputValue.email);
      data.append("subject", inputValue.subject);
      data.append("message", inputValue.message);

      const headers = { "Content-Type": "multipart/form-data" };

      await axios.post(contactUrl, data, headers);

      setInputValue({ name: "", email: "", subject: "", message: "" });
      Swal.fire({
        title: "We recieved your message. Thank You",
        confirmButtonColor: "#56b124",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact__section">
        <div className="contact__info">
          <h1>CONTACT US</h1>
          <div className="contact__info__card">
            <LocationOnIcon />
            <div>
              <p>HEAD OFFICE ADDRESS</p>
              <span>16, South Arjun Nagar agra Pincode:- 282001</span>
            </div>
          </div>
          <div className="contact__info__card">
            <EmailIcon />
            <div>
              <p>OFFICIAL EMAIL</p>
              <span>Info@kabaditechno.com</span>
            </div>
          </div>
          <div className="contact__info__card">
            <PhoneIcon />
            <div>
              <p>CONTACT NUMBER</p>
              <span>
                7503386621
                <br />
                9773857717
              </span>
            </div>
          </div>
        </div>

        <div className="contact__form">
          <h1>Send Your Queries</h1>
          <form onSubmit={contactUs}>
            <input
              type="text"
              required
              placeholder="Enter Your Name"
              name="name"
              value={inputValue.name}
              onChange={getInputValue}
            />
            <input
              type="email"
              required
              placeholder="Enter Your Email id"
              name="email"
              value={inputValue.email}
              onChange={getInputValue}
            />
            <input
              type="text"
              required
              placeholder="Subject"
              name="subject"
              value={inputValue.subject}
              onChange={getInputValue}
            />
            <textarea
              rows="5"
              required
              placeholder="Write Your Message..."
              name="message"
              value={inputValue.message}
              onChange={getInputValue}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default Contact;
