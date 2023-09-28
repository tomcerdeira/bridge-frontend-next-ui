export const conditions = [
  {
    field: "currency",
    operators: ["is", "is not"],
    values: ["usd", "eur", "ars"],
  },
  {
    field: "amount",
    operators: ["=", ">", "<"],
    values: [],
  },
  {
    field: "method",
    operators: ["is", "is not"],
    values: ["cash", "credit card", "debit card"],
  },
];
