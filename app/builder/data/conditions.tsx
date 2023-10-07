export const conditions = [
  {
    field: "CURRENCY",
    operators: ["IS", "IS_NOT"],
    values: ["USD", "EUR", "ARS"],
  },
  {
    field: "AMOUNT",
    operators: [
      "EQUALS",
      "GREATER_THAN",
      "LESS_THAN",
      "GREATER_OR_EQUALS_THAN",
      "LESS_OR_EQUALS_THAN",
    ],
    values: [],
  },
  {
    field: "METHOD",
    operators: ["IS", "IS_NOT"],
    values: ["CREDIT CARD", "DEBIT CARD"],
  },
];
