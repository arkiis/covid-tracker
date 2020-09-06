import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Background = ({ image, style }) => {
  const bgStyle = { backgroundImage: `url(${image})`, ...style };

  return <div className={classNames("bg-holder")} style={bgStyle}></div>;
};

Background.propTypes = {
  image: PropTypes.string.isRequired,

  style: PropTypes.object,
};

export default Background;
