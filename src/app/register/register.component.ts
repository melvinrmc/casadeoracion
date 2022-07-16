import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../members';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  members = this.memberService.getMembers();

  checkoutForm = this.formBuilder.group({
    id: 1,
    dpi: '',
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    marriedName: '',
    genere: '',
    maritalStatus: '',
    birthday: '',
    age: 0,
    mobileNumber: '',
    mobileCompany: '',
    email: '',

    streetAvenue: 0,
    streetName: '',
    number: '',
    zone: 0,
    city: 'Patzicia',
    state: 'Chimaltenango',
    neighbourhood: '',
    additionalInfo: '',
  });

  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Process checkout data here
    let member: Member;

    member = {
      id: Number(this.checkoutForm.value.id),

      dpi: String(this.checkoutForm.value.dpi),
      firstName: String(this.checkoutForm.value.firstName),
      secondName: String(this.checkoutForm.value.secondName),
      lastName: String(this.checkoutForm.value.lastName),
      secondLastName: String(this.checkoutForm.value.secondLastName),
      marriedName: String(this.checkoutForm.value.marriedName),
      genere: String(this.checkoutForm.value.genere),
      maritalStatus: String(this.checkoutForm.value.maritalStatus),
      birthday: String(this.checkoutForm.value.birthday),
      age: Number(this.checkoutForm.value.age),
      mobileNumber: String(this.checkoutForm.value.mobileNumber),
      mobileCompany: String(this.checkoutForm.value.mobileCompany),
      email: String(this.checkoutForm.value.email),

      address: {
        streetAvenue: Number(this.checkoutForm.value.streetAvenue),
        streetName: String(this.checkoutForm.value.streetName),
        number: String(this.checkoutForm.value.number),
        zone: Number(this.checkoutForm.value.zone),
        city: String(this.checkoutForm.value.city),
        state: String(this.checkoutForm.value.state),
        neighbourhood: String(this.checkoutForm.value.neighbourhood),
        additionalInfo: String(this.checkoutForm.value.additionalInfo),
      },
    };

    this.memberService.addToRegister(member);

    console.warn('Your order has been submitted', this.checkoutForm.value);
    console.warn('Your order has been submitted', member);
    window.alert('Your product has beed added to the cart!');
    this.checkoutForm.reset();
  }
}
