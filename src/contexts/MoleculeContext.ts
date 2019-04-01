import React from 'react';
import ChemDoodle from '../modules/ChemDoodleWeb';

export interface MoleculeContextInterface {
  molecule: any;
  canvas3d: ChemDoodle.TransformCanvas3D | null;
  resizeCanvas3d: boolean,
  resizeCanvasSketcher: boolean
}

const MoleculeContext: React.Context<MoleculeContextInterface> = React.createContext({
  molecule: null,
  canvas3d: null,
  resizeCanvas3d: true,
  resizeCanvasSketcher: true
} as MoleculeContextInterface);

export default MoleculeContext;