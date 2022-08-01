import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import awsExports from '../../aws-exports';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
