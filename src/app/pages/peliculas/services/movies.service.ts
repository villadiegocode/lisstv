import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { movie, MoviePlayingResponse } from '../interfaces/moviePlaying.interface';
import { delay, forkJoin, map } from 'rxjs';
import { MoviePlayingDetail } from '../interfaces/moviePlayingDetail.interface';
import { MoviesCredits } from '../interfaces/moviesCredits.interface';
import { MoviePlayinTrailers } from '../interfaces/moviePlayingTrailer.interface';
import { MovieProviders } from '../interfaces/moviesProviders.interface';
import { MoviePlayingImages } from '../interfaces/movieImages.interface';


@Injectable({providedIn: 'root'})
export class MoviesService {
    private readonly _http = inject(HttpClient);

    private  readonly movieUrl = environment.movieApiUrl;
    moviesPlaying = signal<movie[]>([]);
    movieDetail = signal<MoviePlayingDetail | null>(null);
    movieCredits = signal<MoviesCredits | null>(null);
    movieTrailer = signal<MoviePlayinTrailers | null>(null);
    movieProvider = signal<MovieProviders | null>(null);
    movieImages = signal<MoviePlayingImages | null>(null);
    currentPage = signal<number>(1);
    hasMorePage = signal<boolean>(true);
    isLoading = signal<boolean>(true);
    params = {
        language: 'es-ES'
    }


    constructor() {
        this.getNowPlayingMovies();
     }

    getNowPlayingMovies(){

        return this._http.get<MoviePlayingResponse>( `${this.movieUrl}now_playing`, {
            params: {...this.params}
        }).pipe(
            map( resp => {
            const currentMoviesPlaying = this.moviesPlaying();
            this.moviesPlaying.set([...currentMoviesPlaying, ...resp.results]);
            this.hasMorePage.set(resp.page < resp.total_pages);
            this.currentPage.update( (currentPage)=> currentPage + 1);
            this.isLoading.set(false);
        })).subscribe();
    }

    get(movieId: number) {
        forkJoin({
            details: this._http.get<MoviePlayingDetail>(`${this.movieUrl}${movieId}`, {
                params: { ...this.params }
            }),

            credits: this._http.get<MoviesCredits>(`${this.movieUrl}${movieId}/credits`, {
                params: { ...this.params }
            }),

            trailers: this._http.get<MoviePlayinTrailers>(`${this.movieUrl}${movieId}/videos`, {
                params: { ...this.params }
            }),

            providers: this._http.get<MovieProviders>(`${this.movieUrl}${movieId}/watch/providers`, {
                params: { ...this.params }
            }),

            images: this._http.get<MoviePlayingImages>(`${this.movieUrl}${movieId}/images`, {
                params: { ...this.params, 'include_image_language': 'es' }
            }),

        }).pipe(
            map(({ details, credits, trailers, providers, images }) => {
                this.movieDetail.set(details);
                this.movieCredits.set(credits);
                this.movieTrailer.set(trailers);
                this.movieProvider.set(providers);
                this.movieImages.set(images);
                console.log(this.movieImages());
            })
        ).subscribe();
    }

}
