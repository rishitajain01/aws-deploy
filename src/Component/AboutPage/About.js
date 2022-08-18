import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

// css
import "../../Css/About.css";
import "../../App.css";

// component
import Navbar from "../Navbar";
import AboutWorkCard from "./AboutWorkCard";
import MainFooter from "../Footer/MainFooter";
import TermFooter from "../Footer/TermFooter";

// about work details
import { AboutWorkDetails } from "./AboutWorkDetails";

// image
import startup__certificate from "../../Image/startup__certificate.svg";

// api url
import { apiUrl } from "../../Private";

const About = () => {
  const [aboutWorkDetails] = useState(AboutWorkDetails);
  const [teamMember, setTeamMember] = useState([]);

  const [numVotes, setnumVotes] = useState(0);
  const [numYes, setnumYes] = useState(0);
  const [numNo, setnumNo] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // get team member data
  useEffect(() => {
    axios
      .get(`${apiUrl}/extras/team-members/`)
      .then((response) => {
        setTeamMember(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // vote
  useEffect(() => {
    getVote();
  }, []);

  async function getVote() {
    try {
      const response = await axios.get(`${apiUrl}/extras/get-votes/`);
      const data = response.data;
      setnumVotes(Number(data["yes"] + Number(data["no"])));
      setnumNo(Number(data["no"]));
      setnumYes(Number(data["yes"]));
    } catch (error) {
      console.error(error);
    }
  }

  async function postVote(email, vote) {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const { data } = await axios.post(
        `${apiUrl}/extras/post-vote/`,
        {
          email: email,
          status: vote,
        },
        headers
      );

      if (data.detail !== "Already Voted") {
        setIsOpen(!isOpen);
      }
      if (data["yes"] && data["no"]) {
        setnumVotes(Number(data["yes"] + Number(data["no"])));
        setnumNo(Number(data["no"]));
        setnumYes(Number(data["yes"]));
      } else {
        Swal.fire({
          title: data.detail,
          confirmButtonColor: "#56b124",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const responseGoogle = (response, result) => {
    if (response && !response.error) {
      const email = response.profileObj.email;
      postVote(email, result);
    }
  };

  // get input value
  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // vote suggestion
  const voteSuggestion = async () => {
    if (
      inputValue.name !== "" &&
      inputValue.email !== "" &&
      inputValue.phone !== "" &&
      inputValue.message !== ""
    ) {
      try {
        const suggestionUrl = `${apiUrl}/extras/suggestion-form/`;

        const data = new FormData();
        data.append("name", inputValue.name);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("message", inputValue.message);

        const headers = {
          "Content-Type": "multipart/form-data",
        };

        await axios.post(suggestionUrl, data, headers);

        setInputValue({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsOpen(!isOpen);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="main__section">
        <div className="about__top__banner">
          <h1>ABOUT US</h1>
          <p>
            We are a hyperlocal platform to connect the waste producers to the
            waste collectors. Individuals, households, organisations, and
            dealers like Kabadiwalas, collectors, and recyclers all come
            together on a unified online platform. Here, a customer can easily
            find their nearest Kabadiwala and place an order for doorstep waste
            pickup.
          </p>
          <p>
            By leveraging AI, IoT, and IT in the waste management sector, We aim
            to help small local Kabadiwalas grow their businesses with the help
            of technology. By offering a modern solution to treat & manage
            waste, we enable our partners to collect waste efficiently with
            fewer resources.
          </p>
        </div>

        <div className="goal__section">
          <div className="goal" id="ourvision">
            <h1>Our Vision</h1>
            <p>
              Our vision is a world of sustainable consumption and a circular
              economy. We envision becoming a global one-stop shop for the
              recycling and upcycling industry.
            </p>
          </div>
          <div className="goal" id="ourmission">
            <p>
              Our mission is to establish a sustainable recyclable waste
              management system and a clean and pollution-free country by
              creating a hyperlocal platform connecting waste producers and
              waste collectors.
            </p>
            <h1>Our Mission </h1>
          </div>
        </div>

        <div className="certificate__section">
          <h1>Startup India Certificate</h1>
          <img className="certificate" src={startup__certificate} alt="" />
        </div>

        <div className="work__section" id="whatwedo">
          <h1>What We Do?</h1>
          <div className="work">
            {aboutWorkDetails.map((eachDetail, eachDetailIndex) => {
              return (
                <AboutWorkCard
                  key={eachDetailIndex}
                  title={eachDetail.title}
                  description={eachDetail.description}
                />
              );
            })}
          </div>
        </div>

        {/* <div className="voting__section">
          <h1>Your Vote is Valuable</h1>
          <div className="voting">
            <h1>
              We’d love to hear your valuable suggestions! If you feel our
              service adds value to your life, please click on “Yes, I need this
              service”. If you feel you don’t require our services, please click
              on “No, I don’t need this service”. Your response will help us
              understand your requirements better. Please note that we don’t
              collect email addresses by default. Please leave your contact
              details or your suggestions after voting if you’re interested!
            </h1>
            <div className="vote__section">
              <div className="vote">
                <GoogleLogin
                  clientId="839555905156-qpenbug205f1mu5sftdu8skmhmh5pgn9.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={() => {
                        renderProps.onClick();
                      }}
                      disabled={renderProps.disabled}
                    >
                      Yes, I need this
                      <br />
                      service
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={(response) => responseGoogle(response, "yes")}
                  onFailure={(response) => responseGoogle(response, "yes")}
                  cookiePolicy={"single_host_origin"}
                />
                <p>{numYes}</p>
              </div>
              <h1>
                Total Vote
                <br />
                <span>{numVotes}</span>
              </h1>
              <div className="vote">
                <GoogleLogin
                  clientId="610021953843-k273bfs6gnb8g04afjsm2uqaav912ngi.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={() => {
                        renderProps.onClick();
                      }}
                      disabled={renderProps.disabled}
                    >
                      No, I don't need
                      <br />
                      this service
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={(response) => responseGoogle(response, "no")}
                  onFailure={(response) => responseGoogle(response, "no")}
                  cookiePolicy={"single_host_origin"}
                />

                <p>{numNo}</p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="join__team__section">
          <div className="left__side">
            <h1>Join Our Team</h1>
          </div>
          <div className="right__side">
            <h1>
              Join us on our mission to revolutionise the waste management
              industry
            </h1>
            <NavLink to="/joinus" className="join__team__button">
              More Info
            </NavLink>
          </div>
        </div>

        <div className="team__member__section" id="ourteam">
          <h1>Our Team Members</h1>
          {teamMember.length !== 0 ? (
            <div className="about__carousel__section">
              <Splide
                className="team__member"
                options={{
                  type: "loop",
                  gap: "1rem",
                  autoplay: true,
                  pauseOnHover: false,
                  resetProgress: false,
                  pagination: false,
                  arrows: false,
                }}
              >
                {teamMember.map((eachMember, eachMemberIndex) => {
                  return (
                    <SplideSlide className="member" key={eachMemberIndex}>
                      <img src={eachMember.dp} alt="" />
                      <div>
                        <h1>{eachMember.name}</h1>
                        <p>({eachMember.title})</p>
                      </div>
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div>
          ) : null}
        </div>

        <Modal
          className="modal__content"
          overlayClassName="modal__overlay"
          isOpen={isOpen}
          ariaHideApp={false}
        >
          <h1>Any suggestion for us?</h1>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={inputValue.name}
            onChange={getInputValue}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={inputValue.email}
            onChange={getInputValue}
          />
          <input
            type="text"
            placeholder="Phone "
            name="phone"
            value={inputValue.phone}
            onChange={getInputValue}
          />
          <input
            type="text"
            placeholder="Message"
            name="message"
            value={inputValue.message}
            onChange={getInputValue}
          />
          <div>
            <button onClick={voteSuggestion}>Done</button>
            <button
              onClick={() => {
                setInputValue({
                  name: "",
                  email: "",
                  phone: "",
                  message: "",
                });
                setIsOpen(!isOpen);
              }}
            >
              Skip
            </button>
          </div>
        </Modal>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default About;
