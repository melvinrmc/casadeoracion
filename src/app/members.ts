export interface Member {
  numRegistro: string;
  isMember: string;
  lastName: string;
  marriedName: string;
  firstName: string;
  fullAddress: string;
  birthday: string;
  genere: string;
  age: number;
  mobileNumber: string;
  maritalStatus: string;
  dpi: string;
  isBaptized: string;
  fathersName: string;
  mothersName: string;
  dpiParent: string;
  additionalInfo: string;
}

export const members = [
  {
    numRegistro: '1001',
    isMember: '1',
    lastName: 'Mendoza',
    marriedName: '',
    firstName: 'Mario Enrique',
    fullAddress: '2 Calle 1-47 Zona 2',
    birthday: '17/07/1963',
    genere: 'MASCULINO',
    age: 63,
    mobileNumber: '55123456',
    maritalStatus: 'CASADO',
    dpi: '1801511220101',
    isBaptized: '1',
    fathersName: '',
    mothersName: '',
    dpiParent: '',
    additionalInfo: 'Pastor General',
  },
  {
    numRegistro: '1002',
    isMember: '1',
    lastName: 'Estrada',
    marriedName: 'de Mendoza',
    firstName: 'Bertha',
    fullAddress: '2 Calle 1-47 Zona 2',
    birthday: '11/05/1963',
    genere: 'FEMENINO',
    age: 63,
    mobileNumber: '44123456',
    maritalStatus: 'CASADO',
    dpi: '1801411220101',
    isBaptized: '1',
    fathersName: '',
    mothersName: '',
    dpiParent: '',
    additionalInfo: 'Pastora General',
  },
  {
    numRegistro: '1003',
    isMember: '1',
    lastName: 'Miculax Coc',
    marriedName: '',
    firstName: 'Melvin Ruben',
    fullAddress: '1 Avenida 2-73 Zona 2',
    birthday: '01/06/1983',
    genere: 'MASCULINO',
    age: 39,
    mobileNumber: '33123271',
    maritalStatus: 'CASADO',
    dpi: '1803533220101',
    isBaptized: '1',
    fathersName: 'Ruben Miculax Ajuchan',
    mothersName: 'Maria Alejandra Coc Xicay',
    dpiParent: '',
    additionalInfo: 'Casado con Gladys Melissa',
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
