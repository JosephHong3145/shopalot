import { AddressInfo } from "../views/AddressInfo";
import { Cart } from "./Cart";
import { PaymentInfo } from "../views/PaymentInfo";
import { Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

/* const placeholder = {
  cart: [
    {
      cost: 50.99,
      items: [
        {
          ID: "1",
          name: "Black Box",
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          quantity: 3,
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
      ],
    },
  ],
}; */

export function ReviewItems() {
  const { values: formValues } = useFormikContext();

  return (
    <div>
      <Typography variant="h6">
        Order summary
        <p></p>
      </Typography>
      <div>
        <Cart />
      </div>
      <AddressInfo formValues={formValues} />

      <PaymentInfo formValues={formValues} />
    </div>
  );
}
