import {
  RiSlackFill,
  RiWhatsappLine,
  RiPaypalFill,
  RiBracesFill,
  FaCcStripe,
  FaTelegram,
  SiMercadopago,
  TbAmpersand,
  LiaGripLinesVerticalSolid,
  SiBinance,
} from "../index";

export const onDragStart = (event: any, nodeType: any) => {
  event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeType));
  event.dataTransfer.effectAllowed = "move";
};

export const getIconComponent = (icon: String) => {
  switch (icon.toLowerCase()) {
    case "slack":
      return RiSlackFill;
    case "whatsapp":
      return RiWhatsappLine;
    case "stripe":
      return FaCcStripe;
    case "telegram":
      return FaTelegram;
    case "mercadopago":
      return SiMercadopago;
    case "paypal":
      return RiPaypalFill;
    case "condition":
      return RiBracesFill;
    case "and":
      return TbAmpersand;
    case "or":
      return LiaGripLinesVerticalSolid;
    case "binance":
      return SiBinance;
  }
};

let id = 1;
export const getId = () => `bridge_${id++}`;
