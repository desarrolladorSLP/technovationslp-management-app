import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/Users/users.service';
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

  constructor(private listInactive: UsersService) {
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
    this.currentRoles = [];
    $('#modalName').empty();
    $('#modalName').append(row['name']);
    $('#modalImage').attr('src', row['pictureUrl']);
    $('#modalRoles').empty();
    $('#modalRoles').append(row['roles']);
  }

  public updateInactiveUser() {
    if (this.currentRoles.length === 0) {
      alert('Debes de tener al menos una etiqueta');
      console.log(this.currentRoles);
    } else {
      this.currentRoles.forEach(element => {
        switch (element['displayValue']) {
          case 'Administrator':
            if (!this.inactiveUser.roles.includes('ROLE_ADMINISTRATOR')) {
              this.inactiveUser.roles.push('ROLE_ADMINISTRATOR');
            } break;
          case 'Tecker':
            if (!this.inactiveUser.roles.includes('ROLE_TECKER')) {
              this.inactiveUser.roles.push('ROLE_TECKER');
            } break;
          case 'Mentor':
            if (!this.inactiveUser.roles.includes('ROLE_MENTOR')) {
              this.inactiveUser.roles.push('ROLE_MENTOR');
            } break;
          case 'Staff':
            if (!this.inactiveUser.roles.includes('ROLE_STAFF')) {
              this.inactiveUser.roles.push('ROLE_STAFF');
            } break;
          case 'Parent':
            if (!this.inactiveUser.roles.includes('ROLE_PARENT')) {
              this.inactiveUser.roles.push('ROLE_PARENT');
            } break;
        }
      });
      this.inactiveUser.enable = this.isEnable;
      this.listInactive.updateUserInactive(this.inactiveUser).subscribe();
    }
  }

  public clickName() {
    $('#Sname').toggleClass('d-none');
  }

  public clickEmail() {
    $('#Semail').toggleClass('d-none');
  }
}
