import { Component, OnInit } from '@angular/core';
import { members } from '../members';
import { Member } from '../members';
import { MemberService } from '../member.service';
import { UserService } from '../user.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  dataSource = new MatTableDataSource<{
    email: string;
    id: string;
    dpi: string;
    firstName: string;
    lastName: string;
  }>();

  constructor(
    private memberService: MemberService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.memberService
      .getRemoteMembers(this.userService.getCurrentUserId())
      .then((things) => {
        this.dataSource.data = things.data;
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
      });
  }

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dpi',
    'registerEmail',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
