import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import * as pdfFonts from "pdfmake/build/vfs_fonts.js"; // <-- vfs_fonts has to be imported before pdfmake
import * as pdfMake from "pdfmake/build/pdfmake";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


import { MemberService } from '../member.service';
import { Member } from '../members';
import {
  FormBuilder,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormControl,
  
} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  element = false;
  name = 'prueba';
  memberArray: { id: string; firstname: string; lastname: string }[] = [];  
  memberSubject$ = new Subject<{ id: string; firstname: string; lastname: string }[]>();

  ngOnInit(): void {
    this.memberSubject$.subscribe(memberArray => this.memberArray = memberArray);
  }

  checkoutForm = this.formBuilder.group({

    dpi: '',
    birthday: new FormControl('', {
      validators: Validators.compose([Validators.required]),
      updateOn: 'blur',
    }),
  });

  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  getAge(birthDateString: string): number {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const birthDate = new Date(birthDateString);

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return yearsDifference - 1 < 0 ? 0 : yearsDifference - 1;
    }

    return yearsDifference < 0 ? 0 : yearsDifference;
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  numRegistroDuplicadoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = true;
      return forbidden
        ? { forbiddenNumRegistro: { value: control.value } }
        : null;
    };
  }

  dpiDuplicadoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = false;
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  asyncDpiValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve, reject) => {
        let result = false;
        if (control.value == '') {
          resolve(result ? { dpiDuplicated: true } : null);
        } else {
          this.memberService
            .getRemoteMemberByDPI(control.value)
            .then((things) => {
              console.warn('Respuesta devuelta: ', things.data);
              if (things.data.length > 0) {
                result = true;
              }
              resolve(result ? { dpiDuplicated: true } : null);
            })
            .catch((error) => {
              console.log(error.response);
              reject(error);
            });
        }
      });
    };
  }

  asyncNumRegistroValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve, reject) => {
        let result = false;
        if (control.value == '') {
          resolve(result ? { numRegistroDuplicated: true } : null);
        } else {
          this.memberService
            .getRemoteMemberByNumRegistro(control.value)
            .then((things) => {
              console.warn('Respuesta devuelta: ', things.data);

              if (things.data.length > 0) {
                result = true;
              }
              resolve(result ? { numRegistroDuplicated: true } : null);
            })
            .catch((error) => {
              console.log(error.response);
              reject(error);
            });
        }
      });
    };
  }



  onSubmit(): void {
    var dpi = String(this.checkoutForm.value.dpi);
    var birthday = String(this.checkoutForm.value.birthday)
    this.memberService
      .getPublicMemberByDpiBirthday(dpi, birthday)
      .then((memberObject) => {
        console.log(memberObject);
        if (memberObject.data.length == 1) {

          let aMember = { id: String(memberObject.data[0].id), firstname: String(memberObject.data[0].firstName), lastname: String(memberObject.data[0].lastName) };

          this.memberArray = [];
          this.memberArray.push(aMember);
          this.memberSubject$.next(this.memberArray);
          //this.createPDF(memberObject.data[0].id, memberObject.data[0].firstName);

        } else {
          alert("No se encontraron datos");
        }

      });
  }

  createPDF() {

    let docDefinition = {
      header: 'Iglesia de Dios Pentecostés de América "Casa de Oración"',
      content: 'Estimado Hermano/Hermana:\n\n' + this.memberArray[0].firstname +  ' ' + this.memberArray[0].lastname +'\n\nEres Miembro de la Iglesia de Dios Pentecostés de América "Casa de Oración" en Patzicía.\n\nTu número de membresía es: ' + this.memberArray[0].id,
    };

    pdfMake.createPdf(docDefinition).open();
  }

  showData() {
    return (this.element = true);
  }
  hideData() {
    return (this.element = false);
  }


}
