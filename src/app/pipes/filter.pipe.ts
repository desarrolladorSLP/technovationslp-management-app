import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, name: any): any {
    const resultName = [];
    if (name.length > 0) {
      for (const nameSearch of value) {
        if (nameSearch.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
          resultName.push(nameSearch);
        }
      return resultName;
    }
    return value;
  }
}
