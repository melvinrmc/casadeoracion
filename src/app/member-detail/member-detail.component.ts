import { Component, OnInit } from '@angular/core';

import { MemberService } from '../member.service';
import { Member } from '../members';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  memberId: string = '';

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
    private route: ActivatedRoute
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
      registerId: 'ba86e6c4-0b36-4534-81df-0c1e5776d6a0',
      registerEmail: 'melvinrmc@hotmail.com',
    };

    if (confirm('Esta seguro que quiere actualizar los datos?')) {
      // Save it!
      console.warn('Miembro: ', this.checkoutForm.value);
      console.warn('Miembro se ha enviado a la Base de Datos', this.member);

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
    this.checkoutForm = this.formBuilder.group({
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
      dpi: member.dpi,
      isBaptized: member.isBaptized,
      fathersName: member.fathersName,
      mothersName: member.mothersName,
      dpiParent: member.dpiParent,
      additionalInfo: member.additionalInfo,
    });
  }
}
