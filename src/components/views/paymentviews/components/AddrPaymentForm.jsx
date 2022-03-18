export const template = () => {
  formId = "shipping";
  formField = {
    first: {
      name: "first",
      label: "First name*",
      requiredErrorMsg: "Required",
    },
    last: {
      name: "last",
      label: "Last name*",
      requiredErrorMsg: "Required",
    },
    address: {
      name: "address",
      label: "Address line 1*",
      requiredErrorMsg: "Required",
    },
    extra: {
      name: "extra",
      label: "Address line 2",
      requiredErrorMsg: "Required",
    },
    city: {
      name: "city",
      label: "City*",
      requiredErrorMsg: "Required",
    },
    province: {
      name: "province",
      label: "Province*",
      requiredErrorMsg: "Required",
    },
    country: {
      name: "country",
      label: "country*",
      requiredErrorMsg: "Required",
    },
    postal: {
      name: "postal",
      label: "Zip code*",
      requiredErrorMsg: "Required",
    },
    phone: {
      name: "phone",
      label: "Phone number*",
      requiredErrorMsg: "Required",
    },
    useSameAddress: {
      name: "useSameAddress",
      label: "Same address for as for shipping.",
    },
    cardHolder: {
      name: "cardholder",
      label: "Cardholder name*",
      requiredErrorMsg: "Required",
    },
    card: {
      name: "card",
      label: "Card number*",
      requiredErrorMsg: "Required",
    },
    expiration: {
      name: "expi",
      label: "Expiration*",
      requiredErrorMsg: "Required",
    },
    ccv: {
      name: "ccv",
      label: "CCV*",
      requiredErrorMsg: "Required",
    },
  };
};
