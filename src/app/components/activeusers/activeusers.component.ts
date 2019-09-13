import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/model/logged-user';
import { AuthService } from 'src/app/services';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ActiveUser } from 'src/app/model/activeuser';
import * as $ from 'jquery';

@Component({
  selector: 'app-activeusers',
  templateUrl: './activeusers.component.html',
  styleUrls: ['./activeusers.component.css']
})
export class ActiveusersComponent implements OnInit {

  loggedUser: LoggedUser;
  activeUser: ActiveUser[];
  filterName = '';
  filterEmail = '';
  filterNumber = '';
  filterRoles = '';
  UserUpdate: ActiveUser;
  marked: any;
  roles: string[];

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
      this.getActiveUsers().subscribe();
      this.getNewsRoles();
    }
  }

  ngOnInit() {

  }

  private getActiveUsers(): Observable<ActiveUser[]> {
    const urlEndpoint = `${environment.backendUrl}/api/user/active`;
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.get<ActiveUser[]>(urlEndpoint, { headers: httpHeaders })
      .pipe(
        tap(response => {
          this.activeUser = response;
        }));
  }

  public toggleVisibility(e) {
    this.marked = e.target.checked;
    console.log(this.marked);
  }

  public getNewsRoles() {
    $( document ).ready(function() {
      this.roles = [];
    $('div .roles').click(function (event) {
      var kids = $(event.target).children();
      $.each(kids, function (i, value) {
        this.roles.push(value.innerText);
      });
      console.log(this.roles);
    });
  });
  }

  private assigmentUser(selectedItem: any) {
    this.UserUpdate = new ActiveUser();
    this.UserUpdate.id = selectedItem.id;
    this.UserUpdate.enable = this.marked;
    this.UserUpdate.validated = selectedItem.validated;
    this.UserUpdate.roles = selectedItem.roles;
    //this.UpdateUserActive(this.UserUpdate).subscribe();
    console.log(this.UserUpdate);
  }

  private UpdateUserActive(user: ActiveUser): Observable<ActiveUser> {
    const urlEndpoint = `${environment.backendUrl}/api/user/activate`;
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.post<ActiveUser>(urlEndpoint, user, {headers: httpHeaders}).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }


}
