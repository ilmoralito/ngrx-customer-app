import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import * as fromCustomers from "../../store/customers.reducer";

@Injectable({
  providedIn: "root",
})
export class CustomersService {
  constructor(private readonly httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get<fromCustomers.Customer[]>(
      "assets/data/customers.json"
    );
  }
}
