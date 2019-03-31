import React from 'react';
import ChemDoodle from '../modules/ChemDoodleWeb';

export interface MoleculeContextInterface {
  molecule: any;
  canvas3d: ChemDoodle.TransformCanvas3D | null;
}

const MoleculeContext: React.Context<MoleculeContextInterface> = React.createContext({
  molecule: null,
  canvas3d: null
} as MoleculeContextInterface);

export default MoleculeContext;