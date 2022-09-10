import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Auth } from 'aws-amplify';
import { MemberService } from '../member.service';

Auth.currentAuthenticatedUser({
  bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
})
  .then((user) => console.log(user))
  .catch((err) => console.log(err));

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.memberService
      .getPublicMemberByAccessNumber('12345', '3333')
      .then((things) => {
        console.warn('Respuesta devuelta: ', things.data);
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        window.alert('Ver console Logs!');
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}
