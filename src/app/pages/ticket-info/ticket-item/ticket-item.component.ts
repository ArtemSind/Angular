import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {TicketsService} from "../../../services/tickets/tickets.service";

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
              private ticketService: TicketsService) {
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

    // get nearest tours
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      this.toursLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1]);
    })


    // params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find(el => el.id === paramValueId);
      console.log('this.ticket', this.ticket);
    }
  }

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');

    this.searchTicketSub = fromEventObserver.subscribe(ev => {
      this.initSearchTour();
    });

  }

  onSubmit(): void {

  }

  selectDate(ev: Event): void {

  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour() {
    const type = Math.floor(Math.random() * this.searchTypes.length);

    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe(data => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation);
    })
  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket,...userData};

    this.ticketService.sendTourData(postData).subscribe();
  }
}
