import { checkIfCardValid } from "./components/views/paymentviews/components/formSchemas/validationSchema.jsx";
import { expect, test } from "@jest/globals";
import {
  formatEarliestDelivery,
  getAverageRating,
  getFormattedDateWithYear,
  sortDocument,
} from "./components/views/ItemView";
import { getDeliveryTime } from "./components/views/paymentviews/components/views/AddressInfo";
import {
  getEnabledFilters,
  getFilterCombinations,
} from "./components/views/EditItemView";
import { getItemsPrice } from "./components/views/MyCartView";
import { getOrderProcessingDelay } from "./components/views/paymentviews/PaymentView";

test("Credit card validation", () => {
  expect(checkIfCardValid("123")).toBe(false);
  expect(checkIfCardValid("4123123")).toBe(false);
  expect(checkIfCardValid("4123123123123")).toBe(true);
});
test("Format earliest date", () => {
  expect(formatEarliestDelivery(new Date(2018, 11, 24, 10, 33, 30, 0))).toBe(
    "Monday, December 24"
  );
});
test("Get average rating", () => {
  expect(getAverageRating([3, 5, 3, 2, 5], 18)).toBe(3.5);
  expect(getAverageRating([5, 5, 5, 2, 5], 22)).toBe(3);
});
test("Format date with year", () => {
  expect(getFormattedDateWithYear(new Date(2018, 11, 24, 10, 33, 30, 0))).toBe(
    "Monday, December 24, 2018"
  );
});
test("Sort item", () => {
  expect(
    sortDocument(
      "Highest Rating",
      JSON.parse(
        '{"rating":"4","date":{"seconds":1648407608,"nanoseconds":22000000}}'
      ),
      JSON.parse(
        '{"date":{"seconds":1648407616,"nanoseconds":389000000},"rating":"5"}'
      )
    )
  ).toBe(1);
});
test("Get enabled filters", () => {
  expect(
    getEnabledFilters(
      [true, true],
      ["qwe", "qwa"],
      [
        ["asdasd", "asds"],
        ["asdasd", "asds"],
      ]
    )
  ).toStrictEqual([
    { name: "qwe", options: ["asdasd", "asds"] },
    { name: "qwa", options: ["asdasd", "asds"] },
  ]);
});
test("Get filter combinations", () => {
  expect(
    getFilterCombinations([
      { name: "Size", options: ["7", "8", "9", "10"] },
      { name: "Color", options: ["Red", "Green", "Blue"] },
    ])
  ).toStrictEqual([
    ["7", "Red"],
    ["7", "Green"],
    ["7", "Blue"],
    ["8", "Red"],
    ["8", "Green"],
    ["8", "Blue"],
    ["9", "Red"],
    ["9", "Green"],
    ["9", "Blue"],
    ["10", "Red"],
    ["10", "Green"],
    ["10", "Blue"],
  ]);
});
test("Get items price", () => {
  expect(
    getItemsPrice([
      { quantity: 1, price: "5" },
      { quantity: 1, price: "12" },
      { price: "1000", quantity: 1 },
    ])
  ).toBe("1017.00");
});
test("Get order processing delay", () => {
  expect(
    getOrderProcessingDelay([
      { itemProcessingDelay: "1" },
      { itemProcessingDelay: "3" },
      { itemProcessingDelay: "20" },
    ])
  ).toBe(20);
});
test("Get delivery time", () => {
  expect(getDeliveryTime(7)).toBe(7);
});
