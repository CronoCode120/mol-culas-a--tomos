interface MoleculeObject {
  [key: string]: number
}

interface InnerAtomObject {
  molecObj: MoleculeObject,
  number: string,
  atom: string
}

export function parseMolecule(molec: string) {
  let atom = '';
  let number = '';
  let molecObj = {};
  
  for (let i = 0; i < molec.length; i++) {
    const char = molec[i];
    const isNumber = !isNaN(parseInt(char))
    if (isNumber) {
      number += char;
    } else if (char === '[' || char === '(') {
      getInnerMolecule(char, i, molec)
    } else {
      const {atom: _atom, molecObj: _molecObj, number: _number} = getNewAtom(char, atom, molecObj, number)
      atom = _atom,
      molecObj = _molecObj,
      number = _number
    }
  }

  if (atom !== '') {
    if (!molecObj[atom]) {
      molecObj[atom] = 0
    }
    molecObj[atom] += number ? parseInt(number) : 1;
  }
  return molecObj;
}

export function getNewAtom(
  currentChar: string,
  atom:string,
  molecObj: MoleculeObject,
  number: string
): InnerAtomObject {
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  if (upperCase.test(currentChar)) {
    if (atom !== '') {
      if (!molecObj[atom]) {
        molecObj[atom] = 0
      }
      if (number !== '') {
        molecObj[atom] += parseInt(number);
        number = '';
      } else {
        molecObj[atom] += 1;
      }
    }
    atom = currentChar;
  } else if (lowerCase.test(currentChar)) {
    atom += currentChar;
  }
  return {
    molecObj,
    number,
    atom
  }
}

function getInnerMolecule(
  currentChar: string,
  index: number,
  molec: string
): MoleculeObject {
  const closingChar = currentChar === '[' ? ']' : ')';
  let innerMolecule = '';
  for (index + 1; molec[index] === closingChar; index++) {
    innerMolecule += molec[index];
  }
  return parseMolecule(innerMolecule)
}

function sumMolecules(molecule: MoleculeObject, secondMolecule: MoleculeObject) {
  const newMolec: MoleculeObject = { ...molecule };

  for (const atom in molecule) {
    newMolec[atom] = molecule[atom];
  }

  for (const atom in secondMolecule) {
    if (atom in newMolec) {
      newMolec[atom] += secondMolecule[atom];
    } else {
      newMolec[atom] = secondMolecule[atom];
    }
  }
}

