import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../members';
import { FormBuilder } from '@angular/forms';
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
    numRegistro: '',
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
    dpi: '',
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

  ngOnInit(): void {}

  onSubmit(): void {
    // Process checkout data here
    let member: Member;

    member = {
      id: String(this.checkoutForm.value.numRegistro),
      numRegistro: String(this.checkoutForm.value.numRegistro),
      isMember: String(this.checkoutForm.value.isMember),
      lastName: String(this.checkoutForm.value.lastName),
      marriedName: String(this.checkoutForm.value.marriedName),
      firstName: String(this.checkoutForm.value.firstName),
      fullAddress: String(this.checkoutForm.value.fullAddress),
      birthday: String(this.checkoutForm.value.birthday),
      genere: String(this.checkoutForm.value.genere),
      age: Number(this.checkoutForm.value.age),
      mobileNumber: String(this.checkoutForm.value.mobileNumber),
      maritalStatus: String(this.checkoutForm.value.maritalStatus),
      dpi: String(this.checkoutForm.value.dpi),
      isBaptized: String(this.checkoutForm.value.isBaptized),
      fathersName: String(this.checkoutForm.value.fathersName),
      mothersName: String(this.checkoutForm.value.mothersName),
      dpiParent: String(this.checkoutForm.value.dpiParent),
      additionalInfo: String(this.checkoutForm.value.additionalInfo),
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
