import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inactiveuser } from 'src/app/model/inactiveuser';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { Activeuser } from 'src/app/model/activeuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getProfileInformation(): Observable<User> {
    const urlEndpoint = `${environment.backendUrl}/api/user/me`;
    return this.httpClient.get<User>(`${urlEndpoint}`);
  }

  public updateProfileInformation(user: User): Observable<User> {
    const urlEndpoint = `${environment.backendUrl}/api/user/me`;
    return this.httpClient.post<User>(urlEndpoint, user);
  }

  public getListUserActive() {
    const urlEndpoint = `${environment.backendUrl}/api/user/active`;
    return this.httpClient.get<User[]>(`${urlEndpoint}`);
  }

  public updateUserActive(user: Activeuser): Observable<Activeuser> {
    const urlEndpoint = `${environment.backendUrl}/api/user/activate`;
    return this.httpClient.post<Activeuser>(urlEndpoint, user);
  }

  public getListUserInactive() {
    const urlEndpoint = `${environment.backendUrl}/api/user/inactive`;
    return this.httpClient.get<User[]>(`${urlEndpoint}`);
  }

  public updateUserInactive(user: Inactiveuser): Observable<Inactiveuser> {
    const urlEndpoint = `${environment.backendUrl}/api/user/activate`;
    return this.httpClient.post<Inactiveuser>(urlEndpoint, user);
  }
}
