import { Injectable } from '@angular/core';
import { Member } from './members';
import { members } from './members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  members = members;
  constructor() {}

  addToRegister(member: Member) {
    this.members.push(member);
  }

  getMembers() {
    return this.members;
  }
}
