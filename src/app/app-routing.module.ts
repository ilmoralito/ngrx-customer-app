import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "customers",
    loadChildren: () =>
      import("./project/customers/customers.module").then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./project/orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "movies",
    loadChildren: () =>
      import("./project/movies/movies.module").then((m) => m.MoviesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
