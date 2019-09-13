import {Component, Input, OnInit} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramsService} from '../../services/programs/programs.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styles: []
})
export class ProgramCardComponent implements OnInit {

  public updatingProgram = false;
  public deletingProgram = false;

  @Input() program: Program;

  constructor(private programService: ProgramsService, private router: Router) {
  }

  ngOnInit() {
  }

  saveProgram() {
    this.programService.save(this.program).subscribe(() => {
      this.updatingProgram = false;
    });
  }

  deleteProgram() {
    this.programService.delete(this.program).subscribe(data => {
      this.deletingProgram = false;
      this.router.navigate(['/programs']);
    });

  }
}
