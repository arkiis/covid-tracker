import React from "react";
import PropTypes from "prop-types";
import Background from "../Common/Background";
import { numberWithCommas } from "../../helpers/utils";
import { Card, CardBody } from "reactstrap";
import { rgbaColor, themeColors } from "../../helpers/utils";
import { Circle } from "react-es6-progressbar.js";

// import Background from "../common/Background";
import corner1 from "../../assets/img/illustrations/corner-1.png";
import corner2 from "../../assets/img/illustrations/corner-2.png";
import corner3 from "../../assets/img/illustrations/corner-3.png";
import Loader from "../Loader/Loader";

const getImage = (color) => {
  switch (color) {
    case "warning":
      return corner1;
    case "info":
      return corner2;
    case "success":
      return corner3;
    default:
      return corner1;
  }
};

const cityAndState = (city, state) => {
  if (city && state) {
    return `${city}, ${state}`;
  }
  return city;
};
const getContentClassNames = (color) => {
  const contentClassNames =
    "display-5 fs-4 mb-2 font-weight-bold text-sans-serif";
  if (color === "success") return contentClassNames;
  return `${contentClassNames}`;
};

const CardSummary = ({ color, hotSpot, total }) => {
  if (!hotSpot) {
    return <Loader />;
  }

  const options = {
    color: themeColors[color],
    progress: hotSpot.confirmed / total,
    strokeWidth: 5,
    trailWidth: 5,
    trailColor: rgbaColor("#000", 0.15),
    easing: "easeInOut",
    duration: 3000,
    svgStyle: {
      "stroke-linecap": "round",
      display: "block",
      width: "100%",
    },
    text: { autoStyleContainer: false },
    step: (state, circle) => {
      const percentage = Math.round(circle.value() * 100);
      circle.setText(`<span class='value'>${percentage}<b>%</b></span>`);
    },
  };

  return (
    <Card
      className="mr-3 mb-3 full overflow-hidden cx(styles.card, styles.infected)"
      style={{ minWidth: "12rem" }}
    >
      <Background image={getImage(color)} className="bg-card" />

      <CardBody>
        <div className="mb-3 d-flex justify-content-center">
          <Circle
            progress={hotSpot.confirmed / total}
            options={options}
            container_class="progress-circle progress-circle-dashboard"
            container_style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div>
          <h6 className={getContentClassNames()}>
            {cityAndState(hotSpot.countryRegion, hotSpot.provinceState)}
          </h6>
          <div>
            <span>Infected: {numberWithCommas(hotSpot.confirmed)}</span>
            <br />
            <span>Recovered: {numberWithCommas(hotSpot.recovered)}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
CardSummary.propTypes = {
  color: PropTypes.string,
  hotSpot: PropTypes.object,
  total: PropTypes.string,
  //make rate required
};

CardSummary.defaultProps = {
  color: "primary",
};

export default CardSummary;
