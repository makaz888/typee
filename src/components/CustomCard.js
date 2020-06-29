import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "../App.css";
import Dialog from "@material-ui/core/Dialog";
import Carousel from "react-bootstrap/Carousel";
import responsive from "../images/responsive.png";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/lab/Rating";

const styles = (theme) => ({
  card: {
    marginLeft: 10,
    marginRight: 10,

    marginTop: 10,
    marginBottom: 10,

    borderRadius: 8,
  },
  actionArea: {
    display: "flex",
    justifyContent: "flex-start",
  },
  details: {
    //display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    //flex: "1 0 auto",
    paddingLeft: 5,
    paddingTop: 10,
    paddingRight: 5,
    "&:last-child": {
      paddingBottom: 5,
    },
  },
  cardMedia: {
    minWidth: 100,
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 8,
  },
  rating: {
    marginLeft: -2,
  },
  ratingDiv: {
    display: "flex",
    //alignItems: "center",
  },
  ratingText: {
    marginLeft: 10,
  },
});
const propTypes = {};
const difficultyLabels = {
  1: "Very Easy",
  2: "Easy",
  3: "Normal",
  4: "Hard",
  5: "Very Hard",
};

class CustomCard extends Component {
  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  render() {
    const { classes, id, image, title, channel, difficulty, date } = this.props;
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return (
      <Card className={classes.card}>
        <CardActionArea
          className={classes.actionArea}
          component={Link}
          to={`/main/${id}`}
        >
          <CardMedia
            className={classes.cardMedia}
            image={image}
            title={title}
          />
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography component="h4" variant="subtitle2">
                {title}
              </Typography>
              <Typography
                component="h5"
                variant="caption"
                color="textSecondary"
                display="block"
              >
                {channel}
              </Typography>
              <div className={classes.ratingDiv}>
                <Rating
                  className={classes.rating}
                  name="read-only"
                  value={difficulty}
                  readOnly
                  size="small"
                />
                <Typography
                  component="h5"
                  className={classes.ratingText}
                  variant="caption"
                  color="textSecondary"
                  //display="block"
                >
                  {difficultyLabels[difficulty]}
                </Typography>
              </div>
              <Typography
                component="h5"
                variant="caption"
                color="textSecondary"
                display="block"
              >
                Added on
                {" " +
                  new Date(date).getDate() +
                  " " +
                  months[new Date(date).getMonth()] +
                  " " +
                  new Date(date).getFullYear()}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
  }
}
CustomCard.propTypes = propTypes;

export default withStyles(styles)(CustomCard);
