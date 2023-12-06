import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionesComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    emisionDate: '',
  
    documentType: '1',
    currency: '',
    nit: '',
    cui: '',
    fullName: '',
    fullAddress: '',
    amount: '',
  });

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }

}
