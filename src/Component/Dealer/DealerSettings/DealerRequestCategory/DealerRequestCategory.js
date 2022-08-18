import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// component
import DealerProfileSearchbar from "../../DealerProfileSearchbar";
import DealerProfileNavbar from "../../DealerProfileNavbar";
import DealerRequestCategoryCard from "./DealerRequestCategoryCard";
import MainFooter from "../../../Footer/MainFooter";
import TermFooter from "../../../Footer/TermFooter";

// css
import "../../../../Css/DealerRequestCategory.css";
import "../../../../App.css";

// image
import upload__document from "../../../../Image/upload__document.png";

// dealer request category data
import { DealerRequestCategoryData } from "./DealerRequestCategoryData";

const DealerRequestCategory = () => {
  const [inputValue, setInputValue] = useState({
    img: upload__document,
    title: "",
    description: "",
  });
  const [dealerRequestCategoryData] = useState(DealerRequestCategoryData);

  const history = useHistory();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get image
  const getImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setInputValue({ ...inputValue, [e.target.name]: reader.result });
      }
    };
  };

  // get input value
  const getInputValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // request category
  const requestCategory = (e) => {
    e.preventDefault();
    setInputValue({ img: upload__document, name: "", description: "" });
    Swal.fire({
      title: "Successfully requested",
      confirmButtonColor: "#56b124",
    });
    history.push("/dealer/settings");
  };

  return (
    <>
      <DealerProfileSearchbar />

      <DealerProfileNavbar />

      <div className="dealer__request__category similar__section">
        <h1 className="similar__section__heading">Request to Add Category</h1>

        <form className="request__category__form" onSubmit={requestCategory}>
          <img src={inputValue.img} alt="" />
          <input
            type="file"
            required
            accept="image/*"
            style={{ display: "none" }}
            id="img"
            name="img"
            onChange={getImage}
            onClick={(e) => {
              e.target.value = null;
            }}
          />
          <label htmlFor="img">Upload Image</label>
          <input
            type="text"
            placeholder="Category Name"
            required
            name="name"
            value={inputValue.name}
            onChange={getInputValue}
          />
          <input
            type="text"
            placeholder="Add Description"
            required
            name="description"
            value={inputValue.description}
            onChange={getInputValue}
          />
          <button type="submit">Request</button>
        </form>

        <div className="request__category">
          <h1>Requested Category</h1>
          <div>
            {dealerRequestCategoryData.length !== 0 ? (
              dealerRequestCategoryData.map((eachData, eachDataIndex) => {
                return (
                  <DealerRequestCategoryCard
                    key={eachDataIndex}
                    img={eachData.img}
                    name={eachData.name}
                    description={eachData.description}
                    status={eachData.status}
                  />
                );
              })
            ) : (
              <p>No request available here</p>
            )}
          </div>
        </div>
      </div>

      <MainFooter />

      <TermFooter />
    </>
  );
};

export default DealerRequestCategory;
