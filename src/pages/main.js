import React, { Component, Fragment } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import soundCorrect from "../sounds/keystroke.mp3";
import soundWrong from "../sounds/wrong.mp3";
import YouTube from "react-youtube";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import videoInfos from "../videoInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";

import { Link } from "react-router-dom";

//component
import KeyBoard from "../components/KeyBoard";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import GameOverDialog from "../components/GameOverDialog";

class App extends Component {
  state = {
    event: null,
    stage: 0,
    pause: false,
    playable: false,
    message: "",
    question: "",
    currentSubtitle: 0,
    messageShown: false,
    characterNum: 0,
    enteredMessage: "",
    wrapClass: "wrap-video-dark",
    entered: false,
    life: 20,
    open: false,
    gameOverType: "Failed",
    openDialog: false,
  };

  videoInfo = {
    title: null,
    channel: null,
    videoId: null,

    startTime: null,
    endTime: null,
    subtitle: null,
  };

  //スクロール禁止
  handleTouchMove(event) {
    event.preventDefault();
  }

  handleKeyDown(e) {
    if (this.state.pause && e.keyCode >= 65 && e.keyCode <= 90) {
      this.keyPressed(e.key);
    }
    if (this.state.pause && e.keyCode >= 48 && e.keyCode <= 57) {
      this.setState({
        open: true,
      });
    }
  }

