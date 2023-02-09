import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "../../store/movies.store";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchMovies() {
    return this.httpClient.get<Movie[]>("assets/data.movies.json");
  }
}
