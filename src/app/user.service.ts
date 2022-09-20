import { Injectable } from '@angular/core';
import { User } from './user';

import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = {} as User;

  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      // do some async task

      Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => {
          this.currentUser.id = user.username;
          this.currentUser.email = user.attributes.email;
          console.log('From UserService.constructor()');
          console.log(user);
          console.log(this.currentUser);
          resolve(this.currentUser);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  constructor() {}

  getCurrentUserId(): string {
    return this.currentUser.id;
  }

  getCurrentUserEmail(): string {
    return this.currentUser.email;
  }
}
