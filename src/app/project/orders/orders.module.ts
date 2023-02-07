import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders.component";
import { StoreModule } from "@ngrx/store";
import { ordersFeature } from "./state/orders.reducer";

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    StoreModule.forFeature(ordersFeature),
  ],
})
export class OrdersModule {}
