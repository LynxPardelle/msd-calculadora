import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lineBreakerSpecialized',
    standalone: false
})
export class LineBreakerSpecializedPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.includes('COS')) {
      value =
        value.replace('COS ', 'COS║║║').split('║║║')[0] +
        `<br />` +
        value.replace('COS ', 'COS║║║').split('║║║')[1];
    }
    return value;
  }
}
