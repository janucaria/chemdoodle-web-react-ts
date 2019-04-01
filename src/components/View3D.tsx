import React, { Component } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import ChemDoodle from '../modules/ChemDoodleWeb';
import MoleculeContext from '../contexts/MoleculeContext';

const styles = (theme: Theme) =>
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
  });

interface Props extends WithStyles<typeof styles> {
  setContextCanvas3d(canvas3d: ChemDoodle.TransformCanvas3D): void;
}

interface State {
}

class View3D extends Component<Props, State> {
  static contextType = MoleculeContext;

  updateDimensions = (event?: UIEvent) => {
    const canvas3d = this.context.canvas3d.gl.canvas as HTMLCanvasElement;
    const canvasContainer = canvas3d.parentElement as HTMLElement;

    canvasContainer.removeChild(canvas3d);

    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;

    canvasContainer.appendChild(canvas3d);

    this.context.canvas3d.resize(canvasWidth, canvasHeight);
  }

  componentDidMount() {
    const canvasView3D = this.refs.canvas as HTMLCanvasElement;
    const canvasContainer = canvasView3D.parentElement as HTMLElement;
    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;
    if (this.context.canvas3d === null) {
      const canvasId = canvasView3D.id;

      const transformer3d = new ChemDoodle.TransformCanvas3D(canvasId, canvasWidth, canvasHeight);
      transformer3d.specs.set3DRepresentation('Ball and Stick');
      transformer3d.specs.backgroundColor = 'black';
      transformer3d.specs.atoms_displayLabels_3D = true;
      transformer3d.loadMolecule(this.context.molecule);
      transformer3d.repaint();

      this.props.setContextCanvas3d(transformer3d);
    } else {
      canvasContainer.replaceChild(this.context.canvas3d.gl.canvas, canvasView3D);

      if (this.context.resizeCanvas3d) {
        this.context.canvas3d.resize(canvasWidth, canvasHeight);
        this.props.setContextCanvas3d(this.context.canvas3d);
      }

      this.context.canvas3d.loadMolecule(this.context.molecule);
      this.context.canvas3d.repaint();
    }
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper id="paper-3d" className={classes.sketchPaper} elevation={1}>
        <div className="strect-height">
          <canvas ref="canvas" id="canvas-view3d"></canvas>
        </div>
      </Paper>
    )
  }
}


export default withStyles(styles)(View3D);