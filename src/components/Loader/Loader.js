import React from "react";
import { Col, Row, Spinner } from "reactstrap";

const Loader = (props) => {
  return (
    <Row className="flex-center py-5">
      <Col xs="auto">
        <Spinner {...props} />
      </Col>
    </Row>
  );
};

Loader.propTypes = { ...Spinner.propTypes };

export default Loader;
