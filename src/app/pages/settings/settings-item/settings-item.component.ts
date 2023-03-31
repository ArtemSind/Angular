import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit {

  login: string;
  pswOld: string;
  pswNew: string;
  pswNewRepeat: string;

  constructor(private authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  changePassword(ev: Event): void {

    const userObj: IUser = {
      login: this.login,
      psw: this.pswOld
    }

    if (!this.authService.isUserExists(userObj)) {
      this.messageService.add({severity: 'error', summary: 'Неверный логин или пароль'});
      return;
    }

    if (this.pswNew !== this.pswNewRepeat) {
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'});
      return;
    }

    this.authService.deleteUser(userObj);

    userObj.psw = this.pswNew;

    this.authService.setUser(userObj);

    this.messageService.add({severity: 'success', summary: 'Пароль успешно изменён'});
  }

}
