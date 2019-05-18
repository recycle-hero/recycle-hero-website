import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

const recyclingData = [
  { x: "Soft Plastics", y: 40 },
  { x: "Coffee Cups", y: 10 },
  { x: "Food Scraps", y: 40 },
  { x: "eWaste", y: 10 }
];

const chartData = {
  labels: recyclingData.map((datum) => datum.x),
  datasets: [
    {
      label: '% of total contamination',
      data: recyclingData.map((datum) => datum.y),
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
      borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"]
    }
  ]
};

const chartOptions = {
  layout: { padding: { top: 25, bottom: 75, left: 75, right: 75 } },
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      gridLines: { display: false },
      ticks: {
        beginAtZero: true,
        display: true,
        callback: function (value) {
          return `${value}%`;
        }
      }
    }],
    xAxes: [
      {
        gridLines: { display: false },
      }
    ]
  },
  legend: { display: false },
  title: {
    display: true,
    text: 'Typical Contaminants',
    padding: 10,
    lineHeight: 4,
    fontSize: 20,
    fontColor: '#677'
  }
};

export function ContaminantChart() {
  return (
    <Fragment>
      <Bar data={chartData} width={100} height={50} options={chartOptions} />
    </Fragment>
  );
}
