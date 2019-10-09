import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Activeuser } from 'src/app/model/activeuser';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: User;
  protected urlEndpoint = `${environment.backendUrl}/api/user/me`;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }


  public getProfileInformation(): Observable<User> {
    return this.httpClient.get<User>(`${this.urlEndpoint}`);
  }

  public updateProfileInformation(user: User): Observable<User> {
    return this.httpClient.post<User>(this.urlEndpoint, user);
  }

  public getListUserActive() {
    const urlEndpoint = `${environment.backendUrl}/api/user/active`;
    return this.httpClient.get<User[]>(`${urlEndpoint}`);
  }

  public updateUserActive(user: Activeuser): Observable<Activeuser> {
    const urlEndpoint = `${environment.backendUrl}/api/user/activate`;
    return this.httpClient.post<Activeuser>(urlEndpoint, user);

  }
}
