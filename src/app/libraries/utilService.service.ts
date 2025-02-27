import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

    isLoading = signal<boolean>(false);

    enablePageLoading() {
        this.isLoading.set(true);
      }

      disablePageLoading() {
        this.isLoading.set(false);
      }

}
