import { Component, ViewChild } from "@angular/core";
import { ProgramsService } from "../../services/programs/programs.service";
import { Router } from "@angular/router";
import { Program } from "src/app/model/program";
import { UserRoleService } from "../../services/user/user-role.service";
import { UserRole } from "src/app/model/user-role";
import { AuthService } from "src/app/services";
import { DxTagBoxComponent } from "devextreme-angular";

@Component({
  selector: "app-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.css"]
})
export class ProgramsComponent {
  @ViewChild( DxTagBoxComponent) list: DxTagBoxComponent;
  public addingProgram = false;
  protected listPrograms: Program[];
  public filterPrograms = "";
  protected listUserRole: UserRole[];
  protected responsibles;

  constructor(
    private router: Router,
    private programService: ProgramsService,
    private authService: AuthService,
    private userRoleService: UserRoleService
  ) {
    this.refreshPrograms();
    this.getUserforRole();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([""]).then();
    }
  }

  addProgram(name: string, description: string) {
    this.responsibles = "";
    this.list.selectedItems.forEach(element => {
      this.responsibles += element.name +','
    });
    if (name) {
      const newProgram = new Program();
      newProgram.name = name;
      newProgram.description = description;
      newProgram.responsible = this.responsibles;
      this.programService.addProgram(newProgram).subscribe(data => {
        this.addingProgram = false;
        this.refreshPrograms();
      });
    } else {
      alert("Invalid name");
    }
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
