import AnalyticsCard from "@/components/analyticsCard";
import { FailIcon } from "@/components/icons/fail-icon";
import { SuccessIcon } from "@/components/icons/success-icon";
import { AnalyticsResponse } from "@/src/api/types";
import Link from "next/link"; // Import Link from Next.js

export interface FlowsCardsProps {
  children?: React.ReactNode;
  shop_analytics: AnalyticsResponse;
}

export default function FlowsCards({ shop_analytics }: FlowsCardsProps) {
  return (
    <>
      <Link href="/activity?flowSucceed=true">
          <AnalyticsCard
            card_color="bg-success"
            card_title="Flujos exitosos"
            card_content={shop_analytics.flowsSucceeded}
            icon={<SuccessIcon />}
          />
      </Link>
      <Link href="/activity?flowSucceed=false">
          <AnalyticsCard
            card_color="bg-danger"
            card_title="Flujos fallidos"
            card_content={shop_analytics.flowsFailed}
            icon={<FailIcon />}
          />
      </Link>
    </>
  );
}
