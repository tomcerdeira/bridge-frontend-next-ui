import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ReactNode } from "react";

type Props = {
  card_color: string
	card_title: string
	card_content: string
  icon?: ReactNode
  }

export default function AnalyticsCard({ card_color, card_title, card_content, icon }: Props) {
    const cardClassName = `${card_color} rounded-xl shadow-md w-fit w-[300px] hover:bg-gradient-to-tr from-gray-800 to-bg-transparent hover:-translate-y-1 shadow-xl after:content-[''] after:absolute after:inset-0 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0`;
  return (
    <Card className={cardClassName} shadow="sm" isPressable>
      {icon? (
        <CardBody>
          <div className="flex justify-between">
            <div className="flex items-center">
              {icon}
            </div>
            <div className="flex items-center">
              <p className="text-3xl text-foreground/80">{card_content}</p>
            </div>
          </div>
        </CardBody>
      ) : (
        <CardBody className="py-4 text-right">
          <p className="text-3xl text-foreground/80">{card_content}</p>
        </CardBody>
      )}

        <CardHeader className="pb-4 pt-1 px-4 flex items-center">
            <h4 className="font-bold text-large mr-1">{card_title}</h4>
        </CardHeader>
    </Card>
  );
}