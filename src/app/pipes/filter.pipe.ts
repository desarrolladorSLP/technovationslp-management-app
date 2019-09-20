import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, name: any): any {
    const resultName = [];
    for (const programName of value) {
      if (programName.name.indexOf(name) > -1) {
        console.log('sip');
        resultName.push(programName);
      }
    }
    return resultName;
  }

}
