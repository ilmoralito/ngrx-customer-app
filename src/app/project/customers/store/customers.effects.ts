import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { CustomersService } from "../services/customers/customers.service";

import * as fromCustomers from "./customers.reducer";

@Injectable()
export class CustomerEffects {
    fetch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCustomers.customersActions.enter),
            mergeMap(() =>
                this.customerServices.getData().pipe(
                    map((customers) =>
                        fromCustomers.customersActions.successfulFetch({
                            entities: customers,
                        })
                    ),
                    catchError((error) =>
                        of(
                            fromCustomers.customersActions.failedFetch({
                                error,
                            })
                        )
                    )
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly customerServices: CustomersService
    ) {}
}
