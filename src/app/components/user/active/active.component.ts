import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/Users/users.service";
import * as $ from "jquery";
import { Activeuser } from "src/app/model/activeuser";
import { TagsChangedEvent } from "ngx-tags-input/public-api";
import { forEach } from "@angular/router/src/utils/collection";
import Swal from "sweetalert2";
import { AuthService } from "src/app/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-active",
  templateUrl: "./active.component.html",
  styleUrls: ["./active.component.css"]
})
export class ActiveComponent implements OnInit {
  listActiveUser: any;
  activeUser: Activeuser;
  isEnable;
  filterName = "";
  filterEmail = "";
  filterNumber = "";
  searchName;
  currentRoles = [];

  optionsRoles = [
    {
      displayValue: "Administrator"
    },
    {
      displayValue: "Mentor"
    },
    {
      displayValue: "Staff"
    },
    {
      displayValue: "Tecker"
    },
    {
      displayValue: "Parent"
    }
  ];

  constructor(
    private listActive: UsersService,
    private authService: AuthService,
    private router: Router
  ) {
    this.refreshList();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([""]).then();
    }
  }

  public getSelectedUser(row) {
    this.activeUser = new Activeuser();
    this.activeUser.id = row["id"];
    this.activeUser.enabled = row["enabled"];
    this.activeUser.validated = row["validated"];
    this.activeUser.roles = row["roles"];
    this.currentRoles = [];
    this.activeUser.roles.forEach(element => {
      switch (element) {
        case "ROLE_ADMINISTRATOR":
          this.currentRoles.push({ displayValue: "Administrator" });
          break;
        case "ROLE_TECKER":
          this.currentRoles.push({ displayValue: "Tecker" });
          break;
        case "ROLE_MENTOR":
          this.currentRoles.push({ displayValue: "Mentor" });
          break;
        case "ROLE_STAFF":
          this.currentRoles.push({ displayValue: "Staff" });
          break;
        case "ROLE_PARENT":
          this.currentRoles.push({ displayValue: "Parent" });
          break;
      }
    });
    this.isEnable = row["enabled"];
    $("#modalName").empty();
    $("#modalName").append(row["name"]);
    $("#modalImage").attr("src", row["pictureUrl"]);
    $("#modalRoles").empty();
    $("#modalRoles").append(row["roles"]);
  }

  public updateActiveUser() {
    if (this.currentRoles.length === 0) {
      Swal.fire("Error!", "you need me to have at least one role.", "error");
    } else {
      console.log(this.currentRoles);
      this.activeUser.roles = [];
      this.currentRoles.forEach(element => {
        switch (element["displayValue"]) {
          case "Administrator":
            if (!this.activeUser.roles.includes("ROLE_ADMINISTRATOR")) {
              this.activeUser.roles.push("ROLE_ADMINISTRATOR");
            }
            break;
          case "Tecker":
            if (!this.activeUser.roles.includes("ROLE_TECKER")) {
              this.activeUser.roles.push("ROLE_TECKER");
            }
            break;
          case "Mentor":
            if (!this.activeUser.roles.includes("ROLE_MENTOR")) {
              this.activeUser.roles.push("ROLE_MENTOR");
            }
            break;
          case "Staff":
            if (!this.activeUser.roles.includes("ROLE_STAFF")) {
              this.activeUser.roles.push("ROLE_STAFF");
            }
            break;
          case "Parent":
            if (!this.activeUser.roles.includes("ROLE_PARENT")) {
              this.activeUser.roles.push("ROLE_PARENT");
            }
            break;
        }
      });
      this.activeUser.enabled = this.isEnable;
      console.log(this.activeUser);
      this.listActive.updateUserActive(this.activeUser).subscribe(data => {
        Swal.fire({
          position: "top",
          type: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        this.refreshList();
      });
    }
  }

  public refreshList() {
    this.listActive.getListUserActive().subscribe(elements => {
      this.listActiveUser = elements;
    });
  }
  public clickName() {
    $("#Sname").toggleClass("d-none");
  }

  public clickEmail() {
    $("#Semail").toggleClass("d-none");
  }
  public clickNumber() {
    $("#Snumber").toggleClass("d-none");
  }
}
