import {Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramsService} from '../../services/programs/programs.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import { UserRole } from 'src/app/model/user-role';

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
  @Input() listUserRole: UserRole[];
  protected responsibles = '';


  constructor(private programService: ProgramsService, private router: Router) {
  }

  saveProgram() {
    for (const user of this.listUserRole) {
      if (user.isChecked) {
        this.responsibles += user.name + ',';
      }
    }
    this.program.responsible = this.responsibles;
    this.programService.save(this.program).subscribe(() => {
      this.updatingProgram = false;
    });
  }

  updateProgram() {
    this.updatingProgram = !this.updatingProgram;
    this.divideResponsibles();
  }

  divideResponsibles() {
    for (const user of this.listUserRole) {
          user.isChecked = false;
    }
    const arrayUsers = this.program.responsible.split(',');
    console.log(arrayUsers);
    for (const aUser of arrayUsers) {
      for (const user of this.listUserRole) {
        if (aUser === user.name) {
            user.isChecked = true;
        }
      }
    }
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
