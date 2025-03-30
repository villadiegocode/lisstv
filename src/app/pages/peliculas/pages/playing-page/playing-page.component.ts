import { MoviesCredits } from './../../interfaces/moviesCredits.interface';
import { ChangeDetectionStrategy, Component, computed, HostListener, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { MoviePlayingCardComponent } from '../../components/moviePlayingCard/moviePlayingCard.component';
import { UtilServiceService } from '../../../../libraries/utilService.service';
import { environment } from '../../../../../environments/environment.development';

interface Filter {
    name: string;
    code: string;
}

@Component({
    selector: 'app-playing-page',
    imports: [
        MoviePlayingCardComponent,
        ProgressSpinnerModule,
        CommonModule,
        ToolbarModule,
        ButtonModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        SelectModule,
        DrawerModule,
        AvatarModule,
        CommonModule,
        ChipModule,
        TooltipModule,
        ImageModule

    ],
    template: `
        @if (!isLoading() || movies().length > 0) {
            <div class="mb-4 grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                @for (movie of movies(); track movie.id) {
                    <app-movie-playing-card [movie]="movie" (emit)="onViewMovie($event)" />
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

        <p-drawer [header]="title()" [(visible)]="visibleModalMovieDetail" position="bottom" [style]="{ height: '85vh', 'border-top-left-radius': '0.7rem', 'border-top-right-radius': '0.7rem' }" [blockScroll]="true">
            <div class="flex flex-col md:flex-row h-full">
                <div class="w-full md:w-1/3 bg-white dark:bg-[#18181b] p-4 flex items-center justify-center">
                    <div class="relative w-full h-full">
                        <img [src]="backDropPatch + movieDetail()?.poster_path" [alt]="movieDetail()?.title" class="w-full h-full object-contain md:object-cover" />
                    </div>
                </div>

                <!-- Columna Derecha (scrollable en desktop, full en mobile) -->
                <div class="w-full md:w-2/3 p-4 md:overflow-y-auto md:h-full">
                    <h2 class="text-3xl font-bold">{{ movieDetail()?.title | uppercase }}</h2>
                    <div class="flex flex-col gap-2 mb-3">
                        <h3 class="text-xl font-bold mb-0">Sinopsis</h3>
                        <p class="mb-4">{{ movieDetail()?.overview }}</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        @for (genre of movieDetail()?.genres; track genre.id) {
                            <p-chip [label]="genre.name" />
                        }
                    </div>
                    <div class="flex flex-col gap-3 mt-4">
                        <h3 class="text-xl font-bold mb-0">Reparto</h3>
                        <div class="flex flex-wrap gap-3">
                            @for (credit of movieCredits()?.cast?.slice(0, 8) ?? []; track credit.id) {
                                <p-chip [label]="credit.name" [image]="backDropPatch + credit.profile_path" [alt]="credit.name" />
                            } @empty {
                                <p>No disponible</p>
                            }
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 mt-4">
                        <h3 class="text-xl font-bold mb-0">Trailers</h3>
                        <div class="flex flex-wrap gap-3">
                            @for (trailer of movieTrailers()?.results?.slice(0, 3); track trailer.id) {
                                <p-button [label]="trailer.name" variant="outlined" severity="danger" icon="pi pi-youtube" (onClick)="openTrailer(trailer.key)" />
                            } @empty {
                                <p>Sin trailer</p>
                            }
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 mt-4">
                        <h3 class="text-xl font-bold mb-0">Plataformas</h3>
                        <div class="flex flex-wrap gap-3">
                            @for (provider of movieProviders()?.results?.US?.buy; track provider.provider_id) {
                                <p-chip
                                    [label]="provider.provider_name"
                                    [image]="backDropPatch + provider.logo_path"
                                    [alt]="provider.provider_name"
                                    [ngStyle]="{
                                        border: '1px solid ' + (providerColors[provider.provider_name] || '#ccc'),
                                        color: providerColors[provider.provider_name] || '#333'
                                    }"
                                />
                            } @empty {
                                <p>No disponibles</p>
                            }
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 mt-4">
                        <h3 class="text-xl font-bold mb-0">Galería de Imágenes</h3>
                        <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-1">
                        @for(image of movieImages()?.posters?.slice(0,8); track image?.file_path){
                            <p-image [src]="backDropPatch +image.file_path" [preview]="true" alt="Image" width="100" styleClass="rounded-t-lg">
                            <ng-template #indicator>
                                <i class="pi pi-search"></i>
                            </ng-template>
                            <ng-template #image>
                                <img [src]="backDropPatch +image.file_path" alt="image" width="100" />
                            </ng-template>
                            <ng-template #preview let-style="style" let-previewCallback="previewCallback">
                                <img [src]="backDropPatch +image.file_path" alt="image" [style]="style" (click)="previewCallback()" />
                            </ng-template>
                        </p-image>

                        }

                        </div>

                    </div>
                </div>
            </div>
        </p-drawer>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingPageComponent {
    moviesService = inject(MoviesService);
    utilService = inject(UtilServiceService);

    cities: Filter[] | undefined;
    selectedCity: Filter | undefined;

    readonly responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    readonly movies = this.moviesService.moviesPlaying;
    readonly movieDetail = this.moviesService.movieDetail;
    readonly movieCredits = this.moviesService.movieCredits;
    readonly movieTrailers = this.moviesService.movieTrailer;
    readonly movieProviders = this.moviesService.movieProvider;
    readonly movieImages = this.moviesService.movieImages;
    isLoading = computed(() => this.moviesService.isLoading());
    hasMorePage = computed(() => this.moviesService.hasMorePage());
    visibleModalMovieDetail = false;
    title = signal<string>('Detalle de la película');
    backDropPatch = environment.posterPatch;

    providerColors: { [key: string]: string } = {
        Netflix: '#E50914',
        YouTube: '#e1002d',
        'Google Play Movies': '#056449',
        'Amazon Video': '#00A8E1',
        'Microsoft Store': '#4288ca',
        'Apple TV': '#161617cc',
        'Disney+': '#113CCF',
        'HBO Max': '#8732A8',
        'Plex': '#f7c600',
        'Fandango At Home': '#335B8F'
    };

    @HostListener('window:scroll')
    onScroll() {
        if (this.isLoading() || !this.hasMorePage()) return;

        const scrollPosition = window.innerHeight + window.scrollY;
        const scrollThreShold = document.documentElement.scrollHeight;

        if (scrollPosition >= scrollThreShold) {
            this.moviesService.getNowPlayingMovies();
        }
    }

    onViewMovie(value: any) {
        this.getMovieDetail(value.movieID);
        this.visibleModalMovieDetail = value.modalView;
    }

    getMovieDetail(id: number) {
        this.moviesService.get(id);
    }

    openTrailer(key: string) {
        window.open(`https://www.youtube.com/watch?v=${key}`);
    }
}
