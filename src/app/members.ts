export interface Member {
  id: string;
  dpi: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  marriedName: string;
  genere: string;
  maritalStatus: string;
  birthday: string;
  age: number;
  mobileNumber: string;
  mobileCompany: string;
  email: string;
  address: {
    streetAvenue: number;
    streetName: string;
    number: string;
    zone: number;
    city: string;
    state: string;
    neighbourhood: string;
    additionalInfo: string;
  };
}

export const members = [
  {
    id: '1001',
    dpi: '1101547310409',
    firstName: 'Mario E.',
    secondName: 'Enrique',
    lastName: 'Mendoza',
    secondLastName: '',
    marriedName: '',
    genere: 'M',
    maritalStatus: 'Casado',
    birthday: '01-Junio-1946',
    age: 79,
    mobileNumber: '55111271',
    mobileCompany: 'Tigo',
    email: 'memendoza@casadeoracion.org',
    address: {
      streetAvenue: 3,
      streetName: 'Calle',
      number: '11-173',
      zone: 4,
      city: 'Patzicia',
      state: 'Chimaltenango',
      neighbourhood: 'Buenos Aires',
      additionalInfo: '',
    },
  },
  {
    id: '1002',
    dpi: '1201547310409',
    firstName: 'Berta',
    secondName: '',
    lastName: 'Estrada',
    secondLastName: '',
    marriedName: 'de Mendoza',
    genere: 'F',
    maritalStatus: 'Casado',
    birthday: '02-Junio-1946',
    age: 79,
    mobileNumber: '55111271',
    mobileCompany: 'Tigo',
    email: 'bdemendoza@casadeoracion.org',
    address: {
      streetAvenue: 3,
      streetName: 'Calle',
      number: '11-173',
      zone: 4,
      city: 'Patzicia',
      state: 'Chimaltenango',
      neighbourhood: 'Buenos Aires',
      additionalInfo: '',
    },
  },
  {
    id: '1003',
    dpi: '1803511110409',
    firstName: 'Melvin',
    secondName: 'Ruben',
    lastName: 'Miculax',
    secondLastName: 'Coc',
    marriedName: '',
    genere: 'M',
    maritalStatus: 'Casado',
    birthday: '01-Junio-1990',
    age: 39,
    mobileNumber: '33111271',
    mobileCompany: 'Tigo',
    email: 'melvinrmc@hotmail.com',
    address: {
      streetAvenue: 1,
      streetName: 'Avenida',
      number: '2-73',
      zone: 2,
      city: 'Patzicia',
      state: 'Chimaltenango',
      neighbourhood: 'A media cuadra del Super del Barrio',
      additionalInfo: 'Disponible solo Fines de Semana',
    },
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
