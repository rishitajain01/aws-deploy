import React, { createContext, useState } from "react";

// context for step values
export const CustomerSignUpPersonalStep = createContext();
export const CustomerSignUpOrganizationStep = createContext();
export const DealerSignUpStep = createContext();
export const ForgotPasswordStep = createContext();
export const CartStep = createContext();

// context for global values
export const SellItemName = createContext();
export const CartItem = createContext();
export const PriceItemName = createContext();

// context provider
export const ContextProvider = (props) => {
  // global step values
  const [customerSignUpPersonalStep, setCustomerSignUpPersonalStep] =
    useState(1);
  const [customerSignUpOrganizationStep, setCustomerSignUpOrganizationStep] =
    useState(1);
  const [dealerSignUpStep, setDealerSignUpStep] = useState(1);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [cartStep, setCartStep] = useState(1);

  // global values
  const [sellItemName, setSellItemName] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [priceItemName, setPriceItemName] = useState("");

  return (
    <CustomerSignUpPersonalStep.Provider
      value={[customerSignUpPersonalStep, setCustomerSignUpPersonalStep]}
    >
      <CustomerSignUpOrganizationStep.Provider
        value={[
          customerSignUpOrganizationStep,
          setCustomerSignUpOrganizationStep,
        ]}
      >
        <DealerSignUpStep.Provider
          value={[dealerSignUpStep, setDealerSignUpStep]}
        >
          <ForgotPasswordStep.Provider
            value={[forgotPasswordStep, setForgotPasswordStep]}
          >
            <SellItemName.Provider value={[sellItemName, setSellItemName]}>
              <CartStep.Provider value={[cartStep, setCartStep]}>
                <CartItem.Provider value={[cartItem, setCartItem]}>
                  <PriceItemName.Provider
                    value={[priceItemName, setPriceItemName]}
                  >
                    {props.children}
                  </PriceItemName.Provider>
                </CartItem.Provider>
              </CartStep.Provider>
            </SellItemName.Provider>
          </ForgotPasswordStep.Provider>
        </DealerSignUpStep.Provider>
      </CustomerSignUpOrganizationStep.Provider>
    </CustomerSignUpPersonalStep.Provider>
  );
};
