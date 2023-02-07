import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as fromOrders from "./state/orders.reducer";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent {
  orders$: Observable<fromOrders.Order[]>;
  vm$: Observable<{
    orders: fromOrders.Order[];
    selectedOrderId: string | null;
  }>;

  constructor(private readonly store: Store) {
    this.orders$ = this.store.select(fromOrders.selectOrders);
    this.vm$ = this.store.select(fromOrders.vm$);
  }

  add() {
    this.store.dispatch(
      fromOrders.OrderActions.add({
        order: { id: crypto.randomUUID(), name: "lorem ipsum" },
      })
    );
  }

  set(id: string) {
    this.store.dispatch(fromOrders.OrderActions.set({ id }));
  }
}
