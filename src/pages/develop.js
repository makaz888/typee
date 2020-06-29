import React, { Component, Fragment } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import keystroke from "../sounds/keystroke.mp3";
import wrong from "../sounds/wrong.mp3";
import YouTube from "react-youtube";
import KeyBoard from "../components/KeyBoard";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import videoInfos from "../videoInfo";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  video: {
    height: "50%",
  },
});

class develop extends Component {
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
    xml: "",
  };

  videoInfo = {
    title: null,
    channel: null,
    videoId: null,

    startTime: null,
    endTime: null,
    subtitle: null,
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.videoInfo = videoInfos.find((object) => {
      return object.videoId === "qp0HIF3SfI4";
    });

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    if (
      this.state.pause &&
      ((e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 65 && e.keyCode <= 90))
    ) {
      this.keyPressed(e.key);
    }
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

  checkSubtitle(currentTime) {
    if (this.state.currentSubtitle >= this.videoInfo.subtitle.length) {
      return;
    }
    var startTime = this.videoInfo.subtitle[this.state.currentSubtitle][0] * 10;
    var endTime = this.videoInfo.subtitle[this.state.currentSubtitle][1] * 10;
    var type = this.videoInfo.subtitle[this.state.currentSubtitle][3];

    if (!this.state.messageShown) {
      if (currentTime >= startTime) {
        if (type === 0) {
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
        }
      }
    } else {
      if (currentTime >= endTime) {
        if (type === 0) {
          this.setState({
            message: "",
            messageShown: false,
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
      this.props.history.push("/");
    }
  };

  restart = () => {
    this.state.event.target.seekTo(
      this.videoInfo.subtitle[this.state.currentSubtitle][0]
    );
    //this.state.message = this.videoInfo.subtitle[this.state.currentSubtitle][2]; //時間差で＋１されないようsetStateの前
    this.setState({
      pause: false,
      message: this.videoInfo.subtitle[this.state.currentSubtitle][2],
      characterNum: 0,
      enteredMessage: "",
    });
    this.state.currentSubtitle += 1;
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

  handleChange = (event) => {
    //http://video.google.com/timedtext?hl=lang_code=&lang=lang_code=&name=&v=cSqi-8kAMmM
    const xml = event.target.value;
    console.log(xml);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const text = doc.querySelectorAll("text");
    var text2 = "";
    text.forEach((a) => {
      text2 +=
        "[" +
        Math.round(a.getAttribute("start") * 10) / 10 +
        ", " +
        Math.round(a.getAttribute("start") * 10 + a.getAttribute("dur") * 10) /
          10 +
        ", " +
        '"' +
        a.textContent +
        '",0],<br>';
      console.log(text2);
    });
    this.setState({
      xml: text2,
    });
  };

  render() {
    const { classes } = this.props;
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
        <header className="App-header">
          <div className={classes.video}>
            <div className={this.state.wrapClass}>
              {this.state.playable ? (
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
              ) : (
                <Fragment />
              )}

              <div className="text">
                <h4 className="h4">
                  {this.state.pause ? (
                    <Fragment>
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
                      <div>
                        <span className="enteredMessage">
                          {this.state.enteredMessage}
                        </span>
                        <span className="cursor">|</span>
                      </div>
                    </Fragment>
                  ) : (
                    <span className="message">{this.state.message}</span>
                  )}
                </h4>
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
          </div>
          <TextField
            className="originalXML"
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax={4}
            //value="XML here"
            onChange={this.handleChange}
            fullWidth
          />
          <div dangerouslySetInnerHTML={{ __html: this.state.xml }} />
        </header>
        <audio className="sound">
          <source src={keystroke}></source>
        </audio>
        <audio className="soundWrong">
          <source src={wrong}></source>
        </audio>
      </div>
    );
  }
}

export default withStyles(styles)(develop);
