import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { movie, MoviePlayingResponse } from '../interfaces/moviePlaying.interface';
import { delay, map } from 'rxjs';


@Injectable({providedIn: 'root'})
export class MoviesService {
    private readonly _http = inject(HttpClient);

    private  readonly movieUrl = environment.movieApiUrl;
    private readonly movieApiKey = environment.movieApiKey;
    moviesPlaying = signal<movie[]>([]);
    currentPage = signal<number>(1);
    hasMorePage = signal<boolean>(true);
    isLoading = signal<boolean>(true);
    params = {
        language: 'es-ES'
    }


    constructor() {
        this.getNowPlayingMovies();
     }

    createHeader(){
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.movieApiKey}`,
                'accept': 'application/json'
            })
        }
    }


    getNowPlayingMovies(){

        return this._http.get<MoviePlayingResponse>( `${this.movieUrl}now_playing`, {
            ...this.createHeader(),
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

}
