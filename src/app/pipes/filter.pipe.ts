import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, Name: any, Email: any): any {
    const resultName = [];
    if (Name.length > 0) {
      for (const user of value) {
        if (user.name.toLowerCase().indexOf(Name.toLowerCase()) > -1) {
          if (user.preferredEmail.toLowerCase().indexOf(Email.toLowerCase()) > -1) {
            resultName.push(user);
          }
        }
      }
      return resultName;
    }
    return value;
  }

}
