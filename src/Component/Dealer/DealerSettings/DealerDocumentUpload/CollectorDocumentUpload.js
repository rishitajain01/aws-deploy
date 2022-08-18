import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// css
import "../../../../Css/DealerDocumentUpload.css";

// image
import upload__document from "../../../../Image/upload__document.png";

const CollectorDocumentUpload = () => {
  const [uploadedImage, setUploadedImage] = useState({
    adhaar: upload__document,
    photo: upload__document,
    gst: upload__document,
    other: upload__document,
  });

  const history = useHistory();

  // upload image
  const uploadImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadedImage({ ...uploadedImage, [e.target.name]: reader.result });
      }
    };
  };

  // submit document
  const submitDocument = (e) => {
    e.preventDefault();
    setUploadedImage({
      adhaar: upload__document,
      photo: upload__document,
      gst: upload__document,
      other: upload__document,
    });
    Swal.fire({
      title: "Documents uploaded",
      confirmButtonColor: "#56b124",
    });
    history.push("/dealer/settings");
  };

  return (
    <form className="dealer__document__upload" onSubmit={submitDocument}>
      <div className="document__upload">
        <input
          type="file"
          required
          accept="image/*"
          style={{ display: "none" }}
          id="adhaar"
          name="adhaar"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.adhaar} alt="" />
          <label htmlFor="adhaar">Select Adhaar Card</label>
          <span>Required</span>
        </div>
        <input
          type="file"
          required
          accept="image/*"
          style={{ display: "none" }}
          id="photo"
          name="photo"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.photo} alt="" />
          <label htmlFor="photo">Select Your Photo</label>
          <span>Required</span>
        </div>
        <input
          type="file"
          required
          accept="image/*"
          style={{ display: "none" }}
          id="gst"
          name="gst"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.gst} alt="" />
          <label htmlFor="gst">GST Certificate</label>
          <span>Required</span>
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="other"
          name="other"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.other} alt="" />
          <label htmlFor="other">Other Documents</label>
        </div>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default CollectorDocumentUpload;
