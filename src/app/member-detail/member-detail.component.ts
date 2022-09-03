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
    const memberIdFromRoute = Number(routeParams.get('memberId'));
    this.memberService
      .getRemoteMemberById(memberIdFromRoute)
      .then((memberObject) => {
        this.member = memberObject;
      });
  }

  onSubmit(): void {}
}
