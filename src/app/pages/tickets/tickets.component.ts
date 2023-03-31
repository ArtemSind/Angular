import {Component, OnInit} from '@angular/core';
import {TicketsService} from "../../services/tickets/tickets.service";
import {ITour} from "../../models/tours";
import {IMenuType} from "../../models/menuType";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  selectedType: IMenuType


  constructor() {
  }

  ngOnInit(): void {

  }
  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}
