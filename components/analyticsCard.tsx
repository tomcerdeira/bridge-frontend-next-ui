import { Card, CardBody, CardHeader } from "@nextui-org/react";

type Props = {
    card_color: string
	card_title: string
	card_content: string
  }

export default function AnalyticsCard({ card_color, card_title, card_content }: Props) {
    const cardClassName = `${card_color} rounded-xl shadow-md w-fit w-[300px]`;
  return (
    <Card className={cardClassName}>
        <CardBody className="py-4 text-right">
            <p className="text-3xl text-foreground/80">{card_content}</p>
        </CardBody>
        <CardHeader className="pb-4 pt-1 px-4 flex items-center">
            <h4 className="font-bold text-large mr-1">{card_title}</h4>
        </CardHeader>
    </Card>
  );
}