import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  constructor() { }
  public showform = false;
  ngOnInit() {
  }
   showFormP() {
    if ( !this.showform ) {
      this.showform = true;
    } else {
      this.showform = false;
    }
   }
}
