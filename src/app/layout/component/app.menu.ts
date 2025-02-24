import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [{ label: 'Tendencias', icon: 'pi pi-thumbs-up', routerLink: ['/tendencias'] }]
            },
            {
                label: 'Películas',
                items: [
                    { label: 'En cines', icon: 'pi pi-video', routerLink: ['/tendencias/en-cines'] },
                    { label: 'Populares', icon: 'pi pi-star', routerLink: ['/tendencias/populares'] },
                    { label: 'Próximos estrenos', icon: 'pi pi-stopwatch', routerLink: ['/tendencias/proximos-estrenos'] },
                ]
            },
        ];
    }
}
