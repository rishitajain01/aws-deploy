import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// css
import "../../../../Css/DealerDocumentUpload.css";

// image
import upload__document from "../../../../Image/upload__document.png";

const RecyclerDocumentUpload = () => {
  const [uploadedImage, setUploadedImage] = useState({
    pan: upload__document,
    gst: upload__document,
    incorporation: upload__document,
    logo: upload__document,
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
      pan: upload__document,
      gst: upload__document,
      incorporation: upload__document,
      logo: upload__document,
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
          id="pan"
          name="pan"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.pan} alt="" />
          <label htmlFor="pan">Company PAN Card</label>
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
          required
          accept="image/*"
          style={{ display: "none" }}
          id="incorporation"
          name="incorporation"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.incorporation} alt="" />
          <label htmlFor="incorporation">
            Incorporation
            <br />
            certificate
          </label>
          <span>Required</span>
        </div>
        <input
          type="file"
          required
          accept="image/*"
          style={{ display: "none" }}
          id="logo"
          name="logo"
          onChange={uploadImage}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        <div>
          <img src={uploadedImage.logo} alt="" />
          <label htmlFor="logo">Company Logo</label>
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

export default RecyclerDocumentUpload;
