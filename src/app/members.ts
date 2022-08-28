export interface Member {
  id: string;
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
  accessNumber: string;
  registerId: string;
  registerEmail: string;
}

export const members = [
  {
    id: '1001',
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
    accessNumber: '1111',
    registerId: 'ba86e6c4-0b36-4534-81df-0c1e5776d6a0',
    registerEmail: 'melvinrmc@hotmail.com',
  },
  {
    id: '1002',
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
    accessNumber: '2222',
    registerId: 'ba86e6c4-0b36-4534-81df-0c1e5776d6a0',
    registerEmail: 'melvinrmc@hotmail.com',
  },
  {
    id: '1003',
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
    accessNumber: '3333',
    registerId: 'ba86e6c4-0b36-4534-81df-0c1e5776d6a0',
    registerEmail: 'melvinrmc@hotmail.com',
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
