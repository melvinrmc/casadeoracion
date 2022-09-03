import { Injectable } from '@angular/core';
import { User } from './user';

import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = {} as User;

  constructor() {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        this.currentUser.id = user.username;
        this.currentUser.email = user.attributes.email;
        console.log('From UserService.constructor()');
        console.log(user);
      })
      .catch((err) => console.log(err));
  }

  getCurrentUserId() {
    return this.currentUser.id;
  }

  getCurrentUserEmail() {
    return this.currentUser.email;
  }
}
