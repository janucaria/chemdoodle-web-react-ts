import React, { Component } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { ThreeDRotation, Create, ShowChart, LibraryBooks} from '@material-ui/icons';
import Draw from './components/Draw';
import View3D from './components/View3D';
import MoleculeContext, { MoleculeContextInterface } from './contexts/MoleculeContext';
import ChemDoodle from './modules/ChemDoodleWeb';

import './App.css';

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

interface Props extends WithStyles<typeof styles> { }

interface State {
  navIndexValue: number;
  contexts: MoleculeContextInterface;
}

class App extends Component<Props, State> {
  state = {
    navIndexValue: 0,
    contexts: {
      molecule: null,
      canvas3d: null,
      resizeCanvas3d: true,
      resizeCanvasSketcher: true
    }
  };

  handleChange = (event: any, value: number) => {
    this.setState({ navIndexValue: value });
  };

  setMolecule = (molecule: any) => {
    this.setState((oldState) => {
      let newState = Object.create(oldState);
      newState.contexts.molecule = molecule;

      return newState;
    });
  }

  setContextCanvas3d = (canvas: ChemDoodle.TransformCanvas3D) => {
    this.setState((oldState) => {
      let newState = Object.create(oldState);
      newState.contexts.canvas3d = canvas;
      newState.contexts.resizeCanvas3d = false;

      return newState;
    });
  }

  resizeCanvasSketcherToFalse = () => {
    this.setState((oldState) => {
      let newState = Object.create(oldState);
      newState.contexts.resizeCanvas3d = true;
      return newState;
    });
  }

  render() {
    const { classes } = this.props;
    const { navIndexValue } = this.state;

    return (
      <React.Fragment>
        <div ref="content" className="app-content">
          <MoleculeContext.Provider value={this.state.contexts}>
            {(() => {
              switch (navIndexValue) {
                case 0:
                  return <Draw resetMolecule={this.setMolecule}
                          resizeCanvasSketcherToFalse={this.resizeCanvasSketcherToFalse} />;
                default:
                  return <View3D setContextCanvas3d={this.setContextCanvas3d} />
              }
            })()}
          </MoleculeContext.Provider>
        </div>
        <BottomNavigation
          value={navIndexValue}
          onChange={this.handleChange}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction label="Draw" icon={<Create />} />
          <BottomNavigationAction label="3D" icon={<ThreeDRotation />} />
          <BottomNavigationAction label="Spectre" icon={<ShowChart />} />
          <BottomNavigationAction label="About" icon={<LibraryBooks />} />
        </BottomNavigation>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
