import { ProcessorAnalyticsResponse } from "@/src/api/types";
import Chart, { Props } from "react-apexcharts";

//TODO: borrar
const mock = [
  {
    "processor": "unknown",
    "analytics": {
      "avgPaymentSucceeded": 0.23140495867768596,
      "overAllPayments": 121,
      "paymentsSucceeded": 28,
      "paymentsFailed": 93,
      "flowsSucceeded": 57,
      "flowsFailed": 64,
      "totalAmountsProcessed": [
        {
          "value": 2350,
          "currency": "ARS"
        },
        {
          "value": 123,
          "currency": "USD"
        }
      ],
      "avgPaymentAmounts": [
        {
          "value": 90.38,
          "currency": "ARS"
        },
        {
          "value": 61.5,
          "currency": "USD"
        }
      ],
      "temporalAmounts": []
    }
  },
  {
    "processor": "mercadopago",
    "analytics": {
      "avgPaymentSucceeded": 0,
      "overAllPayments": 1,
      "paymentsSucceeded": 0,
      "paymentsFailed": 1,
      "flowsSucceeded": 0,
      "flowsFailed": 1,
      "totalAmountsProcessed": [],
      "avgPaymentAmounts": [],
      "temporalAmounts": []
    }
  },
  {
    "processor": "transbank",
    "analytics": {
      "avgPaymentSucceeded": 0,
      "overAllPayments": 50,
      "paymentsSucceeded": 45,
      "paymentsFailed": 5,
      "flowsSucceeded": 0,
      "flowsFailed": 1,
      "totalAmountsProcessed": [],
      "avgPaymentAmounts": [],
      "temporalAmounts": []
    }
  },
  {
    "processor": "payu",
    "analytics": {
      "avgPaymentSucceeded": 0,
      "overAllPayments": 29,
      "paymentsSucceeded": 17,
      "paymentsFailed": 12,
      "flowsSucceeded": 0,
      "flowsFailed": 1,
      "totalAmountsProcessed": [],
      "avgPaymentAmounts": [],
      "temporalAmounts": []
    }
  }
];

export const SteamProcessorPayment = ({processorAnalytics} : {processorAnalytics: ProcessorAnalyticsResponse[]}) => {

  let processors: string[] = [];
  let paymentsSucceededNumberArray: number[] = [];
  let paymentsFailedNumberArray: number[] = [];
  let series = [
    {
      name: 'Exitosos',
      data: paymentsSucceededNumberArray
    },
    {
      name: 'Fallidos',
      data: paymentsFailedNumberArray
    }
  ];

  for(var pA of processorAnalytics){
    processors.push(pA.processor);
    for(var elem of series){
      if(elem.name === 'Exitosos'){
        elem.data.push(Number(pA.analytics.paymentsSucceeded));
      }else{
        elem.data.push(Number(pA.analytics.paymentsFailed));
      }
    }
  }
  
  const options: Props["options"] = {
    chart: {
    type: 'bar',
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    stacked: true,
    fontFamily: "Inter, sans-serif",
    foreColor: "hsl(var(--nextui-default-800))",
    toolbar: {
      autoSelected: "pan",
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 300,
          }
        }
      }
    },
  },
  xaxis: {
    title: {
      text: "Procesador",
      offsetX: 0,
      offsetY: 0,
      style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 300,
          cssClass: 'apexcharts-yaxis-title',
      },
    },
    categories: processors,
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
        fontFamily: "Inter, sans-serif",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
  },
  yaxis: {
    title: {
      text: "Cantidad de pagos",
      rotate: -90,
      offsetX: -5,
      offsetY: 0,
      style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 300,
          cssClass: 'apexcharts-yaxis-title',
      },
  },
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
        fontFamily: "Inter, sans-serif",
      },
    },
  },
  tooltip: {
    enabled: true,
    theme: "dark"
  },
  colors: ["#00e396", "#ff4560"]
  };

  return (
    <>
      <div className="w-full z-20">
        <div id="chart">
          <Chart options={options} series={series} type="bar" height={425} />
        </div>
      </div>
    </>
  );
};