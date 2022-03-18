import template from "./AddrPaymentForm";

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
        useSameAddressForPayment,
        cardHolder,
        card,
        expiration,
        ccv,
    }
} = template;

export const initialInfo = () => {
    // fetch from Firebase
    [first.name] = '',
    [last.name] = '',
    [address.name] = '',
    [extra.name] = '',
    [city.name] = '',
    [province.name] = '',
    [country.name] = '',
    [postal.name] = '',
    [phone.name] = '',
    [useSameAddressForPayment.name] = '',
    [cardHolder.name] = '',
    [card.name] = '',
    [expiration.name] = '',
    [ccv.name] = ''
};