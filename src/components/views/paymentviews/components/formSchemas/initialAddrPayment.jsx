import { CircularProgress } from "@mui/material";
import { query, where } from "firebase/firestore";
import { useAuthState } from "../../../../../contexts/AuthContext";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../../../contexts/FirebaseContext";
import addressPaymentForm from "./AddrPaymentForm";

const {
  formField: {
    first,
    last,
    address,
    extra,
    city,
    province,
    country,
    postal,
    phone,
    deliveryOption,
    useSameAddress,
    cardHolderFirst,
    cardHolderLast,
    card,
    expiration,
    ccv,
    billingAddress,
    billingExtra,
    billingCity,
    billingProvince,
    billingCountry,
    billingPostal,
  },
} = addressPaymentForm;

const billingPaymentInfo = () => {};
export default {
  // fetch from Firebase
  [first.name]: "",
  [last.name]: "",
  [address.name]: "",
  [extra.name]: "",
  [city.name]: "",
  [province.name]: "",
  [country.name]: "",
  [postal.name]: "",
  [phone.name]: "",
  [deliveryOption.name]: "Two-Days Shipping",
  [useSameAddress.name]: false,
  [cardHolderFirst.name]: "",
  [cardHolderLast.name]: "",
  [card.name]: "",
  [expiration.name]: "",
  [ccv.name]: "",
  [billingAddress.name]: "",
  [billingExtra.name]: "",
  [billingCity.name]: "",
  [billingProvince.name]: "",
  [billingCountry.name]: "",
  [billingPostal.name]: "",
};
