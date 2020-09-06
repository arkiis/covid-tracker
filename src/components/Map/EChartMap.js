import React, { useState, useEffect } from "react";
import { eChartData } from "../../api";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import Loader from "../Loader/Loader";
import "echarts/map/js/world";

const MapExample = () => {
  const [dailyData, setDailyData] = useState([]);

  const option = {
    tooltip: {
      show: true,
      trigger: "item",
      backgroundColor: "#f9fafd",
      textStyle: {
        color: "#000",
      },
      formatter: function ({ name, value }) {
        return (
          "<strong>" + name + "</strong><br/>Infected: " + (value ? value : 0)
        );
      },
    },
    visualMap: {
      min: 0,
      max: 100000,
      text: ["High", "Low"],
      realtime: false,
      calculable: true,
      inRange: {
        color: ["#d8e2ef", "#2d7bcd"],
      },
    },
    series: [
      {
        type: "map",
        mapType: "world",
        roam: false,
        zoom: 1.25,
        scaleLimit: {
          min: 0.75,
          max: 17,
        },
        itemStyle: {
          normal: {
            borderColor: "#d8e2ef",
            borderWidth: 0.5,
            areaStyle: {
              color: "#d8e2ef",
            },
          },
          emphasis: {
            areaColor: "#0443a2",
            borderColor: "#d8e2ef",
            label: {
              show: false,
              color: "#fff",
            },
          },
        },
        data: dailyData,
      },
    ],
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await eChartData());
    };

    fetchAPI();
  }, []);

  return dailyData.length > 0 ? (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: 420 }}
    />
  ) : (
    <Loader />
  );
};
export default MapExample;
