import { Component, OnInit } from '@angular/core';

import { Auth } from 'aws-amplify';

Auth.currentAuthenticatedUser({
  bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
})
  .then((user) => console.log(user))
  .catch((err) => console.log(err));

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
