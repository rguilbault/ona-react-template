import { Chart } from "chart.js/auto";
import { useRef } from "react";

function TodoStats() {
  const statDOMRef = useRef(null);

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  /*if (statDOMRef.current) {
    new Chart(statDOMRef.current, {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }*/

  return (
    <div className="todoStats">
      <h2>Statistiques</h2>
      <div id="stats" ref={statDOMRef} />
    </div>
  );
}

export default TodoStats;
