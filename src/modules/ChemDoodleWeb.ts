declare namespace ChemDoodle {
  namespace io {
    class PDBInterpreter {
      deduceResidueBonds: boolean;
      constructor();
      read(arg: any, arg2?: number): any;
    }

    class JSONInterpreter {
      constructor();
      molTo(mol: any): any
      molFrom(json: any): any;
    }
  }

  const ELEMENT: {
    [s: string]: {
      jmolColor: string;
    };
  };

  function readMOL(arg: string, arg2?: number): any;

  namespace structures {
    var Bond: any;
    var Point: any;
  }

  class TransformCanvas3D {
    gl: WebGLRenderingContext;
    width: number;
    height: number;
    specs: {
      atoms_displayTerminalCarbonLabels_2D: boolean;
      atoms_useJMOLColors: boolean;
      bonds_clearOverlaps_2D: boolean;
      backgroundColor: string;
      atoms_displayLabels_3D: boolean;
      set3DRepresentation(representation: string): void;
    };

    constructor(element: string, width: number, height: number);

    loadMolecule(mol: any): void;

    repaint(): void;

    resize(width: number, height: number): void;
  }

  class SketcherCanvas {
    oneMolecule: boolean;
    molecules: any[];
    shapes: any[];
    lasso: any;
    historyManager: any;
    width: number;
    height: number;
    specs: {
      atoms_displayTerminalCarbonLabels_2D: boolean;
      atoms_useJMOLColors: boolean;
      bonds_clearOverlaps_2D: boolean;
    };
    stateManager: {
      STATE_NEW_BOND: any;
      STATE_MOVE: any;
      STATE_ERASE: any;
      STATE_LABEL: any;
      STATE_NEW_RING: any;
      setState(state: any): void;
      getCurrentState(): any;
    };

    constructor(element: string, width: number, height: number, options: {
      useServices: boolean;
      oneMolecule: boolean;
      isMobile: boolean;
      includeToolbar: boolean;
    })

    repaint(): void;
    getContentBounds(): any;
    getAllPoints(): any[];
    getMolecule(): any;
    loadMolecule(mol: any): void;
    resize(width: number, height: number): void;
  }

  namespace uis {

    var actions: any;

    namespace gui {
      var imageDepot: {
        ADD_LONE_PAIR: string;
        ADD_RADICAL: string;
        ANGLE: string;
        ANIMATION: string;
        ARROW_DOWN: string;
        ARROW_EQUILIBRIUM: string;
        ARROW_RESONANCE: string;
        ARROW_RETROSYNTHETIC: string;
        ARROW_SYNTHETIC: string;
        ATOM_REACTION_MAP: string;
        BENZENE: string;
        BOND_ANY: string;
        BOND_DOUBLE: string;
        BOND_DOUBLE_AMBIGUOUS: string;
        BOND_HALF: string;
        BOND_PROTRUDING: string;
        BOND_QUADRUPLE: string;
        BOND_QUINTUPLE: string;
        BOND_RECESSED: string;
        BOND_RESONANCE: string;
        BOND_SEXTUPLE: string;
        BOND_SINGLE: string;
        BOND_TRIPLE: string;
        BOND_WAVY: string;
        BOND_ZERO: string;
        BRACKET_CHARGE: string;
        BRACKET_DYNAMIC: string;
        BROMINE: string;
        CALCULATE: string;
        CARBON: string;
        CENTER: string;
        CHAIN_CARBON: string;
        CHLORINE: string;
        CLEAR: string;
        COPY: string;
        CUT: string;
        CYCLOBUTANE: string;
        CYCLOHEPTANE: string;
        CYCLOHEXANE: string;
        CYCLOOCTANE: string;
        CYCLOPENTANE: string;
        CYCLOPROPANE: string;
        DECREASE_CHARGE: string;
        DISTANCE: string;
        ERASE: string;
        FLIP_HOR: string;
        FLIP_VER: string;
        FLUORINE: string;
        HYDROGEN: string;
        INCREASE_CHARGE: string;
        IODINE: string;
        LASSO: string;
        LASSO_SHAPES: string;
        MARQUEE: string;
        MOVE: string;
        NITROGEN: string;
        OPEN: string;
        OPTIMIZE: string;
        OXYGEN: string;
        PASTE: string;
        PERIODIC_TABLE: string;
        PERSPECTIVE: string;
        PHOSPHORUS: string;
        PUSHER_BOND_FORMING: string;
        PUSHER_DOUBLE: string;
        PUSHER_SINGLE: string;
        QUERY: string;
        REDO: string;
        REMOVE_LONE_PAIR: string;
        REMOVE_RADICAL: string;
        RING_ARBITRARY: string;
        SAVE: string;
        SEARCH: string;
        SETTINGS: string;
        SILICON: string;
        SULFUR: string;
        TEMPLATES: string;
        TEXT: string;
        TORSION: string;
        UNDO: string;
        VARIABLE_ATTACHMENT_POINTS: string;
        ZOOM_IN: string;
        ZOOM_OUT: string;

        getURI(url: string): string;
      };
    }
  }

};

export default ChemDoodle;