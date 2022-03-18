import { PaymentNavbar } from "./components/PaymentNavbar";
import { PaymentView } from "./PaymentView";
import React from "react";

export const CheckoutView = () => {
  return (
    <div>
      <PaymentNavbar />
      <PaymentView />
    </div>
  );
};
