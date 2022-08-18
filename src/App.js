import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// private route
import PrivateAuthRoute from "./Route/PrivateAuthRoute";
import PrivateAnotherRoute from "./Route/PrivateAnotherRoute";
import PrivateCustomerRoute from "./Route/PrivateCustomerRoute";
import PrivateDealerRoute from "./Route/PrivateDealerRoute";
import PrivateSellItemRoute from "./Route/PrivateSellItemRoute";

// component
import About from "./Component/AboutPage/About";
import JoinUs from "./Component/JoinUsPage/JoinUs";
import Sell from "./Component/SellPage/Sell";
import Faq from "./Component/FaqPage/Faq";
import Contact from "./Component/ContactPage/Contact";
import PrivacyPolicy from "./Component/Privacy&Terms/PrivacyPolicy";
import TermsConditions from "./Component/Privacy&Terms/TermsConditions";
import SignIn from "./Component/SignIn/SignIn";
import SignUp from "./Component/SignUp/SignUp";
import CustomerSignUp from "./Component/SignUp/CustomerSignUp/CustomerSignUp";
import CustomerSignUpPersonal from "./Component/SignUp/CustomerSignUp/CustomerSignUpPersonal/CustomerSignUpPersonal";
import CustomerSignUpOrganization from "./Component/SignUp/CustomerSignUp/CustomerSignUpOrganization/CustomerSignUpOrganization";
import DealerSignUp from "./Component/SignUp/DealerSignUp/DealerSignUp";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";
import SellItem from "./Component/SellItemPage/SellItem";
import CartSection from "./Component/Cart/CartSection";
import UserProfile from "./Component/User/UserProfile/UserProfile";
import UserProfileEdit from "./Component/User/UserProfile/UserProfileEdit";
import UserPickup from "./Component/User/UserPickup/UserPickup";
import UserWallet from "./Component/User/UserWallet/UserWallet";
import UserWalletHistory from "./Component/User/UserWallet/UserWalletHistory";
import UserQR from "./Component/User/UserQR/UserQR";
import UserAutoScrap from "./Component/User/UserAutoScrap/UserAutoScrap";
import DealerHome from "./Component/Dealer/DealerHome/DealerHome";
import DealerProfile from "./Component/Dealer/DealerProfile/DealerProfile";
import DealerProfileEdit from "./Component/Dealer/DealerProfile/DealerProfileEdit";
import DealerQR from "./Component/Dealer/DealerQR/DealerQR";
import DealerPickup from "./Component/Dealer/DealerPickup/DealerPickup";
import DealerWallet from "./Component/Dealer/DealerWallet/DealerWallet";
import DealerWalletHistory from "./Component/Dealer/DealerWallet/DealerWalletHistory";
import DealerSettings from "./Component/Dealer/DealerSettings/DealerSettings";
import DealerDocumentUpload from "./Component/Dealer/DealerSettings/DealerDocumentUpload/DealerDocumentUpload";
import DealerArea from "./Component/Dealer/DealerSettings/DealerArea/DealerArea";
import DealerSetPrice from "./Component/Dealer/DealerSettings/DealerSetPrice/DealerSetPrice";
import DealerEditPrice from "./Component/Dealer/DealerSettings/DealerSetPrice/DealerEditPrice";
import DealerPriceList from "./Component/Dealer/DealerSettings/DealerSetPrice/DealerPriceList";
import DealerRequstCategory from "./Component/Dealer/DealerSettings/DealerRequestCategory/DealerRequestCategory";

// css
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateAnotherRoute exact path="/" component={About} />
        <PrivateAnotherRoute exact path="/joinus" component={JoinUs} />
        <PrivateAnotherRoute exact path="/sell" component={Sell} />
        <PrivateAnotherRoute exact path="/faq" component={Faq} />
        <PrivateAnotherRoute exact path="/contact" component={Contact} />
        <Route exact path="/privacypolicy" component={PrivacyPolicy} />
        <Route exact path="/termsconditions" component={TermsConditions} />
        <PrivateAuthRoute exact path="/signin" component={SignIn} />
        <PrivateAuthRoute exact path="/signin/signup" component={SignUp} />
        <PrivateAuthRoute
          exact
          path="/signin/signup/customer"
          component={CustomerSignUp}
        />
        <PrivateAuthRoute
          exact
          path="/signin/signup/customer/personal"
          component={CustomerSignUpPersonal}
        />
        <PrivateAuthRoute
          exact
          path="/signin/signup/customer/organization"
          component={CustomerSignUpOrganization}
        />
        <PrivateAuthRoute
          exact
          path="/signin/signup/dealer"
          component={DealerSignUp}
        />
        <PrivateAuthRoute
          exact
          path="/signin/forgotpassword"
          component={ForgotPassword}
        />
        <Route exact path="/sell/sellitem" component={SellItem} />
        <PrivateCustomerRoute exact path="/sell/cart" component={CartSection} />
        <PrivateCustomerRoute
          exact
          path="/sell/user/profile"
          component={UserProfile}
        />
        <PrivateCustomerRoute
          exact
          path="/sell/user/profile/profileedit"
          component={UserProfileEdit}
        />
        <PrivateCustomerRoute
          exact
          path="/sell/user/pickup"
          component={UserPickup}
        />
        <PrivateCustomerRoute
          exact
          path="/sell/user/wallet"
          component={UserWallet}
        />
        <PrivateCustomerRoute
          exact
          path="/sell/user/wallet/wallethistory"
          component={UserWalletHistory}
        />
        <PrivateCustomerRoute exact path="/sell/user/qr" component={UserQR} />
        <PrivateCustomerRoute
          exact
          path="/sell/user/autoscrap"
          component={UserAutoScrap}
        />
        <PrivateDealerRoute exact path="/dealer/home" component={DealerHome} />
        <PrivateDealerRoute
          exact
          path="/dealer/profile"
          component={DealerProfile}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/profile/profileedit"
          component={DealerProfileEdit}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/profile/qr"
          component={DealerQR}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/pickup"
          component={DealerPickup}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/wallet"
          component={DealerWallet}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/wallet/wallethistory"
          component={DealerWalletHistory}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings"
          component={DealerSettings}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings/documentupload"
          component={DealerDocumentUpload}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings/addarea"
          component={DealerArea}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings/setprice"
          component={DealerSetPrice}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings/setprice/editprice"
          component={DealerEditPrice}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings/setprice/editprice/pricelist"
          component={DealerPriceList}
        />
        <PrivateDealerRoute
          exact
          path="/dealer/settings/requestcategory"
          component={DealerRequstCategory}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
