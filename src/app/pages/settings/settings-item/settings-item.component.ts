import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../../services/settings/settings.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit, OnDestroy {

  private subjectForUnsubscribe = new Subject();

  pswOld: string;
  pswNew: string;
  pswNewRepeat: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private settingsService: SettingsService,
              private userService: UserService) {
  }

  ngOnInit(): void {

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data);
    })

    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log('settings data from subject', data);
      }
    )

  }

  changePassword(ev: Event): void {

    const userObj: IUser = {
      login: this.userService.getUser().login,
      psw: this.pswOld
    }

    if (!this.authService.isUserExists(userObj)) {
      this.messageService.add({severity: 'error', summary: 'Неверный пароль'});
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

  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

}
