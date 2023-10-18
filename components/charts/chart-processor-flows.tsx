import { ProcessorAnalyticsResponse } from "@/src/api/types";
import Chart, { Props } from "react-apexcharts";

export const SteamProcessorFlows = ({processorAnalytics} : {processorAnalytics: ProcessorAnalyticsResponse[]}) => {

  let processors: string[] = [];
  let flowsSucceededNumberArray: number[] = [];
  let flowsFailedNumberArray: number[] = [];
  let series = [
    {
      name: 'Exitosos',
      data: flowsSucceededNumberArray
    },
    {
      name: 'Fallidos',
      data: flowsFailedNumberArray
    }
  ];

  for(var pA of processorAnalytics){
    processors.push(pA.processor);
    for(var elem of series){
      if(elem.name === 'Exitosos'){
        elem.data.push(Number(pA.analytics.flowsSucceeded));
      }else{
        elem.data.push(Number(pA.analytics.flowsSucceeded));
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
      text: "Cantidad de ejecuciones de flujos",
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