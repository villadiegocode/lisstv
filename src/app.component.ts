import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UtilServiceService } from './app/libraries/utilService.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ProgressSpinnerModule, CommonModule],
    template: `
    <div *ngIf="isLoading()" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <p-progressSpinner></p-progressSpinner>
    </div>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {
    utilService = inject(UtilServiceService);
    isLoading = computed(() => this.utilService.isLoading());
}
