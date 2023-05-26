import { Injectable } from '@angular/core';
import {OrderRestService} from "../rest/order-rest.service";
import {Observable} from "rxjs";
import {IOrder} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private orderRestService: OrderRestService) { }

  getOrders(): Observable<IOrder[]> {
    return this.orderRestService.getOrders();
  }

}
