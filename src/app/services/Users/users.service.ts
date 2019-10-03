import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Activeuser } from 'src/app/model/activeuser';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


  public getListUserActive() {
    const urlEndpoint = `${environment.backendUrl}/api/user/active`;
    return this.httpClient.get<User[]>(`${urlEndpoint}`);
  }

  public updateUserActive(user: Activeuser): Observable<Activeuser> {
    const urlEndpoint = `${environment.backendUrl}/api/user/activate`;
    return this.httpClient.post<Activeuser>(urlEndpoint, user);
  }
}
