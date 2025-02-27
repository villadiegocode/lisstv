import { ChangeDetectionStrategy, Component, computed, HostListener, inject } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviePlayingCardComponent } from "../../components/moviePlayingCard/moviePlayingCard.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UtilServiceService } from '../../../../libraries/utilService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playing-page',
  imports: [MoviePlayingCardComponent, ProgressSpinnerModule, CommonModule],
  template: `
  @if (!isLoading() || movies().length > 0) {
  <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-5">
    @for (movie of movies(); track movie.id) {
      <app-movie-playing-card [movie]="movie" />
    }
  </div>
}

  @if (!isLoading()) {
    <!-- Spinner en la parte inferior al hacer scroll -->
    <div class="flex justify-center items-center my-4">
    <p-progress-spinner strokeWidth="4" fill="transparent" animationDuration=".5s" [style]="{ width: '40px', height: '40px' }" />
    </div>
  }


@if (isLoading() && movies().length === 0) {
  <!-- Spinner centrado solo al inicio -->
  <div class="flex justify-center items-center min-h-screen">
    <p-progressSpinner styleClass="h-16 w-16" />
  </div>
}



  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayingPageComponent {
    moviesService = inject(MoviesService);
    utilService = inject(UtilServiceService);


    readonly movies = this.moviesService.moviesPlaying;
    isLoading = computed(()=> this.moviesService.isLoading());
    hasMorePage = computed(()=> this.moviesService.hasMorePage())


    @HostListener('window:scroll')
    onScroll(){

        if( this.isLoading() || !this.hasMorePage()) return;

        const scrollPosition = window.innerHeight + window.scrollY;
        const scrollThreShold = document.documentElement.scrollHeight;

        if(scrollPosition >= scrollThreShold){
            this.moviesService.getNowPlayingMovies()
        }

    }




 }
