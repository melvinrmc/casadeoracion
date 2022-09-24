import { Component, OnInit } from '@angular/core';

import { MemberService } from '../member.service';
import { Member } from '../members';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  memberId: string = '';
  accessNumber: string = '';

  checkoutForm = this.formBuilder.group({
    id: '',
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
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const memberIdFromRoute = String(routeParams.get('memberId'));
    this.memberService
      .getRemoteMemberById(memberIdFromRoute)
      .then((memberObject) => {
        console.log(memberObject);
        this.loadMemberData(memberObject.data);
      });
  }

  onSubmit(): void {
    // Process checkout data here

    this.member = {
      id: this.memberId,
      numRegistro: String(this.checkoutForm.getRawValue().numRegistro),
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
      accessNumber: this.accessNumber,
      registerId: this.userService.getCurrentUserId(),
      registerEmail: this.userService.getCurrentUserEmail(),
    };

    if (confirm('Esta seguro que quiere actualizar los datos?')) {
      // Save it!
      console.warn('Miembro: ', this.checkoutForm.value);
      console.warn(
        'Miembro se ha enviado a la Base de Datos a Actualizar',
        this.member
      );

      this.memberService
        .saveMember(this.member)
        .then((things) => {
          console.warn('Respuesta devuelta: ', things.data);
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
          window.alert('Miembro ha sido actualizado exitosamente!');
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      // Do nothing!
      console.log('Puede seguir navegando');
    }
  }

  private loadMemberData(member: Member): void {
    this.memberId = member.id;
    this.accessNumber = member.accessNumber;
    this.checkoutForm = this.formBuilder.group({
      id: [{ value: member.id, disabled: true }],
      numRegistro: [{ value: member.numRegistro, disabled: true }],
      isMember: member.isMember,
      lastName: member.lastName,
      marriedName: member.marriedName,
      firstName: member.firstName,
      fullAddress: member.fullAddress,
      birthday: member.birthday,
      genere: member.genere,
      age: member.age,
      mobileNumber: member.mobileNumber,
      maritalStatus: member.maritalStatus,
      dpi: member.dpi !== undefined ? member.dpi : '',
      isBaptized: member.isBaptized,
      fathersName: member.fathersName,
      mothersName: member.mothersName,
      dpiParent: member.dpiParent,
      additionalInfo: member.additionalInfo,
    });
  }
}
