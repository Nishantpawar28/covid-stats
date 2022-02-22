import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({
  covidDataForPieChart,
  countriesCheckedForPieChart,
  countriesPerPageForPieChart,
}) => {
  const countries = new Map();

  return (
    <div>
      <div>
        <div>
          {covidDataForPieChart
            .slice(
              countriesCheckedForPieChart,
              countriesCheckedForPieChart + countriesPerPageForPieChart
            )
            .map((country) => {
              countries.set(country.Country, {
                TotalConfirmed: country.TotalConfirmed,
                TotalDeaths: country.TotalDeaths,
                TotalRecovered:
                  country.TotalRecovered === 0
                    ? country.TotalConfirmed - country.TotalDeaths
                    : country.TotalRecovered,
              });
            })}
        </div>
      </div>

      {/* {[...countries.keys()][0]} */}

      <Pie
        data={{
          labels: ["Total Confirmed", "Total Deaths", "Total Recovered"],
          datasets: [
            {
              label: Array.from(countries.keys()),
              data: Array.from(countries.values())
                .map((val) => Object.values(val))
                .flat(),

              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
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

export default PieChart;
