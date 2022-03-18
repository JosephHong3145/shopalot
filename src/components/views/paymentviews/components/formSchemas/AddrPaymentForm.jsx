export default {
  formId: "addressPaymentForm",
  formField: {
    first: {
      name: "first",
      label: "First name*",
      errorMsg: "Required",
    },
    last: {
      name: "last",
      label: "Last name*",
      errorMsg: "Required",
    },
    address: {
      name: "address",
      label: "Address line 1*",
      errorMsg: "Required",
    },
    extra: {
      name: "extra",
      label: "Address line 2",
    },
    city: {
      name: "city",
      label: "City*",
      errorMsg: "Required",
    },
    province: {
      name: "province",
      label: "Province*",
      errorMsg: "Required",
    },
    country: {
      name: "country",
      label: "country*",
      errorMsg: "Required",
    },
    postal: {
      name: "postal",
      label: 'Postal code ("X1X 1X1")*',
      errorMsg: "Required",
      // invalidMsg: 'Please enter your postal code using a "X0X0X0" format.',
    },
    phone: {
      name: "phone",
      label: "Phone number*",
      errorMsg: "Required",
      // invalidMsg:
      //  "Please enter your phone number without any space and characters.",
    },
    useSameAddress: {
      name: "useSameAddress",
      label: "Same address for as for shipping.",
    },
    cardHolder: {
      name: "cardholder",
      label: "Cardholder name*",
      errorMsg: "Required",
    },
    card: {
      name: "card",
      label: "Card number*",
      errorMsg: "Required",
      // invalidMsg: "Please enter your card number without any space.",
    },
    expiration: {
      name: "expi",
      label: "Expiration (MMYY)*",
      errorMsg: "Required",
    },
    ccv: {
      name: "ccv",
      label: "CCV*",
      errorMsg: "Required",
      // invalidMsg: "Please enter the three numbers of your CCV (ex: 092).",
    },
  },
};
