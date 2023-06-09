import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  items: MenuItem[];
  time: Date
  user: IUser

  private timerInterval: number
  private settingsActive = false


  @Input() menuType: IMenuType;

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {

    this.items = this.initMenuItems();

    this.timerInterval = window.setInterval(() => {
        this.time = new Date();
    }, 1000)

    this.user = this.userService.getUser();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Заказы',
        routerLink:['orders-list']
      },
      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
      },

    ];
  }



}
