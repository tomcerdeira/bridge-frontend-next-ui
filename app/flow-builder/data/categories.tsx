import { TbAmpersand, LiaGripLinesVerticalSolid, RiBracesFill } from "../index";

export const categories = [
  {
    type: "Logical operator",
    items: [
      { icon: TbAmpersand, name: "AND", parameter: {} },
      { icon: LiaGripLinesVerticalSolid, name: "OR", parameter: {} },
    ],
  },
  {
    type: "Condition",
    items: [{ icon: RiBracesFill, name: "Condition", parameter: {} }],
  },
];
