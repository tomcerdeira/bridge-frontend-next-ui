import { TemporalAmounts } from "@/src/api/types";
import Chart, { Props } from "react-apexcharts";

export const SteamDateCurrency = ({temporalAmounts} : {temporalAmounts: TemporalAmounts[]}) => {

  let series = [
    {
      name: "USD",
      data: [0],
    },
    {
      name: "EUR",
      data: [0],
    },
    {
      name: "ARS",
      data: [0],
    },
    {
      name: "GBP",
      data: [0],
    },
  ];

  let dates = ["Comienzo"];

  for (const dateObj of temporalAmounts) {
    dates.push(dateObj.date);
    
    for(const elem of series){

      for(const payment of dateObj.payments){
        if(payment.currency === elem.name){
          elem.data.push(payment.value);
        }
      }
    }
  }
  
  const options: Props["options"] = {
    chart: {
      type: "area",
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
      id: "basic-bar",
      fontFamily: "Inter, sans-serif",
      foreColor: "hsl(var(--nextui-default-800))",
      stacked: true,
      toolbar: {
        autoSelected: "pan",
        show: false
      }
    },
  
    xaxis: {
      title: {
        text: "Fecha",
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
      categories: dates,
      labels: {
        // show: false,
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
        text: "Cantidad de dinero ($)",
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
          // hsl(var(--nextui-content1-foreground))
          colors: "hsl(var(--nextui-default-800))",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark"
    },
    grid: {
      show: true,
      borderColor: "hsl(var(--nextui-default-200))",
      strokeDashArray: 0,
      position: "back",
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      fill: {
        colors: ["red"],
      },
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
    },
  };

  return (
    <>
      <div className="w-full z-20">
        <div id="chart">
          <Chart options={options} series={series} type="area" height={425} />
        </div>
      </div>
    </>
  );
};