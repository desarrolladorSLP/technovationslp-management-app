import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramsService} from '../../services/programs/programs.service';
import {Router} from '@angular/router';
import { ProgramsComponent } from '../programs/programs.component';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styles: []
})
export class ProgramCardComponent implements OnInit {

  public updatingProgram = false;
  public deletingProgram = false;

  @Input() program: Program;

  constructor(private programService: ProgramsService, private router: Router,
    private programComponent: ProgramsComponent) {
  }

  ngOnInit() {
  }

  saveProgram() {
    this.programService.save(this.program).subscribe(() => {
      this.updatingProgram = false;
    });
  }

  deleteProgram() {
    console.log(this.program);

    this.programService.delete(this.program).subscribe(data => {
      this.deletingProgram = false;
      this.programComponent.refreshPrograms();
    });

  }
  open(client) {
    this._modal.open();
}

close() {
    this._modal.close();
}

}
