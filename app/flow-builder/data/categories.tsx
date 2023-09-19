import {
  RiWhatsappLine,
  RiSlackFill,
  FaTelegram,
  RiPaypalFill,
  FaCcStripe,
  SiMercadopago,
  TbAmpersand,
  LiaGripLinesVerticalSolid,
  RiBracesFill,
} from "../icons";

export const categories = [
  {
    type: "Notification",
    items: [
      { icon: RiWhatsappLine, name: "Whatsapp", parameter: {} },
      { icon: RiSlackFill, name: "Slack", parameter: {} },
      { icon: FaTelegram, name: "Telegram", parameter: {} },
    ],
  },
  {
    type: "Processor",
    items: [
      {
        icon: RiPaypalFill,
        name: "Paypal",
        parameter: { ACCESS_TOKEN: "", PUBLIC_KEY: "" },
      },
      {
        icon: FaCcStripe,
        name: "Stripe",
        parameter: { ACCESS_TOKEN: "", PUBLIC_KEY: "" },
      },
      {
        icon: SiMercadopago,
        name: "Mercadopago",
        parameter: { ACCESS_TOKEN: "", PUBLIC_KEY: "" },
      },
    ],
  },
  {
    type: "Logical operator",
    items: [
      { icon: TbAmpersand, name: "AND" },
      { icon: LiaGripLinesVerticalSolid, name: "OR" },
    ],
  },
  {
    type: "Condition",
    items: [{ icon: RiBracesFill, name: "Condition" }],
  },
];
