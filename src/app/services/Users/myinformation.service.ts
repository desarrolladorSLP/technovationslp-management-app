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

  //getprofileinformation
  public getMyInformation(): Observable<User> {
    return this.httpClient.get<User>(`${this.urlEndpoint}`);
  }
  //
  public updateUserActive(user: User): Observable<User> {
    return this.httpClient.post<User>(this.urlEndpoint, user);
  }
}
