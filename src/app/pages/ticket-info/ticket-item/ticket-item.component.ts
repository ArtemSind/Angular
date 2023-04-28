import {AfterViewInit, Component, OnInit} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin} from "rxjs";
import {TicketsService} from "../../../services/tickets/tickets.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {

  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;

  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService) { }

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
      this.nearestTours = data[0];
      this.toursLocation = data[1];
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

  }

  onSubmit(): void {

  }

  selectDate(ev: Event): void {

  }

}
