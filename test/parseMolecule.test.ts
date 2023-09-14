import { parseMolecule, getNewAtom } from "../src/moleculesToAtoms";

describe('parseMolecule', () => {
  describe('when there are no numbers in formula', () => {
    test('should return 1 O atom and 1 H atom', () => {
      expect(parseMolecule('OH')).toEqual({ O: 1, H: 1 });
    })
    test('should count 1 atom when there is one uppercase followed by one lowercase Fe', () => {
      expect(parseMolecule('FeO')).toEqual({ Fe: 1, O: 1 });
    })
  })
  describe('when there are numbers in formula', () => {
    describe('when an atom has one number followed', () => {
      test.each([
        [
          'H2O',
          { H: 2, O: 1 }
        ],
        [
          'H2',
          { H: 2 }
        ],
        [
          'H2OS',
          { H: 2, O: 1, S: 1 }
        ],
        [
          'He2',
          { He: 2 }
        ],
        [
          'FeOH2',
          { Fe: 1, O: 1, H: 2 }
        ],
      ])('returns an object with the number of atoms plus number followed in the molecule', (param: string, result: object) => {
        expect(parseMolecule(param)).toEqual(result)
      })
    })
  })
})

// describe.only('getNewAtom', () => {
//   describe('when there are no numbers in formula', () => {
//     test('should save atom and return InnerAtomObject and number on molecObjc', () => {
//       const 
//       expect(getNewAtom('O')).toEqual({
//         molecObj: { O: 1 },
//         number: '',
//         atom: 'O'
//       });
//     });
//     test('should save atom and return InnerAtomObject when there is one uppercase followed by one lowercase Fe', () => {
//       expect(getNewAtom('Fe')).toEqual({
//         molecObj: { Fe: 1 },
//         number: '',
//         atom: 'Fe'
//       });
//     })
//   })
//   describe('when there are numbers in formula', () => {
//     describe('when an atom has one number followed', () => {
//       test.each([
//         [
//           'H2',
//           {
//             molecObj: { H: 2 },
//             number: '2',
//             atom: 'H'
//           }
//         ],
//         [
//           'He2',
//           {
//             molecObj: { He: 2 },
//             number: '2',
//             atom: 'He'
//           }
//         ],
//         [
//           'Fe3',
//           {
//             molecObj: { Fe: 3 },
//             number: '3',
//             atom: 'Fe'
//           }
//         ],
//       ])('should save atom and return InnerAtomObject with atom plus number followed', (param: string, result: object) => {
//         expect(getNewAtom(param)).toEqual(result)
//       })
//     })
// })
// it('returns an object with the number of atoms in the molecule', () => {
//   expect(parseMolecule('Fer@12O3H2')).toEqual({ Fer: 12, O: 3, H: 2 });
// })
// it('returns an object with the number of atoms in the molecule', () => {
//   expect(parseMolecule('Fe2(O3H2)3N')).toEqual({ Fer: 12, O: 3, H: 2 });
// })
// })
