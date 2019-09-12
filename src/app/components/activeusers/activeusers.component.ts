import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/model/logged-user';
import { AuthService } from 'src/app/services';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ActiveUser } from 'src/app/model/activeuser';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

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

  protected urlEndpoint = `${environment.backendUrl}/api/user/activate`;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
      this.getActiveUsers().subscribe();
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

  onSelect(selectedItem: any) {
    console.log('Selected item Id: ', selectedItem.id); // You get the Id of the selected item here
}

  private assigmentUser(selectedItem: any) {
    this.UserUpdate = new ActiveUser();
    this.UserUpdate.id = selectedItem.id;
    this.UserUpdate.enable = selectedItem.enabled;
    this.UserUpdate.validated = selectedItem.validated;
    this.UserUpdate.roles = selectedItem.roles;
    //this.UpdateUserActive(this.UserUpdate).subscribe();
    console.log(this.UserUpdate);
  }

  private UpdateUserActive(user: ActiveUser): Observable<ActiveUser> {
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.post<ActiveUser>(this.urlEndpoint, user, {headers: httpHeaders}).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }


}
