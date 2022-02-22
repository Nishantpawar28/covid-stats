import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({
  covidDataForBarChart,
  countriesCheckedForBarchart,
  countriesPerPageForBarChart,
}) => {
  const countries = new Map();

  return (
    <div>
      <div>
        <div>
          {covidDataForBarChart
            .slice(
              countriesCheckedForBarchart,
              countriesCheckedForBarchart + countriesPerPageForBarChart
            )
            .map((country) => {
              countries.set(country.Country, {
                TotalConfirmed: country.TotalConfirmed,
                TotalDeaths: country.TotalDeaths,
                TotalRecovered: country.TotalRecovered,
              });
            })}
        </div>
      </div>

      <Bar
        data={{
          labels: Array.from(countries.keys()),

          datasets: [
            {
              label: "Total Confirmed",
              data: Array.from(countries.values()).map(
                (val) => val.TotalConfirmed
              ),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Deaths",
              data: Array.from(countries.values()).map(
                (val) => val.TotalDeaths
              ),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Recovered",
              data: Array.from(countries.values()).map(
                (val) => val.TotalRecovered
              ),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ], 
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
    </div>
  );
};

export default BarChart;
