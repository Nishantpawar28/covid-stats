import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Moment from "moment";

const LineChart = ({ covidDataForLineChart, datesChecked, datesPerPage }) => {
  const dates = new Map();

  return (
    <div>
      <div>
        <div>
          {covidDataForLineChart
            .slice(datesChecked, datesChecked + datesPerPage)
            .map((date) => {
              dates.set(date.Date, {
                Confirmed: date.Confirmed,
                Deaths: date.Deaths,
                Recovered: date.Recovered,
                Active: date.Active,
              });
            })}
        </div>
      </div>

      <Line
        data={{
          labels: Array.from(dates.keys()).map((date) =>
            Moment(date).format("YYYY-MM-DD")
          ),
          // labels: Array.from(dates.keys()).map( date => new Date(date).toLocaleDateString()),

          datasets: [
            {
              label: "Total Confirmed",
              data: Array.from(dates.values()).map((val) => val.Confirmed),
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Deaths",
              data: Array.from(dates.values()).map((val) => val.Deaths),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Recovered",
              data: Array.from(dates.values()).map((val) => val.Recovered),
              backgroundColor: "rgba(255, 205, 86, 0.2)",
              borderColor: "rgba(255, 205, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Active",
              data: Array.from(dates.values()).map((val) => val.Active),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={1200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default LineChart;
