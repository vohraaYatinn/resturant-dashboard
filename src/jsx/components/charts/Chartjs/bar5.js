import React from "react";
import { Bar } from "react-chartjs-2";
const data = {
  defaultFontFamily: "Poppins",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgba(25,33,250, 1)",
      borderWidth: "0",
      backgroundColor: "rgba(25,33,250, 0.5)",
      hoverBackgroundColor: "rgba(25,33,250, 0.5)",
      barThickness: 40
    },
  ],
};
const options = {
plugins:{
  legend: false,
},
  scales: {
    y: 
      {
        ticks: {
          beginAtZero: true,
        },
        grid:{
          color:"rgba(255, 255, 255, 0.1)"
        }
      },
    
    x: 
      {
        // Change here
        barPercentage: 0.5,
        grid:{
          color:"rgba(255, 255, 255, 0.1)"
        }
      },
    
  },
};
const BarChart5 = () =>{
  return (
      <>
        <Bar data={data} height={150} options={options} />
      </>
  );
}
export default BarChart5;
