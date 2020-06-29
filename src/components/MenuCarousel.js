import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "../App.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import responsive from "../images/responsive.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const styles = (theme) => ({
  responsive: {
    width: "90%",
    filter: "drop-shadow(10px 10px 10px rgba(0,0,0,0.6))",
  },
});
const propTypes = {};

class MenuCarousel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Carousel>
        <div>
          <img
            className={classes.responsive}
            src={responsive}
            alt="responsive"
          />
          {/*
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
                    */}
        </div>
        <div>
          <img
            className={classes.responsive}
            src={responsive}
            alt="responsive"
          />
          {/*
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
          */}
        </div>
        <div>
          <img
            className={classes.responsive}
            src={responsive}
            alt="responsive"
          />
          {/*
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
*/}
        </div>
      </Carousel>
    );
  }
}
MenuCarousel.propTypes = propTypes;

export default withStyles(styles)(MenuCarousel);
