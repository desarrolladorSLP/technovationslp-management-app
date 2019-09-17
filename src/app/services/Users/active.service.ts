import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  user: User;
  protected urlEndpoint = `${environment.backendUrl}/api/user/me`;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }


  public getMyInformation():
    Observable<User> {
  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.loggedUser.access_token}`,
  //   });
  //   return this.httpClient.get<User>(this.urlEndpoint, { headers: httpHeaders })
  //     .pipe(
  //       tap(response => {
  //         imageProfile = this.user.pictureUrl;
  //         nameUser = this.user.name;
  //         preferredEmail = this.user.preferredEmail;
  //         phoneNumber = this.user.phoneNumber;
  //         pictureUrl = this.user.pictureUrl;
  //       }));
  return this.httpClient.get<User>(`${this.urlEndpoint}`);
   }
  private updateUserActive(user: User, imageProfile: string, nameUser: string, preferredEmail: string, phoneNumber: string, pictureUrl: string): Observable<User> {
    const httpHeaders = new HttpHeaders({
     // 'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.post<User>(this.urlEndpoint, user, { headers: httpHeaders }).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }
}
