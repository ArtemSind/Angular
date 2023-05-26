import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour} from "../../models/tours";
import {IOrder} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderRestService {

  constructor(private http: HttpClient) { }


  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:3000/orders/');
  }
}
