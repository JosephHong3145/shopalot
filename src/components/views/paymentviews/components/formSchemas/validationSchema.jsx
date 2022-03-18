import * as Yup from "yup";
import addressPaymentForm from "./AddrPaymentForm";

const {
  formField: {
    first,
    last,
    address,
    city,
    province,
    country,
    postal,
    phone,
    cardHolder,
    card,
    expiration,
    ccv,
  },
} = addressPaymentForm;

const cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  // Address Info Checker
  Yup.object().shape({
    [first.name]: Yup.string().required(`${first.errorMsg}`),
    [last.name]: Yup.string().required(`${last.errorMsg}`),
    [address.name]: Yup.string().required(`${address.errorMsg}`),
    [city.name]: Yup.string().required(`${city.errorMsg}`),
    [province.name]: Yup.string().required(`${province.errorMsg}`),
    [country.name]: Yup.string().required(`${country.errorMsg}`),
    [postal.name]: Yup.string().required(`${postal.errorMsg}`),
    /* .test("len", `${postal.invalidError}`, val.length === 6 && val >= val) */
    [phone.name]: Yup.string().required(`${phone.errorMsg}`),
  }),
  // Payment info checker
  Yup.object().shape({
    [cardHolder.name]: Yup.string().required(`${cardHolder.errorMsg}`),
    [card.name]: Yup.string()
      .required(`${card.errorMsg}`)
      .matches(cardRegex, card.invalidError),
    [expiration.name]: Yup.string().required(`${expiration.errorMsg}`),
    /* .test(
        val"len",
        `${expiration.invalidError}`,
        val.length === 4 && val >= val
      ) */
    [ccv.name]: Yup.string().required(`${ccv.errorMsg}`),
    /* .test("len", `${ccv.invalidError}`, val.length === 3 && val >= val) */
  }),
];