import { Component, OnInit } from '@angular/core';
import { members } from '../members';
import { Member } from '../members';
import { MemberService } from '../member.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  remoteMembers = this.memberService.getRemoteMembers();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['firstName', 'lastName', 'dpi', 'email'];
  dataSource = new MatTableDataSource(members);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
