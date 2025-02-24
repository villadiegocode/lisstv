import { Pipe, PipeTransform } from '@angular/core';
import { TypeGenre } from '../enums/type';

@Pipe({
  name: 'required'
})
export class RequiredPipe implements PipeTransform {

  transform(value: string, type: string): unknown {
    return type === TypeGenre.M ? `${value} es requerido` : `${value} es requerida`;
  }

}
