import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";
import {IOrder} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours/');
  }

  getTicket(id: string): Observable<ITour> {
    return this.http.get<ITour>('http://localhost:3000/tours/' + id);
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('http://localhost:3000/tours/')
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    switch (type) {
      case 0:
        return this.http.get<INearestTour>('http://localhost:3000/tours/')
      case 1:
        return this.http.get<INearestTour>('http://localhost:3000/tours/')
      case 2:
        return this.http.get<INearestTour>('http://localhost:3000/tours/')
      default:
        return this.http.get<INearestTour>('http://localhost:3000/tours/')
    }
  }

  sendTourData(data: IOrder): Observable<any>{
    return this.http.post('http://localhost:3000/orders/', data)
  }

  createTour(body: any) {
    return this.http.post('http://localhost:3000/tour-item/', body, {headers: {}});
  }

  searchTour(name: string): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tour-item/' + name)
  }

}
