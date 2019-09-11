import {Component, Input, OnInit} from '@angular/core';
import {Program} from "../../model/program";
import {ProgramsService} from "../../services/programs/programs.service";

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styles: []
})
export class ProgramCardComponent implements OnInit {

  public updatingProgram = false;
  @Input() program: Program;

  constructor(private programService: ProgramsService) {
  }

  ngOnInit() {
  }

  saveProgram() {
    this.programService.save(this.program).subscribe(() => this.updatingProgram = false);

  }
}
