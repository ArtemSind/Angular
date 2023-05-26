import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlocksStyleDirective} from "../../../directives/blocks-style.directive";
import {debounce, debounceTime, fromEvent, Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {

  tickets: ITour[];
  tourUnsubscriber: Subscription;
  ticketsCopy: ITour[];
  loadCountBlock = false;

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;



  constructor(private ticketService: TicketsService,
              private router: Router,
              private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private http: HttpClient) {
  }



  ngOnInit(): void {

    this.ticketService.ticketUpdateSubject$.subscribe(data => {
      this.tickets = data;
    })

    this.http.post<ITour[]>("http://localhost:3000/tours/", {}).subscribe((data) => {
      console.log(data);
      this.ticketService.updateTicketList(data);
    })



    this.loadCountBlock = true;


    this.tourUnsubscriber = this.ticketService
      .getTicketTypeObservable()
      .subscribe((data: ITourTypeSelect) => {
        console.log('data', data)

        let ticketType: string;
        switch (data.value) {
          case "single":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
            break;
          case "multi":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
            break;
          case "all":
            this.tickets = [...this.ticketsCopy];
            break;
        }

        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          const dateValue = dateWithoutTime[0]
          console.log('dateValue',dateValue)
          this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
        }


        setTimeout(() => {

          this.blockDirective.updateItems();

          this.blockDirective.initStyle(0); // сбрасываем индекс на 0 элемент

        });


      });

  }

  ngAfterViewInit(): void {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev) => {
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else {
          this.tickets = [...this.ticketsCopy];
        }
      }
    )

  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }


  goToTicketInfoPage(item: ITour): void {
    this.router.navigate([`/tickets/ticket`], {queryParams: {id: item.id}});
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(3);

  }
}
