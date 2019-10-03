import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '..';

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
}
