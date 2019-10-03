import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inactiveuser } from 'src/app/model/inactiveuser';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


  public getListUserInactive() {
    const urlEndpoint = `${environment.backendUrl}/api/user/inactive`;
    return this.httpClient.get<User[]>(`${urlEndpoint}`);
  }

  public updateUserInactive(user: Inactiveuser): Observable<Inactiveuser> {
    const urlEndpoint = `${environment.backendUrl}/api/user/activate`;
    return this.httpClient.post<Inactiveuser>(urlEndpoint, user);
  }
}
