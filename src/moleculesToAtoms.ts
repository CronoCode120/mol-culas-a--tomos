export function parseMolecule(molec: string) {
  let atom = '';
  let number = '';
  let molecObj = {};

  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  
  for (let i = 0; i < molec.length; i++) {
    const char = molec[i];

    if (!isNaN(parseInt(char))) {
      number += char;
      
    } else if (upperCase.test(char)) {
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
      atom = char;

    } else if (lowerCase.test(char)) {
      atom += char;
    } else if (char === '[' || char === '(') {
      const closingChar = char === '[' ? ']' : ')';
      let parenthesis = '';
      for (let j = i + 1; j < molec.length; j++) {
        if (molec.length[j] === closingChar) {
          parseMolecule(parenthesis);
        }
        parenthesis += molec[j];
      }
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

function newAtom() {
  
}

interface MoleculeObject {
  [key: string]: number
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

