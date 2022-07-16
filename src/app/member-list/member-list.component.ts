import { Component, OnInit } from '@angular/core';
import { members } from '../members';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members = this.memberService.getMembers();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {}
}
