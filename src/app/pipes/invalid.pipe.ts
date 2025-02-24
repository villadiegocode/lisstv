import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invalid'
})
export class InvalidPipe implements PipeTransform {

  transform(value: string): string {
    return `${value} es invalido`;
  }

}
