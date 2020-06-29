import React, { Component, Fragment } from "react";
import "../App.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import phone from "../images/phone2.png";
import responsive from "../images/responsive.png";
import { HashLink } from "react-router-hash-link";
//Component
import Footer from "../components/Footer";
import VideoList from "../components/VideoList";
import CustomAppBar from "../components/CustomAppBar";

const styles = (theme) => ({
  textCenter: {
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(2, 0, 1),
    fontSize: "20px",
    fontFamily: "Comfortaa, cursive",
    maxWidth: 320,
  },

  catchcopy: {
    //filter: 'none',

    width: "60%",
    marginTop: 170,
    marginLeft: "auto",
    marginRight: "auto",
  },

  secondDiv: {
    marginTop: 30,
    background: theme.palette.primary.main,
  },
  buttons: {
    marginTop: 50,
  },
  image: {
    marginTop: 80,
    marginBottom: 80,
  },
  phone: {
    width: "60%",
    filter: "drop-shadow(10px 10px 10px rgba(0,0,0,0.6))",
    maxWidth: 320,
  },
  responsive: {
    width: "90%",
    filter: "drop-shadow(10px 10px 10px rgba(0,0,0,0.6))",
  },

  headline: {
    fontFamily: "Comfortaa, cursive",
  },
  subHeadline: {
    marginTop: 20,
    //color: theme.palette.primary.light,
    //fontFamily: "Comfortaa, cursive",
    color: "rgba(0, 0, 0, 0.6)",
  },
  newlyAdded: {
    //color: theme.palette.primary.main,
    //fontFamily: "Comfortaa, cursive",
    marginLeft: 10,
    color: "rgba(0, 0, 0, 0.6)",
  },
  noSignUp: {
    //fontFamily: "Comfortaa, cursive",
    color: "rgba(0, 0, 0, 0.6)",
    paddingTop: 10,
  },

  mail: {
    marginLeft: 20,
    marginBottom: 5,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

class menu extends Component {
  handleMenuClick = () => {
    this.props.history.push("/landing");
  };

  isMobile() {
    var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    console.log(window.navigator.userAgent);
    console.log("QQQ");
    return window.navigator.userAgent.search(regexp) !== -1;
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <CustomAppBar />

        <div className={classes.textCenter}>
          <div className={classes.catchcopy}>
            <div className={classes.verticalMiddle}>
              <Typography
                component="h1"
                variant="h4"
                color="primary"
                className={classes.headline}
              >
                <b>Fun Way to Learn English</b>
              </Typography>

              <Typography
                component="h2"
                variant="h6"
                className={classes.subHeadline}
              >
                Improve your listening skills with YouTube videos.
              </Typography>
            </div>

            <div className={classes.buttons}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                component={HashLink}
                smooth
                to="#newlyAdded"
              >
                Play Now!
              </Button>

              <Typography
                component="h3"
                variant="subtitle1"
                className={classes.noSignUp}
              >
                No Sign-up Required
              </Typography>
            </div>
          </div>

          <div className={classes.image}>
            {this.isMobile() ? (
              <img className={classes.phone} src={phone} alt="phone" />
            ) : (
              <img
                className={classes.responsive}
                src={responsive}
                alt="responsive"
              />
            )}
          </div>

          <br />
        </div>

        <Typography
          id="newlyAdded"
          component="h3"
          variant="h6"
          className={classes.newlyAdded}
        >
          Newly Added
        </Typography>

        <VideoList />
        <Footer />
      </>
    );
  }
}

//export default menu;
export default withStyles(styles)(menu);