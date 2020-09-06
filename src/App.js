import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { UncontrolledTooltip } from "reactstrap";
import {
  fetchData,
  fetchTopThreeCountires,
  fetchPriceChange,
  fetchTotalValue,
} from "./api";
import coronaImage from "./images/covid-19.png";
import CardSummary from "./components/CardSummary/CardSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import MapExample from "./components/Map/EChartMap";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    hotSpots: [],
    totalData: null,
    change: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchHotspots = await fetchTopThreeCountires();
    const fetchChange = await fetchPriceChange();
    const total = await fetchTotalValue();

    this.setState({
      data: fetchedData,
      hotSpots: fetchHotspots,
      totalData: total,
      change: fetchChange,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    // fetch the data
    // set the state
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country, hotSpots, totalData, change } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} change={change} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />

        <Chart data={data} country={country} />
        <div className={styles.summaryContainer}>
          <h6 className=" mt-4 mb-3 font-weight-bold text-sans-serif">
            Hotspots In the US{" "}
            <span role="img" aria-label="fire emoji">
              🔥
            </span>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="ml-2 cursor-pointer"
              id="tooltipCVV"
            />
            <UncontrolledTooltip placement="right" target="tooltipCVV">
              These percentages are found by dividing the city infections with
              your countries total
            </UncontrolledTooltip>
          </h6>
          <div className={styles.CardSummaryContainer}>
            {hotSpots[0] && (
              <CardSummary
                total={totalData}
                hotSpot={hotSpots[0]}
                color="warning"
              />
            )}
            {hotSpots[1] && (
              <CardSummary
                total={totalData}
                hotSpot={hotSpots[1]}
                color="info"
              />
            )}
            {hotSpots[2] && (
              <CardSummary
                total={totalData}
                hotSpot={hotSpots[2]}
                color="success"
              />
            )}
          </div>
        </div>
        <div className={`${styles.container} mt-4`}>
          <MapExample />
        </div>
      </div>
    );
  }
}

export default App;
