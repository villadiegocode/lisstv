import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

interface movieEmit {
    movieID: number;
    modalView: boolean;
}

import { environment } from '../../../../../environments/environment.development';
import { movie } from '../../interfaces/moviePlaying.interface';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-playing-card',
  imports: [RatingModule, ButtonModule, FormsModule, DatePipe, TooltipModule],
  template: `
  <div class="max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-lg bg-white dark:bg-[#18181b] transition hover:scale-[1.02]">
    <div class="aspect-[2/3] w-full">
        <img class="h-full w-full object-cover rounded-t-lg"
             [src]="posterPatch + movie().poster_path"
             [alt]="movie().title"/>
    </div>

    <div class="px-3 py-2">
        <div class="flex justify-between items-center">
            <h6 class="text-sm md:text-base font-semibold dark:text-white truncate mb-0">
                {{ movie().title }}
            </h6>
            <p class="text-xs md:text-sm dark:text-gray-300">
                {{ movie().release_date | date: 'yyyy' }}
            </p>
        </div>

        <div class="flex items-center gap-2 mt-1 flex-wrap">
            <p-rating [(ngModel)]="valueStar" [stars]="5" />
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">{{ movie().vote_average }}</p>
        </div>

        <div class="flex justify-between items-center mt-3 mb-2 flex-wrap">
            <div class="flex gap-2">
                <p-button icon="pi pi-eye" [rounded]="true" [text]="true" pTooltip="Marcar como vista" />
                <p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="danger" pTooltip="Agregar a favoritos" />
            </div>
            <p-button label="¿Dónde verla?" variant="outlined" class="w-full sm:w-auto text-xs md:text-sm" (onClick)="onViewMovie(movie().id)" />
        </div>
    </div>
</div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviePlayingCardComponent {
    movie = input.required<movie>();
    posterPatch = environment.posterPatch;
    valueStar = 5;

    emit = output<movieEmit>();

    onViewMovie(id: number){
        this.emit.emit({movieID: id, modalView: true });
    }

 }
