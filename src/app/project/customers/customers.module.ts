import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomersComponent } from "./customers.component";
import { customersFeature } from "./store/customers.reducer";

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    StoreModule.forFeature(customersFeature),
  ],
})
export class CustomersModule {}
