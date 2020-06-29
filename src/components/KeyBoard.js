import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import "../App.css";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const propTypes = {
  changePause: PropTypes.func,
};

class KeyBoard extends Component {
  handleKeyClick(value) {
    this.props.keyPressed(value);
  }

  /*
  down = function () {
    document.body.style.background = "red";
  };

  up = function () {
    document.body.style.backgroundColor = "";
  };
  */

  componentDidMount() {
    /*
    const keys = document.getElementsByClassName("button");

    [...keys].forEach((key) => {
      key.addEventListener("touchstart", (e) => {
        this.handleKeyClick(key.textContent);
      });
    });
    */
  }
  render() {
    const { rows } = this.props;

    return (
      <div>
        <br />
        {rows.map((characters) => (
          <div key={characters}>
            <br />
            {characters.map((value) => (
              <ButtonBase
                key={value}
                className="button"
                //centerRipple="true"
                disableRipple={true}
                onClick={this.handleKeyClick.bind(this, value)}
                style={{
                  borderRadius: 4,
                }}
              >
                {value}
              </ButtonBase>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
KeyBoard.propTypes = propTypes;
export default KeyBoard;
