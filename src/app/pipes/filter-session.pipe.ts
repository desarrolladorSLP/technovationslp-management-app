import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSession'
})
export class FilterSessionPipe implements PipeTransform {
  transform(value: any, name: any): any {
    const resultName = [];
    if (name.length > 0) {
        for (const sessionTitle of value) {
          if (sessionTitle.title.toLowerCase().indexOf(name.toLowerCase()) > -1) {
            resultName.push(sessionTitle);
          }
        }
        return resultName;
    }
    return value;
  }

}
