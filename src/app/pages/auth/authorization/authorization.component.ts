import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

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
  showCardNumber: boolean;


  constructor(private authService: AuthService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться';
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {
  }

  onAuth(ev: Event): void {

    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }

    this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {

      authUser.id = data.id;

      this.userService.setUser(authUser);
      const token: string = data.access_token
      this.userService.setToken(token);
      //this.userService.setToStore(token);

      this.router.navigate(['tickets/tickets-list']);

    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error
      this.messageService.add({severity: 'warn', summary: serverError.errorText});
    });
  }
}
