import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, Name: any): any {
    const resultName = [];
    for (const programName of value) {
      if (programName.name.indexOf(Name) > -1) {
        console.log('sip');
        resultName.push(programName);
      }
    }
    return resultName;
  }

}
