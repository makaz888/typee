import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import "../App.css";
import Dialog from "@material-ui/core/Dialog";
import Carousel from "react-bootstrap/Carousel";
import responsive from "../images/responsive.png";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

const styles = (theme) => ({
  title: {
    width: "60%",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  headline: {
    fontFamily: "Comfortaa, cursive",
  },
  subHeadline: {
    marginTop: 20,
    color: "rgba(0, 0, 0, 0.5)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    margin: theme.spacing(2, 0, 1),
    fontSize: "20px",
    fontFamily: "Comfortaa, cursive",
  },
});
const propTypes = {};

class GameOverDialog extends Component {
  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  handleClick = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, openDialog, type, videoId } = this.props;
    return (
      <Dialog
        fullScreen
        open={openDialog}
        //onClose={handleClose}
        TransitionComponent={this.Transition}
      >
        <Avatar className={classes.avatar}>
          <NotificationsNoneIcon />
        </Avatar>
        <div className={classes.title}>
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            className={classes.headline}
          >
            {type}
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            className={classes.subHeadline}
          >
            Original Video
          </Typography>
          <div>https://www.youtube.com/watch?v={videoId}</div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}
          >
            Go Back
          </Button>
        </div>
      </Dialog>
    );
  }
}
GameOverDialog.propTypes = propTypes;

export default withRouter(withStyles(styles)(GameOverDialog));
