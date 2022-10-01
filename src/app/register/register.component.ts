import { Component, OnInit } from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  members = this.memberService.getMembers();
  startDate = new Date(1990, 0, 1);

  checkoutForm = this.formBuilder.group({
    numRegistro: new FormControl('', {
      asyncValidators: Validators.composeAsync([
        this.asyncNumRegistroValidator(),
      ]),
      updateOn: 'blur',
    }),
    isMember: 'MIEMBRO',
    lastName: new FormControl('', {
      validators: Validators.compose([Validators.required]),
      updateOn: 'blur',
    }),
    marriedName: '',
    firstName: new FormControl('', {
      validators: Validators.compose([Validators.required]),
      updateOn: 'blur',
    }),
    fullAddress: '',
    birthday: new FormControl('', {
      validators: Validators.compose([Validators.required]),
      updateOn: 'blur',
    }),
    genere: '',
    age: 0,
    mobileNumber: '',
    maritalStatus: '',
    dpi: new FormControl('', {
      asyncValidators: Validators.composeAsync([this.asyncDpiValidator()]),
      updateOn: 'blur',
    }),
    isBaptized: 'NO',
    fathersName: '',
    mothersName: '',
    dpiParent: '',
    additionalInfo: '',
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
    this.onChanges();
    this.userService.getCurrentUser().catch((err) => {
      console.error(err);
      alert(
        'Ocurrio un Error al recuperar el Id y Correo del usuario. Porfavor contacta al Administrador antes de continuar'
      );
    });
  }

  onChanges(): void {
    this.checkoutForm.get('numRegistro')?.statusChanges.subscribe((val) => {
      console.log(`numRegistro is ${val}.`);
    });

    this.checkoutForm.get('dpi')?.statusChanges.subscribe((val) => {
      console.log(`dpi is ${val}.`);
    });

    this.checkoutForm.get('birthday')?.valueChanges.subscribe((val) => {
      console.log(`birthday is ${val}.`);
      console.log(this.getAge(val ? val.toString() : ''));

      this.checkoutForm
        .get('age')
        ?.setValue(this.getAge(val ? val.toString() : ''));
    });
  }

  onSubmit(): void {
    // Process checkout data here

    let member: Member;
    var md5 = require('md5');

    member = {
      id: String(this.checkoutForm.value.numRegistro),
      numRegistro: String(this.checkoutForm.value.numRegistro),
      isMember: String(this.checkoutForm.value.isMember),
      lastName: String(this.checkoutForm.value.lastName).toUpperCase(),
      marriedName: String(this.checkoutForm.value.marriedName).toUpperCase(),
      firstName: String(this.checkoutForm.value.firstName).toUpperCase(),
      fullAddress: String(this.checkoutForm.value.fullAddress).toUpperCase(),
      birthday: String(this.checkoutForm.value.birthday),
      genere: String(this.checkoutForm.value.genere).toUpperCase(),
      age: Number(this.checkoutForm.value.age),
      mobileNumber: String(this.checkoutForm.value.mobileNumber),
      maritalStatus: String(
        this.checkoutForm.value.maritalStatus
      ).toUpperCase(),
      dpi: String(this.checkoutForm.value.dpi),
      isBaptized: String(this.checkoutForm.value.isBaptized),
      fathersName: String(this.checkoutForm.value.fathersName).toUpperCase(),
      mothersName: String(this.checkoutForm.value.mothersName).toUpperCase(),
      dpiParent: String(this.checkoutForm.value.dpiParent),
      additionalInfo: String(
        this.checkoutForm.value.additionalInfo
      ).toUpperCase(),
      accessNumber: '3333',
      registerId: this.userService.getCurrentUserId(),
      registerEmail: this.userService.getCurrentUserEmail(),
    };

    if (confirm('Esta seguro que ha finalizado de llenar los datos?')) {
      // Save it!
      console.warn('Miembro: ', this.checkoutForm.value);
      console.warn('Miembro se ha enviado a la Base de Datos', member);

      this.memberService
        .postNextId()
        .then((nextValue) => {
          console.warn('Respuesta devuelta: IDPA-', nextValue.data);
          console.warn(
            String.prototype.concat(
              'IDPA-',
              String(Number(nextValue.data.Attributes.Value) + 0).padStart(4, '0')
            )
          );
          member.id = String.prototype.concat(
            'IDPA-',
            String(Number(nextValue.data.Attributes.Value) + 0).padStart(4, '0')
          );

          member.accessNumber = md5(
            String.prototype.concat(
              member.id,
              member.numRegistro !== undefined ? member.numRegistro : '',
              member.registerId,
              member.firstName,
              member.lastName
            )
          );

          this.memberService
            .saveMember(member)
            .then((things) => {
              console.warn('Respuesta devuelta: ', things.data);
              //this.dataSource.paginator = this.paginator;
              //this.dataSource.sort = this.sort;
              window.alert('Miembro ha sido agregado exitosamente!');
              this.checkoutForm.reset();
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      // Do nothing!
      console.log('Continue llenando el formulario');
    }
  }
}
