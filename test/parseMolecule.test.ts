import { parseMolecule } from "../src/moleculesToAtoms";

describe('parseMolecule', () => {
  it('returns an object with the number of atoms in the molecule', () => {
    expect(parseMolecule('OH')).toEqual({ O: 1, H: 1 });
    expect(parseMolecule('H2O')).toEqual({ H: 2, O: 1 });
    expect(parseMolecule('H2')).toEqual({ H: 2 });
    expect(parseMolecule('H2OS')).toEqual({ H: 2, O: 1, S: 1 });
    expect(parseMolecule('He2')).toEqual({ He: 2 });
    expect(parseMolecule('FeOH2')).toEqual({ Fe: 1, O: 1, H: 2 });
    expect(parseMolecule('Fer@12O3H2')).toEqual({ Fer: 12, O: 3, H: 2 });
  })
})
