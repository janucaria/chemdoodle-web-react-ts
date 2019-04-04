import React, { Component } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import ChemDoodle from '../modules/ChemDoodleWeb';
import spectreSample from '../assets/cnmr13';

import './Spectre.css'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // width: 500,
    },
    spectrePaper: {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
    },
    spectreContainer: {
      padding: "10px 0",
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
    },
    spectreCanvas: {
      flex: "1 1 auto",
      backgroundColor: "black"
    }
  });

interface Props extends WithStyles<typeof styles> {
  resizeCanvasSketcherToFalse(): void;
}

interface State {
}

class Spectre extends Component<Props, State> {
  
  cnmr = null as ChemDoodle.PerspectiveCanvas | null;
  hnmr = null as ChemDoodle.PerspectiveCanvas | null;

  updateDimensions = (event: UIEvent) => {
    {
      const canvasCnmr = this.refs.canvasCnmr as HTMLCanvasElement;
      const canvasContainer = canvasCnmr.parentElement as HTMLElement;

      canvasContainer.removeChild(canvasCnmr);

      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      canvasContainer.appendChild(canvasCnmr);

      this.cnmr!.resize(canvasWidth, canvasHeight);
    }
    {
      const canvasHnmr = this.refs.canvasCnmr as HTMLCanvasElement;
      const canvasContainer = canvasHnmr.parentElement as HTMLElement;

      canvasContainer.removeChild(canvasHnmr);

      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      canvasContainer.appendChild(canvasHnmr);

      this.hnmr!.resize(canvasWidth, canvasHeight);
    }

    this.props.resizeCanvasSketcherToFalse();
  }

  componentDidMount() {
    let spectrum = ChemDoodle.readJCAMP(spectreSample);
    {
      const canvasCnmr = this.refs.canvasCnmr as HTMLCanvasElement;
      const canvasContainer = canvasCnmr.parentElement as HTMLElement;
      const canvasId = canvasCnmr.id;
      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      let cnmr = new ChemDoodle.PerspectiveCanvas(canvasId, canvasWidth, canvasHeight);
      cnmr.emptyMessage = '\u00B9\u00B3C NMR';
      cnmr.specs.plots_showYAxis = false;
      cnmr.specs.plots_flipXAxis = true;
      cnmr.specs.plots_color = '#3000FF';
      cnmr.specs.text_font_size = 10;
      cnmr.specs.text_font_families[0] = "Times New Roman";
      cnmr.specs.text_font_families[1] = "Times";
      cnmr.specs.text_font_families[2] = 'serif';

      spectrum.minX = -10;
      spectrum.maxX = 200;
      spectrum.xUnit = '\u03B4';
      spectrum.title = '\u00B9\u00B3C NMR';

      cnmr.loadSpectrum(spectrum);
      this.cnmr = cnmr;
    }

    {
      const canvasHnmr = this.refs.canvasHnmr as HTMLCanvasElement;
      const canvasContainer = canvasHnmr.parentElement as HTMLElement;
      const canvasId = canvasHnmr.id;
      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      let hnmr = new ChemDoodle.PerspectiveCanvas(canvasId, canvasWidth, canvasHeight);
      hnmr.emptyMessage = '\u00B9H NMR';
      hnmr.specs.plots_showYAxis = false;
      hnmr.specs.plots_flipXAxis = true;
      hnmr.specs.plots_showIntegration = true;
      hnmr.specs.text_font_families[0] = "Times New Roman";
      hnmr.specs.text_font_families[1] = "Times";
      hnmr.specs.text_font_families[2] = 'serif';

      spectrum.minX = -10;
      spectrum.maxX = 200;
      spectrum.xUnit = '\u03B4';
      spectrum.title = '\u00B9H NMR';

      hnmr.loadSpectrum(spectrum);
      this.hnmr = hnmr;
    }

    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.spectrePaper} elevation={1}>
        <div className={classes.spectreContainer}>
          <canvas ref="canvasCnmr" id="canvas-cnmr"></canvas>
        </div>
        <div className={classes.spectreContainer}>
          <canvas ref="canvasHnmr" id="canvas-hnmr"></canvas>
        </div>
      </Paper>
    )
  }
}


export default withStyles(styles)(Spectre);