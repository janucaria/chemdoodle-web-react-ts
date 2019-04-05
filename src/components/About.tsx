import React, { Component } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    aboutPaper: {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
      padding: "10px"
    }
  });

interface Props extends WithStyles<typeof styles> {
  resizeCanvasSketcherToFalse(): void;
}

interface State {
}

class About extends Component<Props, State> {

  updateDimensions = (event: UIEvent) => {
    this.props.resizeCanvasSketcherToFalse();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.aboutPaper} elevation={1}>
        <p>This app just for demo building UI for <a target="_blank" href="https://web.chemdoodle.com/">Chemdoodle Web Component</a> with <a target="_blank" href="https://reactjs.org/">React JS</a> and <a target="_blank" href="https://material-ui.com/">Material-UI</a></p>
        <p>This app basically not working because it not access the <a target="_blank" href="https://web.chemdoodle.com/docs/ichemlabs-cloud-services/">iChemLabs Cloud Services</a> for related molecule data.<i></i></p>
        <p>The source code can found in <a target="_blank" href="https://github.com/janucaria/chemdoodle-web-react-ts">https://github.com/janucaria/chemdoodle-web-react-ts</a></p>
      </Paper>
    )
  }
}


export default withStyles(styles)(About);