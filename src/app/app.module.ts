import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FormsModule } from '@angular/forms';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { MemberListComponent } from './member-list/member-list.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MatCardModule } from '@angular/material/card';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MemberComponent } from './member/member.component';
import { PromesasComponent } from './promesas/promesas.component';
import { DonacionesComponent } from './donaciones/donaciones.component'
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

Amplify.configure(awsconfig);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AmplifyAuthenticatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'members/:memberId', component: MemberDetailComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'members', component: MemberListComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'soymiembro', component: MemberComponent },
      { path: 'promesas', component: MemberComponent },
      { path: 'donaciones', component: MemberComponent },
    ]),
    NoopAnimationsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    MemberListComponent,
    RegisterComponent,
    HomeComponent,
    MemberDetailComponent,
    MemberComponent,
    PromesasComponent,
    DonacionesComponent,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-GT' }],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
