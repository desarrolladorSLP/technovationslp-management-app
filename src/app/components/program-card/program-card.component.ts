import { Component, Input, EventEmitter, Output, ViewChild } from "@angular/core";
import { Program } from "../../model/program";
import { ProgramsService } from "../../services/programs/programs.service";
import swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

import { UserRole } from "src/app/model/user-role";
import { DxTagBoxComponent } from "devextreme-angular";

@Component({
  selector: "app-program-card",
  templateUrl: "./program-card.component.html",
  styles: []
})
export class ProgramCardComponent {
  public updatingProgram = false;
  public deletingProgram = false;
  @ViewChild( DxTagBoxComponent) list: DxTagBoxComponent;
  @Output() public programDeleted = new EventEmitter();
  @Input() program: Program;
  @Input() listUserRole: UserRole[];
  protected responsibles = "";
  messageError: string;
  yesdelete: string;
  arrayUsers: string[];
  currentResponsibles: UserRole[];
  constructor(
    private programService: ProgramsService,
    private translate: TranslateService
  ) {}

  saveProgram() {
    this.list.selectedItems.forEach(element => {
      this.responsibles += element.name +','
    });
    if (this.program.name) {
      this.program.responsible = this.responsibles;
      this.programService.save(this.program).subscribe(() => {
        this.updatingProgram = false;
      });
    } else {
      alert("Invalid name");
    }
  }

  updateProgram() {
    this.updatingProgram = !this.updatingProgram;
    this.divideResponsibles();
  }

  divideResponsibles() {
    this.currentResponsibles = [];
    for (const user of this.listUserRole) {
      user.isChecked = false;
    }
    const arrayUsers = this.program.responsible.split(",");
    console.log(arrayUsers);
    for (let i = 0; i < arrayUsers.length; i++) {
      this.listUserRole.forEach(element => {
        if (arrayUsers[i] === element.name) {
          this.currentResponsibles.push(element);
        }
      });
    }
  }

  deleteProgram() {
    this.programService.delete(this.program.id).subscribe(
      data => {
        this.deletingProgram = false;
        this.programDeleted.emit("program removed");
        this.translate.get("DELETED").subscribe(text => {
          swal.fire({
            type: "success",
            text: text
          });
        });
      },
      error =>
        swal.fire({
          title: "Error",
          text: error.message
        })
    );
  }

  showAlertDelete() {
    this.translate.get("DELETEPROGRAM").subscribe((text: string) => {
      this.messageError = text;
    });
    this.translate.get("YES").subscribe((text: string) => {
      this.yesdelete = text;
    });
    swal
      .fire({
        title: this.messageError,
        text: this.program.name,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: this.yesdelete
      })
      .then(result => {
        if (result.value) {
          this.deleteProgram();
        }
      });
  }
}