  keyPressed = (value) => {
    const words = this.state.question;
    var enteredMessage = this.state.enteredMessage;

    if (words[this.state.characterNum].toUpperCase() === value.toUpperCase()) {
      const audioEl = document.getElementsByClassName("sound")[0];
      audioEl.load();
      audioEl.play();
      //this.playSound(soundCorrect);

      enteredMessage += words[this.state.characterNum];
      this.state.characterNum += 1;
      while (/[!"'\.,?\- ]/.test(words[this.state.characterNum])) {
        enteredMessage += words[this.state.characterNum];

        this.state.characterNum += 1;
      }
      this.setState({
        enteredMessage: enteredMessage,
      });
      if (this.state.characterNum === words.length) {
        this.restart();
      }
    } else {
      const audioEl = document.getElementsByClassName("soundWrong")[0];
      audioEl.load();
      audioEl.play();
      //this.playSound(soundWrong);
      var life = this.state.life;
      life -= 1;
      this.setState({ life: life });
      if (life <= 0) {
        console.log("MMM");
        this.setState({
          gameOverType: "Failed",
          openDialog: true,
        });
      }
    }
  };

  isMobile() {
    var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return window.navigator.userAgent.search(regexp) !== -1;
  }

  Transition(props) {
    return <Slide {...props} direction="down" />;
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.videoInfo = videoInfos.find((object) => {
      return object.videoId === params.id;
    });

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    if (this.isMobile()) {
      document.documentElement.style.height = window.outerHeight + "px";
    }
    document.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });
  }
  componentWillUnmount() {
    document.removeEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    });
  }

  loop() {
    if (!this.state.pause) {
      if (
        this.state.event.target.getPlayerState() === YouTube.PlayerState.PLAYING
      ) {
        var currentTime = Math.round(
          this.state.event.target.getCurrentTime() * 10
        );

        this.checkSubtitle(currentTime);
      }
      setTimeout(() => {
        this.loop();
      }, 100);
    }
  }

  /*
  playSound(sound) {
    var context = new AudioContext();
    var buffer = null;
    var source = context.createBufferSource();

    var request = new XMLHttpRequest();
    request.open("GET", sound, true);
    request.responseType = "arraybuffer";
    request.send();

    request.onload = function () {
      var res = request.response;
      context.decodeAudioData(res, function (buf) {
        source.buffer = buf;
      });
    };

    source.connect(context.destination);
    source.start(0);
  }
  */

  volumeUp() {
    this.state.event.target.setVolume(this.state.event.target.getVolume() + 10);
    console.log(this.state.event.target.getVolume());
    if (this.state.event.target.getVolume() < 100) {
      setTimeout(() => {
        this.volumeUp();
      }, 100);
    }
  }

  volumeDown() {
    this.state.event.target.setVolume(this.state.event.target.getVolume() - 10);
    if (this.state.event.target.getVolume() > 0) {
      setTimeout(() => {
        this.volumeDown();
      }, 100);
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  checkSubtitle(currentTime) {
    if (this.state.currentSubtitle >= this.videoInfo.subtitle.length) {
      return;
    }
    var startTime = this.videoInfo.subtitle[this.state.currentSubtitle][0] * 10;
    var endTime = this.videoInfo.subtitle[this.state.currentSubtitle][1] * 10;
    var type = this.videoInfo.subtitle[this.state.currentSubtitle][3];

    if (!this.state.messageShown) {
      if (currentTime >= startTime) {
        if (type === 0 || (type === 1 && this.state.entered === true)) {
          this.setState({
            message: this.videoInfo.subtitle[this.state.currentSubtitle][2],
            messageShown: true,
          });
        } else if (type === 1) {
          this.setState({
            message: "??????????",
            messageShown: true,
          });
        } else if (type === 2) {
          setTimeout(() => {
            this.state.event.target.seekTo(
              this.videoInfo.subtitle[this.state.currentSubtitle][1]
            );
            this.setState({
              message: "",
              messageShown: false,
              wrapClass: "wrap-video",
            });
            this.volumeUp();
          }, 3000);
          this.setState({
            message: "",
            messageShown: false,
            wrapClass: "wrap-video-dark",
          });
          this.state.currentSubtitle += 1;
          this.checkSubtitle(currentTime);
          this.volumeDown();
        } else if (type === 3) {
          this.setState({
            message: "",
            messageShown: false,
            wrapClass: "wrap-video-dark",
          });
          this.volumeDown();
        }
      }
    } else {
      if (currentTime >= endTime) {
        if (type === 0 || (type === 1 && this.state.entered === true)) {
          this.setState({
            message: "",
            messageShown: false,
            entered: false,
          });
          this.state.currentSubtitle += 1;
          this.checkSubtitle(currentTime);
        } else if (type === 1) {
          if (this.state.pause === false) {
            this.state.event.target.pauseVideo();
            this.state.question = this.videoInfo.subtitle[
              this.state.currentSubtitle
            ][2];
            this.setState({
              pause: true,
            });
          }
        }
      }
    }
  }
  _onReady = (event) => {
    event.target.pauseVideo();
    this.setState({
      event: event,
      playable: true,
    });
  };

  _onStateChange = (event) => {
    if (event.data == 0) {
      // Game Cleared
      //this.props.history.push("/");
      this.setState({
        gameOverType: "Congratulations!",
        openDialog: true,
      });
    }
  };

  restart = () => {
    this.state.event.target.seekTo(
      this.videoInfo.subtitle[this.state.currentSubtitle][0]
    );
    this.setState({
      pause: false,
      message: this.videoInfo.subtitle[this.state.currentSubtitle][2],
      characterNum: 0,
      enteredMessage: "",
      life: 20,
    });
    this.state.entered = true;
    //this.state.currentSubtitle += 1;
    this.state.event.target.playVideo();
    this.state.pause = false; //setStateでは時間差があるため必要
    this.state.messageShown = false;
    this.loop();
  };

  handlePlayButtonClick = () => {
    if (
      this.state.event.target.getPlayerState() != YouTube.PlayerState.PLAYING
    ) {
      this.loop();
      this.state.event.target.playVideo();
      this.setState({
        playable: false,
        wrapClass: "wrap-video",
      });
    }
  };
  handleReplayButtonClick = () => {
    this.state.event.target.seekTo(
      this.videoInfo.subtitle[this.state.currentSubtitle][0]
    );
    this.state.event.target.playVideo();
    this.setState({
      pause: false,
      //message: this.videoInfo.subtitle[this.state.currentSubtitle][2],
    });
    this.state.pause = false; //setStateでは時間差があるため必要
    this.state.messageShown = false;
    this.loop();
  };

  render() {
    const opts = {
      height: window.innerHeight * 1.5,
      width: window.innerWidth * 5,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        //autoplay: 1,
        controls: 0,
        cc_load_policy: 3,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        start: this.videoInfo.startTime,
        end: this.videoInfo.endTime,
      },
    };

    return (
      <div className="App">
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          TransitionComponent={this.Transition}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message="Use Alphabets"
        />
        <header className="App-header">
          <div className={this.state.wrapClass}>
            {this.state.playable ? (
              <div className="startScreen">
                <div className="playButtonDiv">
                  <Fab
                    className="playButton"
                    color="secondary"
                    aria-label="play"
                    onClick={this.handlePlayButtonClick}
                  >
                    <PlayArrowIcon fontSize="large" />
                  </Fab>
                </div>
                <div className="volumeUpIconAndCaption">
                  <div className="volumeUpIcon">
                    <VolumeUpIcon />
                  </div>
                  <Typography
                    className="soundOn"
                    variant="caption"
                    component="div"
                  >
                    Sound On!
                  </Typography>
                </div>
              </div>
            ) : (
              <Fragment />
            )}

            {this.state.pause ? (
              <Fragment>
                <div className="lifeAndReplay">
                  <div>
                    <CircularProgressWithLabel value={this.state.life} />
                  </div>
                  <div>
                    <Fab
                      className="replayButton"
                      color="secondary"
                      aria-label="replay"
                      onClick={this.handleReplayButtonClick}
                    >
                      <ReplayIcon fontSize="large" />
                    </Fab>
                  </div>
                </div>
                <div className="text">
                  <div>
                    <h4 className="h4">
                      <span className="enteredMessage">
                        {this.state.enteredMessage}
                      </span>
                      <span className="cursor">|</span>
                    </h4>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="text">
                <h4 className="h4">
                  <span className="message">{this.state.message}</span>
                </h4>
              </div>
            )}

            <div className="buttons">
              {this.state.pause ? (
                <KeyBoard
                  //youtube={this.state.event}
                  //restart={this.restart}
                  keyPressed={this.keyPressed}
                  //question={this.state.question}
                  rows={[
                    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                    ["Z", "X", "C", "V", "B", "N", "M"],
                  ]}
                />
              ) : (
                <Fragment />
              )}
            </div>

            <div className="video">
              <YouTube
                className="youtube"
                videoId={this.videoInfo.videoId}
                opts={opts}
                onReady={this._onReady}
                onStateChange={this._onStateChange}
              />
            </div>
          </div>
        </header>
        <GameOverDialog
          openDialog={this.state.openDialog}
          type={this.state.gameOverType}
          videoId={this.videoInfo.videoId}
        />

        <audio className="sound">
          <source src={soundCorrect}></source>
        </audio>
        <audio className="soundWrong">
          <source src={soundWrong}></source>
        </audio>
      </div>
    );
  }
}

export default App;
