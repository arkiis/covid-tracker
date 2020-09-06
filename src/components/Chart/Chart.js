import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardBody } from "reactstrap";
import { rgbaColor } from "./../../helpers/utils";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  const config = {
    data(canvas) {
      const ctx = canvas.getContext("2d");
      const gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
      gradientFill.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0)");

      return {
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            borderWidth: 2,
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: rgbaColor("#fff", 0.8),

            backgroundColor: gradientFill,
          },
          {
            borderWidth: 2,
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: rgbaColor("#fff", 0.8),

            backgroundColor: gradientFill,
            fill: true,
          },
        ],
      };
    },
    options: {
      legend: { display: false },
      tooltips: {
        mode: "x-axis",
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
      },
      hover: { mode: "label" },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              show: true,
              labelString: "Month",
            },
            ticks: {
              fontColor: rgbaColor("#fff", 0.7),
              fontStyle: 600,
            },
            gridLines: {
              color: rgbaColor("#fff", 0.1),
              zeroLineColor: rgbaColor("#fff", 0.1),
              lineWidth: 1,
            },
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: rgbaColor("#fff", 1),
            },
          },
        ],
      },
    },
  };
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={config.data}
      options={config.options}
      width={600}
      height={300}
    />
  ) : null;

  const barChar = confirmed ? (
    <Bar
      data={{
        labels: ["infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#333", "#028090", "#8c2f39"],

            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
      width={600}
      height={300}
    />
  ) : null;

  return (
    <Card className={styles.full}>
      <CardBody className="rounded-soft bg-gradient">
        {country ? barChar : lineChart}
      </CardBody>
    </Card>
  );
};

export default Chart;
