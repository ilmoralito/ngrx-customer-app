import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { exhaustMap } from "rxjs";
import { MoviesService } from "../services/movies/movies.service";

export interface Movie {
    id: string;
    name: string;
}

export interface State {
    movies: Movie[];
    moviesIds: string[];
    error: string | null
}

@Injectable()
export class MoviesStore extends ComponentStore<State> {
    constructor(private readonly movieService: MoviesService) {
        super({ movies: [], moviesIds: [], error: null });
    }

    readonly movies$ = this.select((state) => state.movies);

    readonly moviesIds$ = this.select((state) => state.moviesIds);

    readonly selectedMovies$ = this.select(
        this.movies$,
        this.moviesIds$,
        (movies, ids) => movies.filter((movie) => ids.includes(movie.id))
    );

    readonly vm$ = this.select({
        movies: this.movies$,
        moviesIds: this.moviesIds$,
        selectedMovies: this.selectedMovies$,
    });

    readonly add = this.updater((state, movie: Movie) => ({
        ...state,
        movies: [...state.movies, movie],
    }));

    readonly reset = this.updater(() => ({ movies: [], moviesIds: [], error: null }));

    readonly update = this.updater((state, entity: Movie) => ({
        ...state,
        movies: state.movies.map((movie) =>
            movie.id === entity.id ? { ...entity } : { ...movie }
        ),
    }));

    readonly delete = this.updater((state, id: string) => ({
        ...state,
        movies: state.movies.filter((movie) => movie.id !== id),
    }));

    readonly enter = this.updater((state, movies: Movie[]) => ({
        ...state,
        movies,
    }));

    readonly log = this.updater((state, error: string) => ({...state, error}))

    readonly getMovies = this.effect<void>((source$) =>
        source$.pipe(
            exhaustMap(() =>
                this.movieService.fetchMovies().pipe(
                    tapResponse(
                        (movies) => this.enter(movies),
                        (error) => this.log(error)
                    )
                )
            )
        )
    );
}
