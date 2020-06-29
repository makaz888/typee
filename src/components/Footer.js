import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "../App.css";
import IconButton from "@material-ui/core/IconButton";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const styles = (theme) => ({
  credit: {
    color: "rgba(0, 0, 0, 0.5)",
    paddingTop: 10,
    paddingBottom: 20,
    textAlign: "center",
  },
});
const propTypes = {};

class Footer extends Component {
  converter(M) {
    var str = "",
      str_as = "";
    for (var i = 0; i < M.length; i++) {
      str_as = M.charCodeAt(i);
      str += String.fromCharCode(str_as + 1);
    }
    return str;
  }

  mail_to(k_1, k_2) {
    eval(
      String.fromCharCode(
        108,
        111,
        99,
        97,
        116,
        105,
        111,
        110,
        46,
        104,
        114,
        101,
        102,
        32,
        61,
        32,
        39,
        109,
        97,
        105,
        108,
        116,
        111,
        58
      ) +
        escape(k_1) +
        this.converter(
          String.fromCharCode(
            100,
            108,
            96,
            104,
            107,
            45,
            115,
            120,
            111,
            100,
            100,
            45,
            98,
            98,
            63,
            102,
            108,
            96,
            104,
            107,
            45,
            98,
            110,
            108,
            62,
            114,
            116,
            97,
            105,
            100,
            98,
            115,
            60
          )
        ) +
        escape(k_2) +
        "'"
    );
  }

  handleEmailClick = () => {
    this.mail_to("", "");
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.credit}>
        Copyright © typee {new Date().getFullYear()}.
        <IconButton
          className={classes.mail}
          aria-label="email"
          onClick={this.handleEmailClick}
        >
          <MailOutlineIcon />
          {/*<a href={this.mail_to("", "")}>qqq</a>*/}
        </IconButton>
      </div>
    );
  }
}
Footer.propTypes = propTypes;

export default withStyles(styles)(Footer);
