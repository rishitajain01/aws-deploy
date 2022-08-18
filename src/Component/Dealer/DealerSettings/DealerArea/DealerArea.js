import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// component
import DealerProfileSearchbar from "../../DealerProfileSearchbar";
import DealerProfileNavbar from "../../DealerProfileNavbar";
import DealerAreaCard from "./DealerAreaCard";
import MainFooter from "../../../Footer/MainFooter";
import TermFooter from "../../../Footer/TermFooter";

// css
import "../../../../Css/DealerArea.css";
import "../../../../App.css";

// dealer area data
import { DealerAreaData } from "./DealerAreaData";

const DealerArea = () => {
  const [dealerAreaData, setDealerAreaData] = useState(DealerAreaData);
  const [areaInputData, setAreaInputData] = useState({
    pincode: "",
    state: "",
    city: "",
    area: "",
  });

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get input value
  const getInputValue = (e) => {
    setAreaInputData({ ...areaInputData, [e.target.name]: e.target.value });
  };

  // search area
  const searchArea = async () => {
    if (areaInputData.pincode !== "") {
      await axios
        .get(`https://api.postalpincode.in/pincode/${areaInputData.pincode}`)
        .then((response) => {
          if (response.data[0].PostOffice === null) {
            Swal.fire({
              title: "Check the entered pincode",
              confirmButtonColor: "#56b124",
            });
          } else {
            setAreaInputData({
              ...areaInputData,
              state: response.data[0].PostOffice[0].State,
              city: response.data[0].PostOffice[0].District,
              area: response.data[0].PostOffice[0].Block,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Add a pincode first",
        confirmButtonColor: "#56b124",
      });
    }
  };

  // add area
  const addArea = () => {
    if (
      areaInputData.pincode !== "" &&
      areaInputData.state !== "" &&
      areaInputData.city !== "" &&
      areaInputData.area !== ""
    ) {
      setAreaInputData({
        pincode: "",
        state: "",
        city: "",
        area: "",
      });
      Swal.fire({
        title: "Area added successfully",
        confirmButtonColor: "#56b124",
      });
      history.push("/dealer/settings");
    }
  };

  // delete area
  const deleteArea = (index) => {
    const newDelaerAreaData = [...dealerAreaData];
    newDelaerAreaData.splice(index, 1);
    setDealerAreaData(newDelaerAreaData);
  };

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__area similar__section">
        <h1 className="similar__section__heading">Set Your Area</h1>

        <div className="area__form" onSubmit={addArea}>
          <input
            type="text"
            required
            placeholder="Enter Your Pincode"
            name="pincode"
            value={areaInputData.pincode}
            onChange={getInputValue}
          />
          <button className="search__area__button" onClick={searchArea}>
            Search
          </button>
          <p>
            State : <span>{areaInputData.state}</span>
          </p>
          <p>
            City : <span>{areaInputData.city}</span>
          </p>
          <p>
            Area : <span>{areaInputData.area}</span>
          </p>
          <button onClick={addArea} className="add__area__button">
            Add Your Area
          </button>
        </div>

        <div className="add__area">
          <h1>Added Area</h1>
          <div>
            {dealerAreaData.length !== 0 ? (
              dealerAreaData.map((eachData, eachDataIndex) => {
                return (
                  <DealerAreaCard
                    key={eachDataIndex}
                    pincode={eachData.pincode}
                    state={eachData.state}
                    city={eachData.city}
                    area={eachData.area}
                    deleteArea={deleteArea.bind(this, eachDataIndex)}
                  />
                );
              })
            ) : (
              <p>No Area available here</p>
            )}
          </div>
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerArea;
