import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private ticketSubject = new Subject<ITourTypeSelect>();

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter(el => el.type === "single");
        return value.concat(singleTours);

      }
    ));
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError()
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }
}
