import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, name: any): any {
    const resultName = [];
    if (name.length > 0) {
      for (const programName of value) {
        if (programName.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
          resultName.push(programName);
        }
      }
      return resultName;
    }
    return value;
  }
}
