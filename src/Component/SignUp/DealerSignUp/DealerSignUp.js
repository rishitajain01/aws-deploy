import React, { useEffect } from "react";

// component
import Navbar from "../../Navbar";
import RightBanner from "../../AuthPageBanner/RightBanner";
import DealerSignUpStep1 from "./DealerSignUpStep1";
import DealerSignUpStep2 from "./DealerSignUpStep2";
import SignUpAddressInfoStep from "../SignUpCommonStep/SignUpAddressInfoStep";
import TermFooter from "../../Footer/TermFooter";

// css
import "../../../Css/Auth.css";

// redux
import { useSelector } from "react-redux";

const DealerSignUp = () => {
  const dealerSignUpStep = useSelector(
    (state) => state.stepReducer.dealerSignUpStep
  );

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <div className="auth__section">
        {(() => {
          if (dealerSignUpStep === 1) {
            return <DealerSignUpStep1 />;
          } else if (dealerSignUpStep === 2) {
            return <DealerSignUpStep2 />;
          } else if (dealerSignUpStep === 3) {
            return <SignUpAddressInfoStep />;
          }
        })()}

        <RightBanner />
      </div>

      <TermFooter />
    </>
  );
};

export default DealerSignUp;
