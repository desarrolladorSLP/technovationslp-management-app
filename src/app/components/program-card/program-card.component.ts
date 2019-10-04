import {Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Program} from '../../model/program';
import {ProgramsService} from '../../services/programs/programs.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

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
  @Output() public userRoleList = new EventEmitter();
  @Input() program: Program;
  @Input() listUserRole: UserRole[];
  protected responsibles = '';
  messageError: string;
  yesdelete: string;


  constructor(private programService: ProgramsService, private router: Router, private translate: TranslateService) {
  }

  saveProgram() {
    for (const user of this.listUserRole) {
      if (user.isChecked) {
        this.responsibles += user.name + ',';
      }
    }
    if (this.program.name) {
      this.program.responsible = this.responsibles;
      this.programService.save(this.program).subscribe(() => {
        this.updatingProgram = false;
      });
    } else {
      alert('Invalid name');
    }
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
      this.translate.get('DELETED').subscribe((text => {
        swal.fire(
          {
            type: 'success',
            text: text,
          }
        );
      }));
    },
    error => swal.fire(
      {
        title: 'Error',
        text: error.message,
      }
    )
    );
  }

  showAlertDelete() {

   this.translate.get('DELETEPROGRAM').subscribe((text: string) => { this.messageError = text; });
   this.translate.get('YES').subscribe((text: string) => { this.yesdelete = text; });
   swal.fire({
      title: this.messageError ,
      text: this.program.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: this.yesdelete,
    }).then((result) => {
      if (result.value) {
        this.deleteProgram();
      }
    } );
   }
}
