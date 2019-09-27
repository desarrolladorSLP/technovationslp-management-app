import {Component} from '@angular/core';
import {ProgramsService} from '../../services/programs/programs.service';
import {Router} from '@angular/router';
import {Program} from 'src/app/model/program';
import {UserRoleService} from '../../services/user/user-role.service';
import {UserRole} from 'src/app/model/user-role';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})

export class ProgramsComponent {

  public addingProgram = false;
  protected listPrograms: Program[];
  public filterPrograms = '';
  protected listUserRole: UserRole[];
  protected responsibles = '';

  constructor(private router: Router, private programService: ProgramsService, private userRoleService: UserRoleService) {
    this.refreshPrograms();
    this.getUserforRole();
  }

  addProgram(name: string, description: string) {
    for (const user of this.listUserRole) {
      if (user.isChecked) {
        this.responsibles += user.name + ',';
      }
    }
    const newProgram = new Program();
    newProgram.name = name;
    newProgram.description = description;
    newProgram.responsible = this.responsibles;
    this.programService.addProgram(newProgram).subscribe(data => {
      this.addingProgram = false;
      this.refreshPrograms();
    });
  }

  refreshPrograms() {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
    });
  }

  getUserforRole() {
    this.userRoleService.getUserRole().subscribe(data => {
        this.listUserRole = data;
    });
  }
}
