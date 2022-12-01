import { Component, OnInit } from "@angular/core";
import { members } from "../members";
import { Member } from "../members";
import { MemberService } from "../member.service";
import { UserService } from "../user.service";
import { User } from "../user";

import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
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
    this.userService.getCurrentUser().then((user) => {
      if (this.userService.isSupervisor()) {
        console.log("es un Supervisor");
        this.memberService.scan().then((things) => {
          this.dataSource.data = things.data;
          console.log('Total Rows scanned: '+things.data.length)
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
        });
      } else {
        console.log("No, no es un Supervisor");
        this.memberService
          .getRemoteMembers(this.userService.getCurrentUserId())
          .then((things) => {
            this.dataSource.data = things.data;
            //this.dataSource.paginator = this.paginator;
            //this.dataSource.sort = this.sort;
          });
      }
    });
  }

  displayedColumns: string[] = [
    "position",
    "id",
    "firstName",
    "lastName",
    "dpi",
    "registerEmail",
    "mesa"
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
