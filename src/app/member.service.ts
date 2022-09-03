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

  getRemoteMembers(registerId: String) {
    const apiName = 'memberService';
    const path = '/members/register/' + registerId;
    const myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // OPTIONAL
        name: 'param',
      },
    };

    return API.get(apiName, path, myInit);
  }

  saveMember(member: Member) {
    const apiName = 'memberService';
    const path = '/members';
    const myInit = {
      body: member, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };

    return API.put(apiName, path, myInit);
  }
}
