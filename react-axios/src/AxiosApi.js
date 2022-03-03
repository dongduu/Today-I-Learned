import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js";

function AxiosApi() {
  const [averageData, setAverageData] = useState([]);
  function searchApi() {
    const url =
      "https://kimcodi.kr/external_api/dashboard/avgOfSeriesByMonth.php?%20yyyy=2021&mm=11&series=경찰";
    axios
      .get(url)
      .then(function (res) {
        setAverageData(res.data.result[0].STUDENT_COUNT);
        console.log("성공", res.data.result[0].STUDENT_COUNT);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }
  searchApi();

  const canvasDom = useRef(null);
  useEffect(() => {
    const ctx = canvasDom.current.getContext("2d");
    new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: ["1", "2"], // 세로축
        datasets: [
          {
            data: [averageData, 90, 80], // 가로축
            borderWidth: 1, // 테두리 선 굵기
            barPercentage: 0.7, //
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    });
  }, []);

  return (
    <div>
      <div>{averageData}</div>
      <canvas ref={canvasDom}></canvas>
    </div>
  );
}

export default AxiosApi;
