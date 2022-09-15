import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../members';
import {
  FormBuilder,
  ValidatorFn,
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
      validators: Validators.compose([this.numRegistroDuplicadoValidator()]),
      //asyncValidators: [yourAsyncValidatorFunction],
      updateOn: 'blur',
    }),
    isMember: '1',
    lastName: '',
    marriedName: '',
    firstName: '',
    fullAddress: '',
    birthday: '',
    genere: '',
    age: 0,
    mobileNumber: '',
    maritalStatus: '',
    dpi: new FormControl('', {
      validators: Validators.compose([this.dpiDuplicadoValidator()]),
      //asyncValidators: [yourAsyncValidatorFunction],
      updateOn: 'blur',
    }),
    isBaptized: '2',
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

  ngOnInit(): void {
    this.onChanges();
  }

  onChanges(): void {
    this.checkoutForm.get('numRegistro')?.statusChanges.subscribe((val) => {
      console.log(`numRegistro is ${val}.`);
    });

    this.checkoutForm.get('dpi')?.statusChanges.subscribe((val) => {
      console.log(`dpi is ${val}.`);
    });
  }

  onSubmit(): void {
    // Process checkout data here
    let member: Member;

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
    } else {
      // Do nothing!
      console.log('Continue llenando el formulario');
    }
  }
}
