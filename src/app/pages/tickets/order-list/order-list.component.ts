import { Component, OnInit } from '@angular/core';
import {IOrder} from "../../../models/order";
import {OrderRestService} from "../../../services/rest/order-rest.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: IOrder[];
  constructor(private orderService: OrderRestService) { }

  ngOnInit(): void {

    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    })

  }

}
