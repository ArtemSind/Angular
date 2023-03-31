import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ITour} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlocksStyleDirective} from "../../../directives/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  tickets: ITour[];

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketsService,
              private router: Router,
              private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService) {
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
      }
    )

  }

  goToTicketInfoPage(item: ITour): void {
    this.router.navigate([`/tickets/ticket`], {queryParams: {id: item.id}});
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(3);

  }
}
