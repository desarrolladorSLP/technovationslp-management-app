import { Component, OnInit } from '@angular/core';
import { InactiveService } from 'src/app/services/Users/inactive.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as $ from 'jquery';
import { Inactiveuser } from 'src/app/model/inactiveuser';
import { TagsChangedEvent } from 'ngx-tags-input/public-api';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  listActiveUser: any;
  activeUser: Inactiveuser;
  isEnable;
  filterName = '';
  filterEmail = '';
  filterNumber = '';
  searchName;
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
    listInactive.getListUserActive().subscribe(data => {
      this.listActiveUser = data;
    });
  }

  ngOnInit() {
  }

  public getSelectedUser(row) {
    this.activeUser = new Inactiveuser();
    this.activeUser.id = row['id'];
    this.activeUser.enable = row['enabled'];
    this.activeUser.validated = row['validated'];
    this.activeUser.roles = row['roles'];
    this.currentRoles = [];
    this.activeUser.roles.forEach(element => {
      switch (element) {
        case 'ROLE_ADMINISTRATOR': this.currentRoles.push({ displayValue: 'Administrator' }); break;
        case 'ROLE_TECKER': this.currentRoles.push({ displayValue: 'Tecker' }); break;
        case 'ROLE_MENTOR': this.currentRoles.push({ displayValue: 'Mentor' }); break;
        case 'ROLE_STAFF': this.currentRoles.push({ displayValue: 'Staff' }); break;
        case 'ROLE_PARENT': this.currentRoles.push({ displayValue: 'Parent' }); break;
      }
    });
    this.isEnable = row['enabled'];
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
        if (this.activeUser.roles.some) {
          switch (element) {
            case 'Administrator':
              if (!this.activeUser.roles.includes('ROLE_ADMINISTRATOR')) {
                this.activeUser.roles.push('ROLE_ADMINISTRATOR');
              } break;
            case 'Tecker':
              if (!this.activeUser.roles.includes('ROLE_TECKER')) {
                this.activeUser.roles.push('ROLE_TECKER');
              } break;
            case 'Mentor':
              if (!this.activeUser.roles.includes('ROLE_MENTOR')) {
                this.activeUser.roles.push('ROLE_MENTOR');
              } break;
            case 'Staff':
              if (!this.activeUser.roles.includes('ROLE_STAFF')) {
                this.activeUser.roles.push('ROLE_STAFF');
              } break;
            case 'Parent':
              if (!this.activeUser.roles.includes('ROLE_PARENT')) {
                this.activeUser.roles.push('ROLE_PARENT');
              } break;
          }
        } else {
          this.activeUser.roles.push(element.displayValue);
        }
      });
      this.activeUser.enable = this.isEnable;
      console.log(this.activeUser);
      // this.listInactive.updateUserActive(this.activeUser).subscribe(data => {
      //   console.log(data);
      // });
    }
  }

  public clickName() {
    $('#Sname').toggleClass('d-none');
  }

  public clickEmail() {
    $('#Semail').toggleClass('d-none');
  }
  public clickNumber() {
    $('#Snumber').toggleClass('d-none');
  }
}
