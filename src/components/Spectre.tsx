import React, { useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import ChemDoodle from '../modules/ChemDoodleWeb';
import spectreSample from '../assets/cnmr13';

import './Spectre.css'

const useStyles = makeStyles((theme: Theme) =>
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
  }));

interface Props {
  resizeCanvasSketcherToFalse(): void;
}

export default function Spectre(props: Props): JSX.Element {
  const classes = useStyles();
  let canvasCnmrEl = useRef(null as HTMLCanvasElement | null);
  let canvasHnmrEl = useRef(null as HTMLCanvasElement | null);

  useEffect(() => {
    let cnmr = null as ChemDoodle.PerspectiveCanvas | null;
    let hnmr = null as ChemDoodle.PerspectiveCanvas | null;

    let spectrum = ChemDoodle.readJCAMP(spectreSample);
    {
      const canvasCnmr = canvasCnmrEl.current as HTMLCanvasElement;
      const canvasContainer = canvasCnmr.parentElement as HTMLElement;
      const canvasId = canvasCnmr.id;
      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      cnmr = new ChemDoodle.PerspectiveCanvas(canvasId, canvasWidth, canvasHeight);
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
    }

    {
      const canvasHnmr = canvasHnmrEl.current as HTMLCanvasElement;
      const canvasContainer = canvasHnmr.parentElement as HTMLElement;
      const canvasId = canvasHnmr.id;
      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      hnmr = new ChemDoodle.PerspectiveCanvas(canvasId, canvasWidth, canvasHeight);
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
    }

    const updateDimensions = (event: UIEvent) => {
      {
        const canvasCnmr = canvasCnmrEl.current as HTMLCanvasElement;
        const canvasContainer = canvasCnmr.parentElement as HTMLElement;

        canvasContainer.removeChild(canvasCnmr);

        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;

        canvasContainer.appendChild(canvasCnmr);

        cnmr!.resize(canvasWidth, canvasHeight);
      }
      {
        const canvasHnmr = canvasCnmrEl.current as HTMLCanvasElement;
        const canvasContainer = canvasHnmr.parentElement as HTMLElement;

        canvasContainer.removeChild(canvasHnmr);

        const canvasWidth = canvasContainer.clientWidth;
        const canvasHeight = canvasContainer.clientHeight;

        canvasContainer.appendChild(canvasHnmr);

        hnmr!.resize(canvasWidth, canvasHeight);
      }

      props.resizeCanvasSketcherToFalse();
    };

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
    
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.spectrePaper} elevation={1}>
      <div className={classes.spectreContainer}>
        <canvas ref={canvasCnmrEl} id="canvas-cnmr"></canvas>
      </div>
      <div className={classes.spectreContainer}>
        <canvas ref={canvasHnmrEl} id="canvas-hnmr"></canvas>
      </div>
    </Paper>
  )
}
