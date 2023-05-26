import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit {

  menuTypes: IMenuType[];
  selectedMenuType: IMenuType
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(private ticketService: TicketsService,
              private messageService: MessageService,
              private settingsService: SettingsService,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  changeType(ev: { ev: Event, value: IMenuType }): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date: ev})
  }

  initRestError(): void {
    this.messageService.add({severity: 'error', summary: 'Ресурс не найден'});
    this.ticketService.getError().subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.log('err', err)
      }
    });
  }

  initSettingsData() {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    });
  }

  initTours() {
    this.http.post<ITour[]>("http://localhost:3000/tours/", {}).subscribe((data) => {
      console.log(data);
      this.ticketService.updateTicketList(data);
    })
  }

  getToursFromDb() {
    this.http.get<ITour[]>("http://localhost:3000/tours/", {}).subscribe((data) => {
      console.log(data);
      this.ticketService.updateTicketList(data);
    })
  };

  deleteTours() {
    this.http.delete("http://localhost:3000/tours/").subscribe((data) => {
      this.ticketService.updateTicketList([]);
    })
  }


}
