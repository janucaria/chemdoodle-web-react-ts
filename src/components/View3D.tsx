import React, { useContext, useRef, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import ChemDoodle from '../modules/ChemDoodleWeb';
import MoleculeContext from '../contexts/MoleculeContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: 500,
    },
    sketchPaper: {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
    },
    sketchToolbar: {
      backgroundColor: "#ddd",
      padding: "10px",
      textAlign: "center",
    },
    bottomNav: {
      backgroundColor: "#ddd",
    }
  }));

interface Props {
  setContextCanvas3d(canvas3d: ChemDoodle.TransformCanvas3D): void;
}

export default function View3D(props: Props): JSX.Element {
  const context = useContext(MoleculeContext);
  const classes = useStyles();
  let canvasRef = useRef(null as HTMLCanvasElement | null);

  useEffect(() => {
    const canvasView3D = canvasRef.current as HTMLCanvasElement;
    const canvasContainer = canvasView3D.parentElement as HTMLElement;
    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;
    if (context.canvas3d === null) {
      const canvasId = canvasView3D.id;

      const transformer3d = new ChemDoodle.TransformCanvas3D(canvasId, canvasWidth, canvasHeight);
      transformer3d.specs.set3DRepresentation('Ball and Stick');
      transformer3d.specs.backgroundColor = 'black';
      transformer3d.specs.atoms_displayLabels_3D = true;
      transformer3d.loadMolecule(context.molecule);
      transformer3d.repaint();

      props.setContextCanvas3d(transformer3d);
    } else {
      canvasContainer.replaceChild(context.canvas3d.gl.canvas, canvasView3D);

      if (context.resizeCanvas3d) {
        context.canvas3d.resize(canvasWidth, canvasHeight);
        props.setContextCanvas3d(context.canvas3d);
      }

      context.canvas3d.loadMolecule(context.molecule);
      context.canvas3d.repaint();
    }
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);

    // eslint-disable-next-line
  }, []);

  const updateDimensions = (event?: UIEvent) => {
    const chemdoodleCanvas = context.canvas3d!;
    const canvas3d = chemdoodleCanvas.gl.canvas as HTMLCanvasElement;
    const canvasContainer = canvas3d.parentElement as HTMLElement;

    canvasContainer.removeChild(canvas3d);

    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;

    canvasContainer.appendChild(canvas3d);

    chemdoodleCanvas.resize(canvasWidth, canvasHeight);
  }

  return (
    <Paper id="paper-3d" className={classes.sketchPaper} elevation={1}>
      <div className="strect-height">
        <canvas ref={canvasRef} id="canvas-view3d"></canvas>
      </div>
    </Paper>
  );
}
