import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { generateRandomName } from "../utils/string.utils";

import * as fromCustomers from "./store/customers.reducer";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent {
  entities$ = this.store.select(fromCustomers.selectAll);
  selectedUserId$ = this.store.select(fromCustomers.getSelectedCustomerId);

  constructor(private readonly store: Store<fromCustomers.State>) {}

  add() {
    this.store.dispatch(
      fromCustomers.customersActions.add({
        entity: { id: crypto.randomUUID(), name: generateRandomName() },
      })
    );
  }

  edit(entity: fromCustomers.Customer) {
    this.store.dispatch(
      fromCustomers.customersActions.edit({
        entity: {
          id: entity.id,
          changes: { ...entity, name: generateRandomName() },
        },
      })
    );
  }

  set(id: string) {
    this.store.dispatch(fromCustomers.customersActions.set({ id }));
  }

  delete(id: string) {
    this.store.dispatch(fromCustomers.customersActions.delete({ id }));
  }
}
