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
    useSameAddress,
    cardHolder,
    card,
    expiration,
    ccv,
  },
} = addressPaymentForm;

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
  [useSameAddress.name]: false,
  [cardHolder.name]: "",
  [card.name]: "",
  [expiration.name]: "",
  [ccv.name]: "",
};
