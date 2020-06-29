import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "../App.css";
import videoInfo from "../videoInfo";
import Grid from "@material-ui/core/Grid";

import CustomCard from "../components/CustomCard";

const styles = (theme) => ({
  container2: {
    marginTop: 20,
  },
});
const propTypes = {};

class VideoList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container2}>
        <Grid container>
          {videoInfo.map((info) => (
            <Grid key={info.videoId} item xs={12} sm={12} md={6}>
              <CustomCard
                //classes={classes}
                id={info.videoId}
                title={info.title}
                channel={info.channel}
                difficulty={info.difficulty}
                image={`https://img.youtube.com/vi/${info.videoId}/mqdefault.jpg`}
                date={info.date}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
VideoList.propTypes = propTypes;

export default withStyles(styles)(VideoList);
