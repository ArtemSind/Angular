import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {TicketRestService} from "../../../services/rest/ticket-rest.service";
import {IOrder} from "../../../models/order";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {

  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;

  ticketSearchValue: string;
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService,
              private ticketRestService: TicketRestService) {
  }

  ngOnInit(): void {

    // first get user info
    this.user = this.userService.getUser();

    // init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    });

    this.ticketService.getNearestTours().subscribe(data => {
      this.nearestTours = data
    })



    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();

      this.ticketRestService
        .getTicket(paramValueId)
        .subscribe((data) => {
          this.ticket = data;
        })

      console.log('this.ticket', this.ticket);
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');

    this.searchTicketSub = fromEventObserver.subscribe(data => {
      this.initSearchTour(data);
    });

  }

  onSubmit(): void {

  }

  selectDate(ev: Event): void {

  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour(data: any) {
    const type = Math.floor(Math.random() * this.searchTypes.length);

    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketService.searchTicket(this.ticketSearchValue).subscribe(data => {
      this.nearestTours = data;
    })
    
  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket,...userData};

    const userId = this.userService.getUser()?.id || null;

    const postObj: IOrder = {
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
      age: postData.age,
      birthDay: postData.birthDay
    }

    this.ticketService.sendTourData(postObj).subscribe();
  }
}
