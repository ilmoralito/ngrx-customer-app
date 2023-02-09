import { Component } from "@angular/core";
import { generateRandomName } from "../utils/string.utils";
import { Movie, MoviesStore } from "./store/movies.store";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
  providers: [MoviesStore],
})
export class MoviesComponent {
  movies$ = this.store.movies$;
  moviesIds$ = this.store.moviesIds$;
  selectedMovies$ = this.store.selectedMovies$;
  vm$ = this.store.vm$;

  constructor(private readonly store: MoviesStore) {}

  add() {
    this.store.add({ id: crypto.randomUUID(), name: generateRandomName() });
  }

  reset() {
    this.store.reset();
  }

  edit(movie: Movie) {
    const entity: Movie = { ...movie, name: generateRandomName() };

    this.store.update(entity);
  }

  delete(id: string) {
    this.store.delete(id);
  }
}
