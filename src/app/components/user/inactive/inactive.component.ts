import { Component, OnInit } from '@angular/core';
import { InactiveService } from 'src/app/services/Users/inactive.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as $ from 'jquery';
import { Inactiveuser } from 'src/app/model/inactiveuser';
import { TagsChangedEvent } from 'ngx-tags-input/public-api';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.css']
})
export class InactiveComponent implements OnInit {

  listInactiveUser: any;
  inactiveUser: Inactiveuser;
  isEnable = false;
  filterName = '';
  filterEmail = '';
  searchName = false;
  currentRoles = [];

  optionsRoles = [{
    displayValue: 'Administrator'
  }, {
    displayValue: 'Mentor'
  }, {
    displayValue: 'Staff'
  }, {
    displayValue: 'Tecker'
  }, {
    displayValue: 'Parent'
  }];

  constructor(private listInactive: InactiveService) {
    listInactive.getListUserInactive().subscribe(data => {
      this.listInactiveUser = data;
    });
  }

  ngOnInit() {
  }

  public getSelectedUser(row) {
    this.inactiveUser = new Inactiveuser();
    this.inactiveUser.id = row['id'];
    this.inactiveUser.enable = row['enabled'];
    this.inactiveUser.validated = row['validated'];
    this.inactiveUser.roles = row['roles'];
    $('#modalName').empty();
    $('#modalName').append(row['name']);
    $('#modalImage').attr('src', row['pictureUrl']);
    $('#modalRoles').empty();
    $('#modalRoles').append(row['roles']);
  }

  public updateInactiveUser() {
    this.currentRoles.forEach(element => {
      if (this.inactiveUser.roles.some) {
        if (!this.inactiveUser.roles.includes(element)) {
          this.inactiveUser.roles.push(element.displayValue);
        }
      } else {
        this.inactiveUser.roles.push(element.displayValue);
      }
    });
    this.inactiveUser.enable = this.isEnable;
    console.log(this.inactiveUser);
    // this.listInactive.updateUserInactive(this.inactiveUser).subscribe(data => {
    //   console.log(data);
    // });
  }

  public clickName() {
    $('#Sname').toggleClass('d-none');
  }

  public clickEmail() {
    $('#Semail').toggleClass('d-none');
  }
}
