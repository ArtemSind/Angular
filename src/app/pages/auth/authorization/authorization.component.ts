import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText: string = 'Логин';
  pswText: string = 'Пароль';

  psw: string;
  login: string;
  cardNumber: string;
  selectedValue: boolean;
  authTextButton: string


  constructor(private authService: AuthService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться'
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {
  }

  onAuth(ev: Event): void {

    const authUser: IUser = {
      psw: this.psw,
      login: this.login
    }

    if (!this.authService.isUserExists(authUser)) {
      this.messageService.add({severity: 'error', summary: 'Неверный логин или пароль'});
      return;
    }

    this.userService.setUser(authUser);

    this.router.navigate(['tickets/tickets-list']);
  }
}
