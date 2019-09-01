import { Component, OnInit } from '@angular/core';
import { LoggedUser } from "../../model/logged-user";
import { AuthService } from '../../services';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  loggedUser: LoggedUser;
  User: User;
  isUser = false;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
      if (!this.isUser) {
        this.getMyInformation().subscribe(
          data => {
            console.log(data);
            this.isUser = true;
          }
        );
      }
    }
  }

  ngOnInit() {
  }
  protected getMyInformation(): Observable<User> {
    const urlEndpoint = `${environment.backendUrl}/api/user/me`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.get<User>(urlEndpoint, { headers: httpHeaders })
      .pipe(
        tap(response => {
          console.log(response);
        }));
  }


}
