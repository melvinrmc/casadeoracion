import { Component, OnInit } from '@angular/core';

//import  * as pdfMake from 'pdfmake/build/pdfmake';
//import  * as pdfFonts from 'pdfmake/build/vfs_fonts';


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
  ) {}

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

  ngOnInit(): void {
  }

  onSubmit(): void {
    alert('Buscando...');
    var dpi = String(this.checkoutForm.value.dpi);
    var birthday = String(this.checkoutForm.value.birthday)
    this.memberService
      .getPublicMemberByDpiBirthday(dpi,birthday)
      .then((memberObject) => {
        console.log(memberObject);        
      });
  }

  createPDF(){

    var pdfmake = require('pdfmake');
    var Roboto = require('../fonts/Roboto');
    pdfmake.addFonts(Roboto);
    
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo',
        }
      ]
    }
 
    const pdf = pdfmake.createPdf(pdfDefinition);
    pdf.open();
 
  }

}
