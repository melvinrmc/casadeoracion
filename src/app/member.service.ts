import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Member } from './members';
import { members } from './members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  members = members;
  constructor(private http: HttpClient) {}

  addToRegister(member: Member) {
    this.members.push(member);
  }

  getMembers() {
    return this.members;
  }

  getRemoteMembers() {
    const apiName = 'memberService';
    const path = '/members/1001';
    const myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // OPTIONAL
        name: 'param',
      },
    };

    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}
