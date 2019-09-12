import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
  name: 'filteruseractive'
})
export class FilteruseractivePipe implements PipeTransform {

  transform(value: any, Name: any, Email: any, Number: any): any {
    const resultName = [];
    for (const userName of value) {
      if (userName.preferredEmail.indexOf(Email) > -1 && userName.name.indexOf(Name) > -1) {
        resultName.push(userName);
      }
    }
    return resultName;
  }

}
