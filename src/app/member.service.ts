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

  getRemoteMembers(registerId: string) {
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

  getRemoteMemberById(memberId: string) {
    const apiName = 'memberService';
    const path = '/members/object/' + memberId;
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

  getRemoteMemberByDPI(dpi: string) {
    const apiName = 'memberService';
    const path = '/members/dpi/' + dpi;
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

  getRemoteMemberByNumRegistro(numRegistro: string) {
    const apiName = 'memberService';
    const path = '/members/registro/' + numRegistro;
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

  getRemoteMemberByAccessKey(accessKey: string) {
    const apiName = 'memberService';
    const path = '/members/consulta/' + accessKey;
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

  getPublicMemberByAccessNumber(id: string, accessNumber: string) {
    const apiName = 'memberService';
    const path = '/consulta';
    const myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // OPTIONAL
        id: id,
        accessNumber: accessNumber,
      },
    };
    return API.get(apiName, path, myInit);
  }

  getPublicMemberByDpiBirthday(dpi: string, birthday: string) {
    const apiName = 'memberService';
    const path = '/soymiembro/dpi/'+dpi;
    const myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
        // OPTIONAL        
        birthday: birthday,
      },
    };
    return API.get(apiName, path, myInit);
  }

  postNextId() {
    const apiName = 'memberService';
    const path = '/members/nextvalue';
    const myInit = {
      body: '', // replace this with attributes you need
      headers: {}, // OPTIONAL
    };

    return API.post(apiName, path, myInit);
  }

  saveMember(member: Member) {
    if (member.dpi === undefined || member.dpi == '' || member.dpi == 'null') {
      delete member.dpi;
    }

    if (
      member.numRegistro === undefined ||
      member.numRegistro == '' ||
      member.numRegistro == 'null'
    ) {
      delete member.numRegistro;
    }

    const apiName = 'memberService';
    const path = '/members';
    const myInit = {
      body: member, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };

    return API.put(apiName, path, myInit);
  }
}
