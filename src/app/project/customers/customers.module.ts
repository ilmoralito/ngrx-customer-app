import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";

import { StoreModule } from "@ngrx/store";
import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomersComponent } from "./customers.component";
import { CustomerEffects } from "./store/customers.effects";
import { customersFeature } from "./store/customers.reducer";

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    StoreModule.forFeature(customersFeature),
    EffectsModule.forFeature([CustomerEffects]),
  ],
})
export class CustomersModule {}
