import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import { Badge } from "reactstrap";
import CountUp from "react-countup";
import cx from "classnames";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Cards = ({
  data: { confirmed, recovered, deaths, lastUpdate },
  change: { confirmedChange, recoveredChange, deathsChange },
}) => {
  if (!confirmed) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Badge pill color="success" className="fs--2">
              <FontAwesomeIcon icon={faCaretUp} className="mr-1" />
              <Typography variant="body3">{confirmedChange}%</Typography>
            </Badge>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Badge pill color="success" className="fs--2">
              <FontAwesomeIcon icon={faCaretUp} className="mr-1" />
              <Typography variant="body3">{recoveredChange}%</Typography>
            </Badge>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Badge pill color="success" className="fs--2">
              <FontAwesomeIcon icon={faCaretUp} className="mr-1" />
              <Typography variant="body3">{deathsChange}%</Typography>
            </Badge>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
