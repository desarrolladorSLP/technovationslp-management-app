import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, Name: any, Email: any, number: any): any {
    const resultName = [];
    if (Name.length > 0) {
      for (const user of value) {
        // tslint:disable-next-line: max-line-length
        if (user.name.toLowerCase().indexOf(Name.toLowerCase()) > -1 && user.preferredEmail.toLowerCase().indexOf(Email.toLowerCase()) > -1 && user.phoneNumber !== number) {
          resultName.push(user);
        }
      }
      return resultName;
    }
    return value;
  }

}
