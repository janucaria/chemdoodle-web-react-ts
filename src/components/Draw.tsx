import React, { useState, useEffect, useContext, useRef } from 'react';
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
  resetMolecule(mol: any): void;
  resizeCanvasSketcherToFalse(): void;
}

export default function Draw(props: Props): JSX.Element {
  const context = useContext(MoleculeContext);

  const classes = useStyles();

  const [bottonIndexActive, setBottonIndexActive] = useState(4);

  const canvasEl = useRef(null as HTMLCanvasElement | null);

  const sketcherRef = useRef(null as ChemDoodle.SketcherCanvas | null);

  useEffect(() => {
    const canvasSketcher = canvasEl.current as HTMLCanvasElement;
    const canvasContainer = canvasSketcher.parentElement as HTMLElement;
    const canvasId = canvasSketcher.id;
    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;

    ChemDoodle.ELEMENT['H'].jmolColor = 'black';
    ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';
    const sketcher = new ChemDoodle.SketcherCanvas(canvasId, canvasWidth, canvasHeight, {
      useServices: false,
      oneMolecule: true,
      isMobile: true,
      includeToolbar: false
    });
    sketcher.specs.atoms_displayTerminalCarbonLabels_2D = true;
    sketcher.specs.atoms_useJMOLColors = true;
    sketcher.specs.bonds_clearOverlaps_2D = true;

    if (context.molecule === null) {
      props.resetMolecule(sketcher.getMolecule());
    } else {
      sketcher.loadMolecule(context.molecule);
    }

    sketcher.repaint();

    const button = buttons[bottonIndexActive];
    button.setSketcerState(sketcher);

    sketcherRef.current = sketcher;

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);

    // eslint-disable-next-line
  }, []);

  const buttons = [
    {
      title: "Move",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.MOVE),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_MOVE);
      },
    },
    {
      title: "Clear",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.CLEAR),
      toggle: false,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        var clear = true;
        if (sketcher.oneMolecule) {
          if (sketcher.molecules[0].atoms.length === 1) {
            var a = sketcher.molecules[0].atoms[0];
            if (a.label === 'C' && a.charge === 0 && a.mass === -1) {
              clear = false;
            }
          }
        } else {
          if (sketcher.molecules.length === 0 && sketcher.shapes.length === 0) {
            clear = false;
          }
        }
        if (clear) {
          sketcher.stateManager.getCurrentState().clearHover();
          if (sketcher.lasso && sketcher.lasso.isActive()) {
            sketcher.lasso.empty();
          }
          sketcher.historyManager.pushUndo(new ChemDoodle.uis.actions.ClearAction(sketcher));
        }
      },
    },
    {
      title: "Erase",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.ERASE),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_ERASE);
      },
    },
    {
      title: "Center",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.CENTER),
      toggle: false,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        var dif = new ChemDoodle.structures.Point(sketcher.width / 2, sketcher.height / 2);
        var bounds = sketcher.getContentBounds();
        dif.x -= (bounds.maxX + bounds.minX) / 2;
        dif.y -= (bounds.maxY + bounds.minY) / 2;
        sketcher.historyManager.pushUndo(new ChemDoodle.uis.actions.MoveAction(sketcher.getAllPoints(), dif));
      },
    },
    {
      title: "Single Bond",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.BOND_SINGLE),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
        sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
        sketcher.stateManager.STATE_NEW_BOND.stereo = ChemDoodle.structures.Bond.STEREO_NONE;
      },
    },
    {
      title: "Double Bond",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.BOND_DOUBLE),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
        sketcher.stateManager.STATE_NEW_BOND.bondOrder = 2;
        sketcher.stateManager.STATE_NEW_BOND.stereo = ChemDoodle.structures.Bond.STEREO_NONE;
      },
    },
    {
      title: "Recessed Bond",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.BOND_RECESSED),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_BOND);
        sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
        sketcher.stateManager.STATE_NEW_BOND.stereo = ChemDoodle.structures.Bond.STEREO_RECESSED;
      },
    },
    {
      title: "Carbon",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.CARBON),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_LABEL);
        sketcher.stateManager.STATE_LABEL.label = 'C';
      },
    },
    {
      title: "Oxygen",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.OXYGEN),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_LABEL);
        sketcher.stateManager.STATE_LABEL.label = 'O';
      },
    },
    {
      title: "Nitrogen",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.NITROGEN),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_LABEL);
        sketcher.stateManager.STATE_LABEL.label = 'N';
      },
    },
    {
      title: "Cyclohexane Ring",
      image: ChemDoodle.uis.gui.imageDepot.getURI(ChemDoodle.uis.gui.imageDepot.CYCLOHEXANE),
      toggle: true,
      setSketcerState: (sketcher: ChemDoodle.SketcherCanvas) => {
        sketcher.stateManager.setState(sketcher.stateManager.STATE_NEW_RING);
        sketcher.stateManager.STATE_NEW_RING.numSides = 6;
        sketcher.stateManager.STATE_NEW_RING.unsaturated = false;
      },
    }
  ];

  const onButtonClick = (e: any) => {
    const target = e.currentTarget;
    const buttonIndex = parseInt(target.dataset.buttonIndex, 10);
    const button = buttons[buttonIndex];
    const sketcher = sketcherRef.current!;

    if (button.toggle) {
      setBottonIndexActive(buttonIndex);
    }

    button.setSketcerState(sketcher!);

    props.resetMolecule(sketcher!.getMolecule());
  }

  const updateDimensions = (event: UIEvent) => {
    const canvasSketcher = canvasEl.current as HTMLCanvasElement;
    const canvasContainer = canvasSketcher.parentElement as HTMLElement;

    canvasContainer.removeChild(canvasSketcher);

    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;

    canvasContainer.appendChild(canvasSketcher);

    sketcherRef.current!.resize(canvasWidth, canvasHeight);

    props.resizeCanvasSketcherToFalse();
  }

  function getUiStateCssClass(buttonIndex: number): string {
    return bottonIndexActive === buttonIndex ? " ui-state-active" : " ui-state-default"
  }

  return (
    <Paper id="paper-sketcher" className={classes.sketchPaper} elevation={1}>
      <div className={classes.sketchToolbar}>
        {buttons.map((button, key) => {
          return (<span
            key={key}
            data-button-index={key}
            id="sketcher_button_move_label"
            title={button.title}
            onClick={onButtonClick}
            className={
              "ui-button ui-widget ui-corner-all ui-button-text-only"
              + getUiStateCssClass(key)
            }
            role="button" aria-pressed="false">
            <span className="ui-button-text">
              <img
                alt={button.title.toLowerCase()}
                id="sketcher_button_move_icon"
                title={button.title}
                width="20" height="20"
                src={button.image} />
            </span>
          </span>
          )
        })}
      </div>
      <div className="strect-height">
        <canvas ref={canvasEl} id="canvas-sketcher"></canvas>
      </div>
    </Paper>
  )
}
