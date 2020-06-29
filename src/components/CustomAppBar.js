import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import "../App.css";

const styles = (theme) => ({
  logo: {
    fontFamily: "'Baloo Tamma 2', cursive",
  },
});
const propTypes = {};

class CustomAppBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar
        //position="static"
        style={{
          background: "transparent",
          boxShadow: "none",
          position: "absolute",
        }}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h4"
            color="primary"
            className={classes.logo}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <b>typee</b>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
CustomAppBar.propTypes = propTypes;

export default withStyles(styles)(CustomAppBar);
