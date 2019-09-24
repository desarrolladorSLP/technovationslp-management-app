import {Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramsService} from '../../services/programs/programs.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styles: []
})
export class ProgramCardComponent {

  public updatingProgram = false;
  public deletingProgram = false;
  @Output() public programDeleted = new EventEmitter();
  @Input() program: Program;

  constructor(private programService: ProgramsService, private router: Router) {
  }

  saveProgram() {
    this.programService.save(this.program).subscribe(() => {
      this.updatingProgram = false;
    });
  }

  deleteProgram() {
    this.programService.delete(this.program.id).subscribe(data => {
      this.deletingProgram = false;
      this.programDeleted.emit('program removed');
      swal.fire(
        'Deleted!',
        'The program has been deleted.',
        'success'
      );
    },
    error => swal.fire(error.message));
  }

  showAlertDelete() {
    swal.fire({
      title: 'Are you sure to delete this program?',
      text: this.program.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteProgram();
      }
    } );
   }
}
