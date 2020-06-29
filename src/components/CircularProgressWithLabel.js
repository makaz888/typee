import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import "../App.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const propTypes = {};

class CircularProgressWithLabel extends Component {
  render() {
    const { value } = this.props;

    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          size={120}
          thickness={1.8}
          value={-value * 5}
          style={{
            color: "#ff6d75",
          }}
        />

        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "#ff6d75",
              }}
            >
              Life
            </Typography>

            <Typography
              component="div"
              variant="h5"
              style={{
                color: "white",
              }}
            >{`${value}`}</Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}
CircularProgressWithLabel.propTypes = propTypes;
export default CircularProgressWithLabel;
