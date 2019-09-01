import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/model/logged-user';
import { AuthService } from 'src/app/services';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ActiveUser } from 'src/app/model/activeuser';

@Component({
  selector: 'app-activeusers',
  templateUrl: './activeusers.component.html',
  styleUrls: ['./activeusers.component.css']
})
export class ActiveusersComponent implements OnInit {

  loggedUser: LoggedUser;
  activeUser: ActiveUser[];
  currentState: boolean;
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
          console.log(this.activeUser);
        }));
  }
}
